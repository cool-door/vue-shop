<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="avatar" />
      </div>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="iconfont icon-account"
            placeholder="请输入账号/邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            prefix-icon="iconfont icon-password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="login_button">
          <el-button type="primary" @click.prevent="loginSubmit"
            >登录</el-button
          >
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号/邮箱', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.formRef.resetFields()
    },
    loginSubmit () {
      this.$refs.formRef.validate(async (valid) => {
        if (!valid);
        // 默认账号密码 admin 123456
        const { data: res } = await this.$http.post('login', this.form)
        const token = res.data.token
        if (res.meta.status !== 200 || !token) {
          return this.$message.error('登录失败')
        }
        this.$message.success('登录成功')
        sessionStorage.setItem('token', token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
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
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.login_button {
  display: flex;
  justify-content: flex-end;
}
</style>
