<template>
  <div class="mangerLogin">
    <div class="bgc">
      <img :src="imgSrc" width="100%" height="100%" alt />
    </div>
    <div class="content">
      <img :src="topImg" alt />
      <p class="title">教室信息管理系统</p>
      <br />
      <input type="text" placeholder="帐号" class="inputBox" />
      <br />
      <input type="password" placeholder="密码" class="inputBox" />
      <br />
      <button class="loginBtn">登陆</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require("../assets/loginbag.jpg"),
      topImg: require("../assets/timg.png")
    };
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.mangerLogin {
  display: flex;
  justify-content: center;
  .bgc {
    width: 100%;
    height: 100%; /**宽高100%是为了图片铺满屏幕 */
    z-index: -1;
    position: absolute;
  }

  .content {
    width: 400px;
    height: 350px;
    z-index: 1;
    position: absolute;
    background-color: #3c97ea;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10%;
    .title {
      font-size: 20px;
      font-family: SimHei;
    }
    img {
      width: 70px;
      margin-top: 10px;
    }
    .inputBox {
      width: 180px;
      height: 20px;
      border: none;
      border-radius: 2px;
      outline: none;
    }

    input {
      vertical-align: middle;
    }
    label {
      cursor: pointer;
    }
    a {
      text-decoration: none;
      margin-left: 5px;
      color: white;
    }
  }
  .loginBtn {
    outline: none;
    border: none;
    width: 180px;
    height: 25px;
    background-color: #177ee5;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
