<template>
  <div class="login" @keyup.enter="Login(StudentNum)">
    <div class="bgc">
      <img :src="imgSrc" width="100%" height="100%" alt />
    </div>
    <div class="content">
      <img :src="topImg" alt />
      <p class="title">教室信息管理系统</p>
      <br />
      <input type="text" placeholder="学号/教工号" class="inputBox" v-model="StudentNum" >
      <br />
      <input type="password" placeholder="密码" class="inputBox" v-model="StudentPassword" />
      <br />
      <p class="buttonSel">
        <span class="container" @click="remberPassword()">
          <input type="checkbox" id="remCard" ref="RemInputBox" />
          <span class="checkmark"></span>
          <label for="remCard" >记住密码</label>
        </span>
        <span>
          <a class="forget" @click="ForgetPassword">忘记密码</a>
          <a href="/login/mangerLogin">管理员登陆</a>
        </span>
      </p>
      <button class="loginBtn" @click="Login(StudentNum)">登陆</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require("../assets/loginbag.jpg"),
      topImg: require("../assets/timg.png"),
      LoginMsg: [], //接口接收的登陆用户数据
      StudentNum: this.$cookies.get("Account"), //获取cookies,从界面输入的账号
      StudentPassword: this.$cookies.get("password"), //从界面输入的密码
      PasswordFlag: JSON.parse(this.$cookies.get("PasswordFlag")) //是否要记住密码
    };
  },

  methods: {

    // 从后端接口获取登陆用户的信息
    getNewsInfo() {
      this.$http.get("http://localhost:8080/login/Loginn").then(result => {
        if (result.status === 200) {
          this.LoginMsg = result.body;
          console.log(this.LoginMsg);
        }
      });
    },

    // 登陆按钮
    Login(StuNum) {
      var pasFlag = this.StudentPassword === this.LoginMsg[StuNum];
      if (!(StuNum in this.LoginMsg)) {
        alert("您输入的学号/教工号不存在");
      } else if (this.StudentPassword === null) {
        alert("请输入密码");
      } else if (!pasFlag ) {
        alert("您输入的密码有误");
      } else {
        this.$cookies.set("Account", StuNum); //存cookies
        this.$cookies.set("identity","student")
        if (this.PasswordFlag) {
          this.$cookies.set("PasswordFlag", this.PasswordFlag);
          this.$cookies.set("password", this.StudentPassword);
        } else if (!this.PasswordFlag) {
          this.$cookies.set("password", "");
          this.$cookies.set("PasswordFlag", this.PasswordFlag);
        }
        this.goInfo();
      }
    },

    // 跳转到教室详情页
    goInfo() {
      this.$router.push("/classroomMsg");
    },

    // 忘记密码
    ForgetPassword() {
      this.$alert("请联系老师","警告");
    },

    // 是否需要记住密码
    remberPassword() {
      this.PasswordFlag = !this.PasswordFlag;
    },

    // 根据cookie使记住密码选择框勾选或不勾选
    InitRemPasInputBox() {
      this.$nextTick(() => {
        if (this.PasswordFlag === true) {
          this.$refs.RemInputBox.setAttribute("checked",'')
      }})
      
    }
  },

  created() {
    if (this.$cookies.get("PasswordFlag") === null) {
      this.$cookies.set("PasswordFlag", false);
    }
    this.InitRemPasInputBox()
    this.getNewsInfo()
  },
  components: {}
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
      cursor: pointer;
      .container {
        display: block;
        position: relative;
        padding-left: 15px;
        margin-bottom: 12px;
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
