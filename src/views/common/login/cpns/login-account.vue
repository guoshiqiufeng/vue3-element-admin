<template>
  <div class="login-account">
    <el-form ref="formRef" :model="account" :rules="rules">
      <el-form-item prop="username">
        <el-input
          v-model="account.username"
          placeholder="帐号"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="account.password"
          placeholder="密码"
          type="password"
          show-password
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineExpose, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'
const store = useStore()
const account = reactive({
  username: localCache.getCache('username') ?? '',
  password: localCache.getCache('password') ?? ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = (isKeepPassword: boolean) => {
  console.log('loginAction')
  formRef.value?.validate(isValid => {
    if (isValid) {
      console.log(isValid)
      // 判断记住密码
      if (isKeepPassword) {
        // 缓存
        localCache.setCache('username', account.username)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
      // 登录
      store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}

defineExpose({
  loginAction
})
</script>
<style scoped lang="scss"></style>
