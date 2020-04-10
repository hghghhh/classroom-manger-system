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
            <el-button type="text">你好，请登陆</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 侧边栏 -->
    <div class="sideBar">
      <span class="title">教室管理系统</span>
      <!-- <el-divider></el-divider> -->
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="教1" name="1">
          <el-button type="primary">1楼</el-button>
          <el-button type="primary">2楼</el-button>
          <el-button type="primary">3楼</el-button>
          <el-button type="primary">4楼</el-button>
          <el-button type="primary">5楼</el-button>
        </el-collapse-item>
        <el-collapse-item title="教2" name="2">
          <el-button type="primary">1楼</el-button>
          <el-button type="primary">2楼</el-button>
          <el-button type="primary">3楼</el-button>
          <el-button type="primary">4楼</el-button>
          <el-button type="primary">5楼</el-button>
        </el-collapse-item>
        <el-collapse-item title="教3" name="3">
          <el-button type="primary">1楼</el-button>
          <el-button type="primary">2楼</el-button>
          <el-button type="primary">3楼</el-button>
        </el-collapse-item>
        <el-collapse-item title="教4" name="4">
          <el-button type="primary">1楼</el-button>
          <el-button type="primary">2楼</el-button>
          <el-button type="primary">3楼</el-button>
        </el-collapse-item>
        <el-collapse-item title="教5" name="5">
          <el-button type="primary">1楼</el-button>
          <el-button type="primary">2楼</el-button>
          <el-button type="primary">3楼</el-button>
        </el-collapse-item>
        <el-collapse-item title="教6" name="6">
          <el-button type="primary">1楼</el-button>
          <el-button type="primary">2楼</el-button>
          <el-button type="primary">3楼</el-button>
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
      value1: ""
    };
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
