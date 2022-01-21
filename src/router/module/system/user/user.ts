const user = () => import('@/views/module/system/user/user.vue')
export default {
  path: '/system/user',
  name: 'user',
  component: user,
  children: []
}
