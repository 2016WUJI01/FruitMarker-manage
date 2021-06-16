<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules2"
        ref="loginForm"
        label-width="100px"
        class="login_form"
      >
        <el-form-item
          label="用户名"
          prop="userName"
        >
          <el-input
            type="text"
            v-model="loginForm.userName"
            auto-complete="off"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
          >登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validateuser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userName: "test",
        password: "123456",
      },
      rules2: {
        userName: [{ validator: validateuser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .get("/api/login", {
              params: {
                userName: this.loginForm.userName,
                password: this.loginForm.password,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data.state === 1) {
                this.$router.push({ path: "/home" });
              } else {
                this.$alert("账号或密码错误", "标题", {
                  confirmButtonText: "确定",
                });
              }
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.login_container {
  margin: -8px;
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>