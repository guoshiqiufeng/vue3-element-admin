<template>
  <div class="main-navbar">
    <div class="navbar-header">
      <h1 class="header-brand">
        <a class="brand-lg" href="javascript:;">Vue3-Element-Admin</a>
        <a class="brand-mini" href="javascript:;">VEA</a>
      </h1>
    </div>
    <div class="navbar-body">
      <el-menu class="body-menu menu-left" mode="horizontal">
        <el-menu-item class="navbar-switch" index="0">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
      </el-menu>
      <el-menu class="body-menu" mode="horizontal">
        <el-menu-item class="body-menu-item" index="2">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img v-if="userIcon" :src="userIcon" alt="" />
              <img v-else src="~@/assets/img/user-icon.png" alt="" />
              {{ userName }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="updatePasswordHandle()">
                  修改密码
                </el-dropdown-item>
                <el-dropdown-item @click="logoutHandle()">
                  退出
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import IconSvg from '@/components/icon-svg/src/icon-svg.vue'
const store = useStore()
const userName = computed(() => {
  return store.state.login.userInfo.nickname
})
const userIcon = computed(() => {
  return store.state.login.userInfo.userIcon
})
const updatePasswordHandle = () => {
  console.log('updatePasswordHandle')
}
const logoutHandle = () => {
  console.log('logoutHandle')
}
</script>
<style scoped lang="scss">
$--color-primary: #3e8ef7;

// Navbar
$navbar--background-color: $--color-primary;

.main-navbar {
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  background-color: $navbar--background-color;

  .navbar-header {
    width: 230px;
    height: 50px;
    overflow: hidden;

    .header-brand {
      width: 230px;
      height: 50px;
      margin: 0;
      line-height: 50px;
      font-size: 18px;
      text-align: center;
      text-transform: uppercase;
      white-space: nowrap;
      color: #fff;

      .brand-lg,
      .brand-mini {
        margin: 0 5px;
        color: #fff;
        text-decoration: none;
        &:focus,
        &:hover {
          color: #fff;
          text-decoration: none;
        }
      }

      .brand-mini {
        display: none;
      }
    }
  }

  .navbar-body {
    display: flex;
    flex-direction: row;
    flex: 1;
    padding-right: 15px;
    background-color: #fff;

    .body-menu {
      justify-content: flex-end;
      background-color: transparent;
      border-bottom: 0;
      width: 100%;

      .body-menu-item {
        border-bottom: none;

        .el-dropdown-link {
          > img {
            width: 36px;
            height: auto;
            margin-right: 5px;
            border-radius: 100%;
            vertical-align: middle;
          }
        }
      }

      a:focus,
      a:hover {
        text-decoration: none;
      }

      .el-menu-item,
      .el-submenu > .el-submenu__title {
        height: 50px;
        line-height: 50px;
      }

      .el-submenu > .el-menu {
        top: 55px;
      }

      .el-badge {
        display: inline;
        z-index: 2;

        &__content {
          line-height: 16px;
        }
      }
    }

    .menu-left {
      justify-content: flex-start;
    }
  }
}
</style>
