module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: name => {
          // name = name.slice(3)
          return `element-plus/theme-chalk/${name}.css`
        },
        customName: name => {
          return `element-plus/lib/components/${name.slice(3)}`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
