<template>
  <div class="classroomMsg">
    <!-- 教室申请活动信息输入框 -->
    <div class="classroomInputBox" v-show="ClassroomInputBoxFlag">
      <p>
        请输入申请的活动类型
        <button class="close" @click="ClassroomInputBoxFlag = false">X</button>
      </p>
      <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
      <p class="button">
        <el-button size="small" @click="ClassroomInputBoxFlag = false">取消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </p>
    </div>
    <!-- 顶部栏 -->
    <div class="topBar">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img :src="imgSrc" class="log" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <div class="block"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple userMsg">
            <img :src="userSrc" />
            <el-button type="text" @click="AccountOperation()">{{Account}}</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 侧边栏 -->
    <div class="sideBar">
      <span class="title">教室管理系统</span>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(value,key,index) in TechingBuildMsg"
          :title="key"
          :name="index"
          :key="index"
        >
          <el-button
            type="primary"
            v-for="(item,index) in value"
            :key="index"
            size="medium"
            @click="getClassroomMsg(key,item)"
          >{{item}}</el-button>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 信息栏 -->
    <div class="msgBar">
      <el-card class="box-card">
        <el-button
          :type="value[1] === '空闲'? 'success' : 'danger'"
          v-for="(value,index) in ClassroomMsg"
          :key="index"
          @click="ClassroomOperation($event)"
        >
          {{value[0]}}
          <br />
          {{value[1]}}
          <br/>
          {{value[2]}}
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require("../assets/GDUTlogo2.gif"),
      userSrc: require("../assets/user.png"),
      activeName: "1",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value1: "",
      Account: this.$cookies.get("Account") || "你好，请登录", //用户标志
      LoginStatus: false, //登录状态
      TechingBuildMsg: [], //存储教学楼楼号和楼层信息
      ClassroomMsg: [], //存储教室信息
      ClassroomInputBoxFlag: true,//教室申请框的显示隐藏切换标志
      input: ""
    };
  },

  methods: {
    // 获取登陆状态
    getLoginStatus() {
      if (this.Account !== "你好，请登录") {
        this.LoginStatus = true;
      }
    },

    // 用户按钮点击操作
    AccountOperation() {
      if (this.LoginStatus === false) {
        this.$router.push("/login");
      }
    },

    // 获取教学楼的信息
    getTechingBuildingMsg() {
      this.$http
        .get("http://localhost:8080/techingBuilding/techingBuildingMsg")
        .then(result => {
          if (result.status === 200) {
            var TempObj = {}; //排序好的教学楼信息
            var buildingArr = []; //用来将从接口接收到的教学楼楼号排序

            // 遍历接口接收的数据并按教学楼顺序排序
            for (var a in result.body) {
              buildingArr.push(a);
            }
            buildingArr = buildingArr.sort();

            // 将接口数据的值从字符串转为数组
            for (let index = 0; index < buildingArr.length; index++) {
              TempObj[buildingArr[index]] = result.body[buildingArr[index]]
                .replace("[", "")
                .replace("]", "")
                .split(",");
            }
            this.TechingBuildMsg = TempObj;
          }
        });
    },

    //创建localstorage，并初始化各教学楼各楼层教室信息
    InitClassroomMsg() {
      var Jiao11 =
        "{101:上课,102:空闲,103:社团活动:(申请中),104:空闲,105:上课,106:空闲,107:社团活动,108:空闲,109:上课,110:空闲}";
      var Jiao12 =
        "{201:空闲,202:上课,203:社团活动,204:空闲,205:上课,206:空闲,207:空闲,208:空闲,209:上课,210:空闲}";
      var Jiao13 =
        "{301:空闲,302:空闲,303:上课,304:空闲,305:上课,306:空闲,307:社团活动,308:空闲,309:上课,310:空闲}";
      var Jiao14 =
        "{401:空闲,402:社团活动,403:社团活动,404:上课,405:上课,406:空闲,407:社团活动,408:空闲,409:上课,410:空闲}";
      var Jiao15 =
        "{501:上课,502:上课,503:社团活动,504:空闲,505:上课,506:空闲,507:空闲,508:空闲,509:上课,510:空闲}";
      var Jiao21 =
        "{101:空闲,102:空闲,103:上课,104:空闲,105:上课,106:空闲,107:社团活动,108:空闲,109:上课,110:空闲}";
      var Jiao22 =
        "{201:上课,202:上课,203:空闲,204:空闲,205:上课,206:空闲,207:空闲,208:空闲,209:上课,210:空闲}";
      var Jiao23 =
        "{301:空闲,302:上课,303:社团活动,304:空闲,305:上课,306:空闲,307:社团活动,308:空闲,309:上课,310:空闲}";
      var Jiao24 =
        "{401:空闲,402:上课,403:社团活动,404:空闲,405:上课,406:空闲,407:社团活动,408:空闲,409:上课,410:空闲}";
      var Jiao25 =
        "{501:上课,502:上课,503:空闲,504:空闲,505:上课,506:空闲,507:社团活动,508:空闲,509:上课,510:空闲}";
      var Jiao31 =
        "{101:空闲,102:上课,103:社团活动,104:空闲,105:上课,106:空闲,107:社团活动,108:空闲,109:上课,110:空闲}";
      var Jiao32 =
        "{201:空闲,202:上课,203:社团活动,204:空闲,205:上课,206:空闲,207:上课,208:空闲,209:上课,210:空闲}";
      var Jiao33 =
        "{301:上课,302:上课,303:上课,304:空闲,305:上课,306:空闲,307:社团活动,308:空闲,309:上课,310:空闲}";
      var Jiao41 =
        "{101:空闲,102:上课,103:社团活动,104:空闲,105:上课,106:空闲,107:社团活动,108:空闲,109:上课,110:空闲}";
      var Jiao42 =
        "{201:空闲,202:上课,203:上课,204:空闲,205:上课,206:空闲,207:空闲,208:空闲,209:上课,210:空闲}";
      var Jiao43 =
        "{301:上课,302:空闲,303:社团活动,304:空闲,305:上课,306:空闲,307:社团活动,308:空闲,309:上课,310:空闲}";
      var Jiao51 =
        "{101:空闲,102:上课,103:社团活动,104:空闲,105:上课,106:空闲,107:社团活动,108:空闲,109:上课,110:空闲}";
      var Jiao52 =
        "{201:空闲,202:上课,203:空闲,204:空闲,205:上课,206:空闲,207:社团活动,208:空闲,209:上课,210:空闲}";
      var Jiao53 =
        "{301:上课,302:上课,303:社团活动,304:空闲,305:上课,306:空闲,307:上课,308:空闲,309:上课,310:空闲}";
      var Jiao61 =
        "{101:空闲,102:上课,103:社团活动,104:空闲,105:上课,106:空闲,107:社团活动,108:空闲,109:上课,110:空闲}";
      var Jiao62 =
        "{201:上课,202:空闲,203:上课,204:空闲,205:上课,206:空闲,207:社团活动,208:空闲,209:上课,210:空闲}";
      var Jiao63 =
        "{301:空闲,302:上课,303:社团活动,304:空闲,305:上课,306:空闲,307:空闲,308:空闲,309:上课,310:空闲}";
      localStorage.setItem("教1-1楼", Jiao11);
      localStorage.setItem("教1-2楼", Jiao12);
      localStorage.setItem("教1-3楼", Jiao13);
      localStorage.setItem("教1-4楼", Jiao14);
      localStorage.setItem("教1-5楼", Jiao15);
      localStorage.setItem("教2-1楼", Jiao21);
      localStorage.setItem("教2-2楼", Jiao22);
      localStorage.setItem("教2-3楼", Jiao23);
      localStorage.setItem("教2-4楼", Jiao24);
      localStorage.setItem("教2-5楼", Jiao25);
      localStorage.setItem("教3-1楼", Jiao31);
      localStorage.setItem("教3-2楼", Jiao32);
      localStorage.setItem("教3-3楼", Jiao33);
      localStorage.setItem("教4-1楼", Jiao41);
      localStorage.setItem("教4-2楼", Jiao42);
      localStorage.setItem("教4-3楼", Jiao43);
      localStorage.setItem("教5-1楼", Jiao51);
      localStorage.setItem("教5-2楼", Jiao52);
      localStorage.setItem("教5-3楼", Jiao53);
      localStorage.setItem("教6-1楼", Jiao61);
      localStorage.setItem("教6-2楼", Jiao62);
      localStorage.setItem("教6-3楼", Jiao63);
    },

    //获取教室信息
    getClassroomMsg(str1, str2) {
      var localItem = str1 + "-" + str2;
      var ObjTemp = localStorage
        .getItem(localItem)
        .replace("{", "")
        .replace("}", "")
        .split(",");
      var ArrTemp = [];
      ObjTemp.forEach(function(e) {
        ArrTemp.push(e.split(":"));
      });
      this.ClassroomMsg = ArrTemp;
    },

    // 教室按钮点击操作
    ClassroomOperation(btn) {
      var ClassroomStatus = btn.target.innerText.slice(4)
      console.log(ClassroomStatus)
      var indentity = this.$cookies.get("identity")
      if (this.LoginStatus === false) {
        this.$alert("请登录后再操作", "警告");
      } else if (ClassroomStatus.indexOf("申请中") !== -1 && indentity === "student") {
        this.$alert("您没有管理员权限","警告");
      } else if (ClassroomStatus !== "空闲"){
        this.$alert("该教室已被占用，请选择另一间教室", "警告")
        console.log(1)
      } else if (ClassroomStatus === "空闲") {
        this.ClassroomInputBoxFlag = true;
        this.SubmitClassroom()
        console.log(2)
      }
    },


    // 提交教室申请操作
    SubmitClassroom(){

    }

  },

  created() {
    this.getLoginStatus();
    this.getTechingBuildingMsg();
    if (localStorage.getItem("教1-1楼") === null) {
      this.InitClassroomMsg();
    }
  }
};
</script>

