<template>
    <div>

        <el-main>
    <el-table
            :data="hs30010"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            height="500"
            border
            style="width: 44%">
        <el-table-column
                align="center"
                prop="date"
                label="日期"
                width="180">
        </el-table-column>
        <el-table-column
                align="center"
                prop="close"
                label="收盘价"
                width="150">
        </el-table-column>
        <el-table-column
                align="center"
                label="操作"
                width="150">
            <template slot-scope="scope">
                <el-button @click="open(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
            </el-main>

    </div>
</template>

<script>
    export default {
        methods: {
            open(row) {
                this.hs300.date=row.date
                this.$prompt('请输入修改后收盘价/元', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[1-9][0-9]*(\.[0-9]{1,2})?$/,
                    inputErrorMessage: '请输入正确堆收盘价'
                }).then(({ value }) => {
                    this.hs300.close=value
                    axios.put('http://localhost:8181/hs30010/update',this.hs300).then(function (resp) {
                        window.location.reload()

                    })

                    this.$message({

                        type: 'success',
                        message: '修改价格为: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            handleClick(row) {
                axios.post('http://localhost:8181/hs30010/delete',row).then(function (resp) {
                    window.location.reload()
                })
               // this.$router.push('/edit')
                console.log(row);
            }
        },
        name: "hs30010",
        data(){
            return{
                hs30010:[{
                    date:'',
                    close:''
                }],
                hs300:{
                    "date":'',
                    "close":''
                },
                loading: true

            }

        },

        created() {
            const _this=this;
            axios.get('http://localhost:8181/hs30010/findAll').then(function(resp){
                _this.hs30010=resp.data
                _this.loading=false
            })
        }
    }
</script>

<style scoped>
    body {
        margin: 0;
    }
</style>