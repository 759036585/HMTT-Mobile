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
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button  slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn">
      <van-button type="info" style="width:100%;">登陆</van-button>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        mobile: '',
        code: ''
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
      this.errorMessage.mobile = ''
      return true
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
