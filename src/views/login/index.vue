<template>
  <div class="container">
    <van-nav-bar title="登陆" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
      <van-field
      v-model.trim="userForm.mobile"
      @blur="validMobile"
      :error-message="errorMessage.mobile"
      required type="tel"
      label="手机号"
      placeholder='请输入手机号'
      />
      <van-field
          v-model="userForm.code"
          center
          clearable
           @blur="validCode"
           required
          :error-message="errorMessage.code"
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button  slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn">
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" type="info" style="width:100%;" @click="login">登陆</van-button>

    </div>

  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      userForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errorMessage: {
        mobile: '',
        code: ''
      }
    }
  },

  methods: {
    validMobile () {
      if (!this.userForm.mobile) {
        this.errorMessage.mobile = '手机号码不能为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.userForm.mobile)) {
        this.errorMessage.mobile = '手机号码格式不正确'
        return false
      }
      this.errorMessage.mobile = ''
      return true
    },
    validCode () {
      if (!this.userForm.code) {
        this.errorMessage.code = '请输入验证码'
        return false
      }
      if (!/\d{6}$/.test(this.userForm.code)) {
        this.errorMessage.code = '验证码为6位数字'
        return false
      }
      this.errorMessage.code = ''
      return true
    },
    ...mapMutations(['updateUser']),

    async login () {
      if (this.validMobile() && this.validCode()) {
        const result = await login(this.userForm)
        this.updateUser({ user: result })
        this.$notify({ type: 'success', message: '登陆成功', duration: 800 })
        let { redirectUrl } = this.$route.query
        this.$router.push(redirectUrl || '/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  padding: 0 10px;
  .van-button{
    border-radius: 20px;
  }
}
</style>
