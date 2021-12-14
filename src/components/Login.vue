<template>
  <div class="login_container">
    <h1 align="center">Welcome to the backstage management system</h1>
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="avatar" />
      </div>
      <!-- 登录表单 -->
      <div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="75px"
          class="login_form"
        >
          <el-form-item label="Account:" prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">Login</el-button>
            <el-button type="info" @click="resetLoginForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: "Enter Username", trigger: "blur" },
          { min: 2, max: 10, message: "2 to 10 characters", trigger: "blur" }
        ],
        password: [
          { required: true, message: "Enter Password", trigger: "blur" },
          { min: 6, max: 18, message: "6 to 18 characters", trigger: "blur" }
        ]
      }
    };
  },
  
  methods: {
    // 表单重置按钮
    
    resetLoginForm() {
      // console.log(this)
      // resetFields：element-ui提供的表单方法
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 表单预验证
    

        // console.log(this.loginForm);
        if(this.loginForm.username === "admin" & this.loginForm.password === "123456"){
            this.$router.push("/home");
        }else{
            alert("Please click Reset for the default username/password to login")
        }
      }
    }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
h1 {
  color: #fff;
  font-size: 22px;
  left: 50%;
  top: 15%;
  -webkit-transform: translate(-50%, -50%);
  justify-content: center;
  position: absolute;
}
.login_box {
  width: 480px;
  height: 330px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  background-color: #fff;

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
  margin-right: 55px;
}
.info {
  font-size: 13px;
  margin: 10px 15px;
}
</style>
