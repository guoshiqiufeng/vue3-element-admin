<template>
  <div class="login-panel">
    <h3 class="title">欢迎登录</h3>
    <login-account ref="accountRef" />

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <!--      <el-link type="primary">忘记密码</el-link>-->
    </div>

    <el-button
      class="login-btn"
      size="large"
      type="primary"
      @click="handleLoginClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
export default defineComponent({
  components: { LoginAccount },
  setup() {
    // 属性
    const currentTab = ref('account')
    const isKeepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const handleLoginClick = () => {
      console.log('handleLoginClick')
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      }
    }
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab
    }
  }
})
</script>
<style scoped lang="scss">
.login-panel {
  .title {
    font-size: 16px;
  }

  .el-icon {
    vertical-align: -10%;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
