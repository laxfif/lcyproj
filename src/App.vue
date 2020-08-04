<template>

  <router-view></router-view>
</template>

<script>

  export default {
    name: "hs30010",
    data(){
      return{
        hs30010:[{
          date:'0-0-0',
          close:0
        }
        ]
      }

    },

    created() {
      const _this=this;
      axios.get('http://localhost:8181/hs30010/findAll').then(function(resp){
        _this.hs30010=resp.data
      })
    }
  }

</script>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
