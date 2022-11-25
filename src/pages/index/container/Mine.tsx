import { useRouter } from "@tarojs/taro";
import { FC, PropsWithChildren } from "react";
import { Box, Center, Text } from "native-base";
import "../index.less";

export const Mine: FC<PropsWithChildren> = (props) => {
  const route = useRouter();
  const params = route.params;

  console.log("params", params);

  const handlePress = () => {
    console.log(123);
  };

  return (
    <Center>
      <Box flex={1}>
        <Text onPress={handlePress}>
          Hello world12!
          {params?.a}
        </Text>
      </Box>
    </Center>
  );
};

export default Mine;
