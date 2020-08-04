<template>
<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--    <el-form-item label="时间" >
    <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期"
                        v-model="ruleForm.date1" value-format="yyyy-MM-dd" ></el-date-picker>
    </el-form-item>
</el-form-item>-->

    <el-form-item prop="date">
    <el-date-picker
            v-model="ruleForm.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
    </el-date-picker>
    </el-form-item>

    <el-form-item label="收盘价(元)" prop="close" >
        <el-input v-model="ruleForm.close"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加数据</el-button>
        <el-button @click="resetForm('ruleForm')">重置数据</el-button>
    </el-form-item>
</el-form>
</template>
<script>
    export default {
        data() {
            var checkClose = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('收盘价不能为空'));
                }
                setTimeout(() => {
                    if (Number.isNaN(parseFloat(value))) {                  /*内部函数使用vue有自己的函数。==和===区别*/
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 0) {
                            callback(new Error('收盘价不能为负值'));
                        } else {
                            callback();
                        }
                    }
                }, 100);
            };
            return {
                ruleForm: {
                    date: '',
                    close: ''
                },
                rules: {
                    date: [
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    close: [
                        { validator: checkClose, trigger: 'blur' }]

                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {console.log(this.ruleForm)
                        axios.post('http://localhost:8181/hs30010/save',this.ruleForm).then(function (resp) {
                        })
                        alert('添加成功');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>