import { NativeBaseProvider } from "native-base";
import { PropsWithChildren } from "react";
import theme from "@src/theme";

import "./app.less";

/**
 * 这里做一些全局注入
 */

export default (props: PropsWithChildren) => {
  return (
    <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
  );
};
