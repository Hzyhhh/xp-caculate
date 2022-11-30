import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import type { KeyboardTypeOptions } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { zhConfigs } from "@/src/utils";
import {
  Box,
  Column,
  FormControl,
  Heading,
  Icon,
  Input,
  WarningOutlineIcon,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";

interface CaculateProps {}

const Caculate = (props: CaculateProps) => {
  const [selectedDate, setSelectedDate] = useState(getFormatedDate(new Date()));

  return (
    <Column space="3" px="6">
      <Heading size="md">计算页</Heading>
      <Box>
        <FormControl isInvalid w="80%">
          <FormControl.Label>名字</FormControl.Label>
          <Input variant="underlined" placeholder="学生姓名 / 昵称" />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            ⬆️小胖你要填小朋友的名称。例如: 塔子、曼曼
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid w="80%">
          <FormControl.Label>单价💰</FormControl.Label>
          <Input variant="underlined" placeholder="Enter password" />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Try different from previous passwords.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid w="80%">
          <FormControl.Label>单价💰</FormControl.Label>
          <Input
            w={{
              base: "75%",
            }}
            InputLeftElement={
              <Icon
                as={<FontAwesome name="rmb" />}
                size={5}
                // ml="2"
                color="muted.400"
              />
            }
            variant="underlined"
            placeholder="Name"
            keyboardType="numbers-and-punctuation"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Try different from previous passwords.
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>
      <Text>{selectedDate}</Text>

      <DatePicker
        configs={zhConfigs}
        current={selectedDate}
        selected={selectedDate}
        onSelectedChange={setSelectedDate}
      />
    </Column>
  );
};

export default Caculate;

const styles = StyleSheet.create({
  container: {},
});
