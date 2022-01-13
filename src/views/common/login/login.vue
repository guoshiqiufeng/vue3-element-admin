<template>
  <div class="login">
    <login-panel class="login-panel"></login-panel>
  </div>
</template>
<script lang="ts" setup>
import LoginPanel from './cpns/login-panel.vue'
</script>
<style scoped lang="scss">
.login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;

  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-image: url(~@/assets/img/login_bg.png);
    background-size: cover;
  }

  .login-panel {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    padding: 150px 60px 180px;
    width: 470px;
    min-height: 100%;
    background-color: #fff;
  }
}
</style>
