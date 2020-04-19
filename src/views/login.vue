<template>
  <div class="login">
    <div class="bgc">
      <img :src="imgSrc" width="100%" height="100%" alt />
    </div>
    <div class="content">
      <img :src="topImg" alt />
      <p class="title">教室信息管理系统</p>
      <br />
      <input type="text" placeholder="学号" class="inputBox" />
      <br />
      <input type="password" placeholder="密码" class="inputBox" />
      <br />
      <p class="buttonSel">
        <span class="container">
          <input type="checkbox" id="remCard" />
          <span class="checkmark"></span>
          <label for="remCard">记住密码</label>
        </span>
        <span>
          <a href>忘记密码</a>
          <a href="/login/mangerLogin">管理员登陆</a>
        </span>
      </p>
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

  methods: {
    getNewsInfo() {
      this.$http.get('bulletin/', { params:{ key:'15632ad0534191c2eee477cf3de945e1' }}).then(result => {
        if(result.body.code === 200){
          this.newsInfo = result.body.newslist[this.id];
        }
      })
    }
  },
  components: {},
  
};
</script>

<style lang="scss" scoped>
.login {
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
    .buttonSel {
      width: 180px;
      font-size: 11px;
      display: inline-flex;
      justify-content: space-between;
      .container {
        display: block;
        position: relative;
        padding-left: 15px;
        margin-bottom: 12px;
        cursor: pointer;
      }

      /* Hide the browser's default checkbox */
      .container input {
        position: absolute;
        height: 0;
        width: 0;
        opacity: 0;
        appearance: none; /*清除默认样式*/
        -webkit-appearance: none;
      }

      /* Create a custom checkbox */
      .checkmark {
        position: absolute;
        top: 2px;
        left: 0;
        height: 10px;
        width: 10px;
        // background-color: #eee;
        border: 0.5px solid rgb(223, 252, 252);
      }

      .container input:checked + .checkmark:after {
        content: "";
        position: absolute;
        left: 3px;
        top: 0;
        width: 2px;
        height: 6px;
        border: solid white;
        border-width: 0 2.5px 2.5px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
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
}
</style>
