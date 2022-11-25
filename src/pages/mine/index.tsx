import theme from "@src/theme";

import { useRouter } from "@tarojs/taro";
import { FC, PropsWithChildren } from "react";
import { Box, Center, Text, NativeBaseProvider } from "native-base";
import "./index.less";

export const Index: FC<PropsWithChildren> = (props) => {
  const route = useRouter();
  const params = route.params;

  console.log("params", params);

  const handlePress = () => {
    console.log(123);
  };

  return (
    <NativeBaseProvider theme={theme} config={{}}>
      <Center>
        <Box flex={1}>
          <Text selectable onPress={handlePress}>
            Hello world12!
            {params?.a}
          </Text>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default Index;
