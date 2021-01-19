<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        :error-message="usernameErrorMsg"
        @click-icon="username = ''"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary"
        :loading="openLoading"
        @click="loginAction"
        size="large"
          >登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'
import url from '@/serviceAPI.config.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      openLoading: false, // 是否开启用户的Loading
      usernameErrorMsg: '',
      passwordErrorMsg: ''
    }
  },
  created () {
    if (localStorage.userInfo) {
      Toast.success('您已经登录过了')
      this.$router.push('/')
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    checkForm () {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位'
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    loginAction () {
      // if (this.checkForm()) {
      //   this.axiosLoginUser()
      // }
      this.checkForm() && this.axiosLoginUser()
    },
    axiosLoginUser () {
      this.openLoading = true
      axios({
        url: url.login,
        method: 'post',
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then((response) => {
          console.log(response)
          if (response.data.code === 200) {
            /* eslint-disable no-new */
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username }
              setTimeout(() => { resolve() }, 500)
            })
            Toast.success('登录成功')
            this.$router.push('/')
          } else {
            console.log(response.data.message)
            Toast.fail('登录失败')
            this.openLoading = false
          }
        })
        .catch((error) => {
          Toast.fail(error)
          this.openLoading = false
        })
    }
  }
}
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
