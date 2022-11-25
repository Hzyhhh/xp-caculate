import Taro from "@tarojs/taro";
import { FC, PropsWithChildren } from "react";

import "./index.less";
import Home from "./container/Home";

/**
 * 这里放tab
 */

export const Index: FC<PropsWithChildren> = () => {
  // 跳转用法
  const handleClick = () => {
    Taro.navigateTo({ url: `/pages/mine/index?a=${22222}` });
  };

  return <Home />;
};

export default Index;
