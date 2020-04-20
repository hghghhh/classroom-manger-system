<template>
  <div class="mangerLogin" @keyup.enter="AdministratorLogin(Administratoraccount)">
    <div class="bgc">
      <img :src="imgSrc" width="100%" height="100%" alt />
    </div>
    <div class="content">
      <img :src="topImg" alt />
      <p class="title">教室信息管理系统</p>
      <br />
      <input type="text" placeholder="帐号" class="inputBox" v-model="Administratoraccount" />
      <br />
      <input type="password" placeholder="密码" class="inputBox" v-model="AdministratorPassword" />
      <br />
      <button class="loginBtn" @click="AdministratorLogin(Administratoraccount)">管理员登陆</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require("../assets/loginbag.jpg"),
      topImg: require("../assets/timg.png"),
      Administratoraccount:this.$cookies.get("Account"),//输入的管理员账号
      AdministratorPassword:"",//输入的管理员密码
      AdministratorLoginMsg:[]//存储后端获取的管理员的账号数据

    };
  },
  components: {},

  methods:{

    // 获取管理员登录信息
    GetAdministratorlMsg(){
        this.$http.get('http://localhost:8080/AdministratorLogin/AdministratorLoginMsg').then(result =>{
          if(result.status === 200){
          this.AdministratorLoginMsg = result.body;
        }
        })
      },

      // 验证账号密码是否正确并登录
      AdministratorLogin(Administrator) {
      var pasFlag = this.AdministratorPassword.toString() === this.AdministratorLoginMsg[Administrator];
      if (!(Administrator in this.AdministratorLoginMsg)) {
        alert("您输入的账号不存在");
      } else if (this.AdministratorPassword == "") {
        alert("请输入密码");
      } else if (!pasFlag) {
        alert("您输入的密码有误");
      } else {
        this.$cookies.set("Account", Administrator)
        this.$cookies.set("identity","Administrator")
        this.$cookies.set("password", "")
        this.goInfo();
      }
    },

    // 登录成功，跳转详情页
    goInfo () {
      this.$router.push("/classroomMsg");
    }
  },

  created(){
     this.GetAdministratorlMsg()
   }
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