<style lang="scss" scoped>
.classroomMsg {
  width: 100%;
  height: 100%;
  background-color: white;
  min-width: 650px;

  .classroomInputBox {
    padding: 5px;
    width: 30%;
    height: 20%;
    background-color: #ccc;
    position: absolute;
    left: 30%;
    top: 20%;
    z-index: 99;
    border-radius: 3px;
    .close{
      border: none;
      background-color: #ccc;
      cursor: pointer;
      color: #909399;
      float: right;
    }
    .close:hover{
      color: #4AA3FF;
    }
    .el-input {
      width: 50%;
      height: 10%;
      position: absolute;
      top: 40%;
      left: 5%;
    }
    .button{
      position: absolute;
      bottom: 10%;
      right: 5%;
    }
  }

  .topBar {
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple {
      img {
        margin: 5px 10px 5px 0;
        vertical-align: middle;
      }
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
    }
    .userMsg {
      img {
        width: 20px;
        height: 20px;
      }
      font-size: 20px;
      color: rgba(85, 140, 161, 0.712);
    }
  }

  .sideBar {
    position: absolute;
    top: 20%;
    left: 1%;
    width: 30%;
    border: 1px solid #ebeef5;
    .title {
      display: block;
      font-weight: bold;
      color: #0e2d5f;
      height: 50px;
      line-height: 16px;
      text-align: center;
      line-height: 50px;
    }
  }

  .msgBar {
    position: absolute;
    top: 20%;
    left: 32%;
    width: 67%;
    button {
      width: 8%;
      height: 50px;
      margin: 10px;
      padding: 5px;
      vertical-align: middle;
    }
  }
}
</style>
