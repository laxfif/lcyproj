<template>
    <div class="block">
        <span class="demonstration">日期范围： </span>
        <el-date-picker
                v-model="value1"
                :unlink-panels= true
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
        </el-date-picker>
       <el-button type="primary" align="center"  icon="el-icon-search"
                   @click="search(value1)">搜索</el-button>
        <div id="main" style="width: 1100px;height:500px;"></div>
    </div>
</template>

<script>
    let myChart;
    export default {
        data(){
            return{
                myChart:[],
                dateValue:[],
                closeValue:[],
                valueDate: {
                    date1:'',
                    date2:''
                },
                hs30010:[{
                    date:'',
                    close:''
                }],
                value1:''

            }

        },
        methods:{

            search(value1){
                this.valueDate.date1=value1[0]
                this.valueDate.date2=value1[1]
                let _this=this
                axios.get('http://localhost:8181/hs30010/dateQuery/'+this.valueDate.date1+'/'+this.valueDate.date2).then(function (resp) {
                    for(let i=0;i<resp.data.length;i++){
                        _this.dateValue.push(resp.data[i].date)
                        _this.closeValue.push(resp.data[i].close)
                    }
                    myChart.setOption({
                        xAxis: {
                            data:_this.dateValue,
                            type: 'category',
                        },
                        tooltip: {
                            axisPointer: {
                                type: 'cross'
                            },

                        },

                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                dataView: {readOnly: false},
                                magicType: {type: ['line', 'bar']},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        series: [{
                            // 根据名字对应到相应的系列
                           data: _this.closeValue,
                            name: '销量',
                        }]
                    });
                })
            },
            myEcharts(){
                // 基于准备好的dom，初始化echarts实例
                myChart = this.$echarts.init(document.getElementById('main'));

                // 指定图表的配置项和数据
                myChart.setOption( {
                    xAxis: {
                        type: 'category',
                        data:[]
                    },
                    yAxis: { splitArea: {
                            show: true
                        }
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            xAxisIndex: [0],
                            start:0,
                            end: 100
                        },
                        {
                            type: 'slider',
                            show: true,
                            yAxisIndex: [0],
                            left: '93%',
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            xAxisIndex: [0],
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            yAxisIndex: [0],
                            start: 0,
                            end: 100
                        }
                    ],
                    series: [{
                        data: [],
                        type: 'line',
                        markLine: {

                            data: [{
                                name:'平均值',
                                type: "average",
                            },
                                {name:'最大值',
                                    type: "max",
                                },
                                {name:'最小值',
                                    type: "min",
                                }
                            ],
                            silent: false,
                            symbolSize:'circle',
                            label:{
                                show:true,

                            }

                        }
                    },

                    ]
                });

                // 使用刚指定的配置项和数据显示图表。

            }
        },
        mounted() {
            this.myEcharts();
        }
    }

</script>

<style>

</style>

