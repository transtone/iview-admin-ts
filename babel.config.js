module.exports = {
  presets: [
    [
      '@vue/app',
      {
        polyfills: [
          'es6.array.iterator',
          'es6.promise',
          'es7.promise.finally',
          'es6.symbol'
        ]
      }
    ]
  ]
}
