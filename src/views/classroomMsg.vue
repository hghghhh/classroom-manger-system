<template>
  <div class="classroomMsg">
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
            <div class="block">
              <el-date-picker v-model="value1" type="date" placeholder="请选择日期"></el-date-picker>
            </div>
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
      <!-- <el-divider></el-divider> -->
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          :title="item"
          :name="index"
          v-for="(item,index) in TechingBuildMsg"
          :key="index"
        >
          <el-button type="primary" v-for="(item,index) in FloorMsg" :key="index">{{item.value}}</el-button>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 信息栏 -->
    <div class="msgBar">
      <el-card class="box-card">
        <el-button type="success">
          <p>101</p>
          <p>空闲</p>
        </el-button>
        <el-button type="success">
          <p>102</p>
          <p>空闲</p>
        </el-button>
        <el-button type="success">
          <p>103</p>
          <p>空闲</p>
        </el-button>
        <el-button type="danger">
          <p>104</p>
          <p>社团活动</p>
        </el-button>
        <el-button type="success">
          <p>105</p>
          <p>空闲</p>
        </el-button>
        <el-button type="success">
          <p>106</p>
          <p>空闲</p>
        </el-button>
        <el-button type="danger">
          <p>107</p>
          <p>上课</p>
        </el-button>
        <el-button type="success">
          <p>108</p>
          <p>空闲</p>
        </el-button>
        <el-button type="success">
          <p>109</p>
          <p>空闲</p>
        </el-button>
        <el-button type="success">
          <p>110</p>
          <p>空闲</p>
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
      TechingBuildMsg: [], //存储按教学楼楼号排序的教学楼楼号
      FloorMsg: [] //存储按教学楼楼号排好序的、各教学楼的楼层信息
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
            var buildingArr = []; //用来将从接口接收到的教学楼楼号排序
            for (var a in result.body) {
              buildingArr.push(a);
            }
            this.TechingBuildMsg = buildingArr.sort();
            var floorArr = []; //用来将从接口接受到每栋教学楼的楼层信息按教学楼楼号顺序排序
            for (var i = 1; i <= Object.keys(result.body).length; i++) {
              floorArr.push(result.body["教" + i]);
            }
            
            
              
            console.log(floorArr);
            this.FloorMsg = floorArr[0]
              .replace("[", "")
              .replace("]", "")
              .split(",");
            console.log(this.FloorMsg);
          }

        });
    }
  },

  created() {
    this.getLoginStatus();
    this.getTechingBuildingMsg();
  }
};
</script>

<style lang="scss" scoped>
.classroomMsg {
  width: 100%;
  height: 100%;
  background-color: white;
  min-width: 650px;

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
