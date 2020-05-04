module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ['ie >= 8', 'iOS 7'],
        },
      },
    ],
  ],
}