<template>
  <div id="app">
      <p v-show="flag" class="title">欢迎进入广工教室信息查询系统，请选择</p>
      <router-link to="/classroomMsg" v-show="flag">查看教室信息</router-link>
      <router-link to="/login" v-show="flag">登陆</router-link>
      <router-view />
      <img :src="bgcSrc" alt="" v-show="flag">
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag:true,
      bgcSrc:require("./assets/GdutDoor.jpg")
    }
  },
  created() {
    this.flag = this.$route.path === "/" ? true : false;
  },
  watch: {
    "$route.path": function(newVal) {
      if (newVal === "/") {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  },

}
</script>

<style lang="scss" scoped>
#app{
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 166, 0, 0.466);
  a{
    margin: 3px;
    padding: 3px;
    text-decoration: none;
    color: black;
    background-color: skyblue;
    border-radius: 2px;
  }
  img{
    width: 80%;
    height: 80%;
  }
  .title{
    margin-top: 10px;
  }
}
</style>
