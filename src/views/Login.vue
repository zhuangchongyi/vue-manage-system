<template>
  <div class="login-wrap">
    <!--引入粒子特效 https://blog.csdn.net/Fly_1213/article/details/105798197-->
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="loginForm" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="username" clearable>
            <svg-icon slot="prepend" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="loginForm.password" show-password clearable>
            <svg-icon slot="prepend" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" clearable placeholder="验证码" style="width: 60%" :readonly="loading">
            <svg-icon slot="prepend" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" />
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.remember" style="margin: 0px 0px 25px 0px; color: #fff">是否记住？</el-checkbox>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()" :loading="loading">登录</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false,
      codeUrl:
        'data:image/gif;base64,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'
    };
  },
  methods: {
    getCode() {
      this.msgError('获取失败');
    },
    submitForm() {
      this.loading = true;
      this.$refs.login.validate((valid) => {
        this.loading = false;
        if (valid) {
          this.$message.success('登录成功');
          localStorage.setItem('ms_username', this.loginForm.username);
          this.$router.push('/');
        } else {
          this.$message.error('请输入账号和密码');
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-code {
  width: 39%;
  height: 38px;
  float: right;
}
.login-code img {
  cursor: pointer;
  vertical-align: middle;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/starry.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
