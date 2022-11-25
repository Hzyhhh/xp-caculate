// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md

const moduleResolver = [
  require.resolve("babel-plugin-module-resolver"),
  {
    root: ["./"],
    alias: {
      "@src": "./src",
    },
  },
];

module.exports = {
  presets: [
    [
      "taro",
      {
        framework: "react",
        ts: true,
      },
    ],
  ],
  plugins: ["react-native-reanimated/plugin", moduleResolver],
};
