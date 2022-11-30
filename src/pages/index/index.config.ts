export default definePageConfig({
  navigationBarTitleText: "首页",
  disableScroll: true,
  tabBar: {
    custom: true,
    borderStyle: "black",
    list: [
      { pagePath: "pages/index/index", text: "TUIJIAN" },
      { pagePath: "pages/mine/index", text: "MINE" },
    ],
  },
});
