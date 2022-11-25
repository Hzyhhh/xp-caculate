export default definePageConfig({
  navigationBarTitleText: "首页",
  tabBar: {
    borderStyle: "black",
    list: [
      { pagePath: "pages/index/index", text: "TUIJIAN" },
      { pagePath: "pages/mine/index", text: "MINE" },
    ],
    position: "bottom",
  },
});
