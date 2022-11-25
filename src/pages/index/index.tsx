import Taro from "@tarojs/taro";
import { FC, PropsWithChildren, useState } from "react";
import { View, Text, Button } from "@tarojs/components";

import "./index.less";

export const Index: FC<PropsWithChildren> = () => {
  const [current, setCurrent] = useState(0);
  const handleClick = () => {
    Taro.navigateTo({ url: `/pages/mine/index?a=${22222}` });
  };

  const handleTabClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <View className="index">
      <Text>Hello world12!</Text>
      <Button type="primary" size="mini" onClick={handleClick}>
        <Text>123</Text>
      </Button>
    </View>
  );
};

export default Index;
