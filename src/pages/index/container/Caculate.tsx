import { useState } from "react";
import { StyleSheet } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { zhConfigs } from "@/src/utils";
import {
  Text,
  Box,
  CheckIcon,
  Column,
  FormControl,
  Heading,
  Icon,
  Input,
  Pressable,
  Row,
  Select,
  WarningOutlineIcon,
  Modal,
  Popover,
  Button,
  Center,
} from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import shortId from "shortid";

interface CaculateProps {}

interface ClassListType {
  id: string;
  date: string;
  classTime: number;
}

const Caculate = (props: CaculateProps) => {
  const [selectedDate, setSelectedDate] = useState(getFormatedDate(new Date()));
  const [classTime, setClassTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [classList, setClassList] = useState<ClassListType[]>([]);

  const handlePress = () => {
    setShowPopover(true);
  };

  const handleSelectDate = (dateString: string) => {
    setShowPopover(false);
    setSelectedDate(dateString);
    setShowModal(true);
  };

  const handleTimeChange = (timeString: string) => {
    setShowModal(false);

    const [hour, min] = timeString.split(":");
    const timeList = [Number(hour), Number(min) / 60];

    const target = {
      id: shortId.generate(),
      date: selectedDate,
      classTime: timeList.reduce((prev, cur) => prev + cur, 0),
    };
    console.log("target", target);

    setClassList((plist) => plist.concat(target));
  };

  return (
    <Column space="3" px="6">
      <Heading size="md">计算页</Heading>
      <Box>
        <FormControl isInvalid w="80%">
          <FormControl.Label>单节课时长</FormControl.Label>
          <Select
            selectedValue={classTime}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
              bg: "teal.100",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={setClassTime}
          >
            <Select.Item label="1小时" value="1" />
            <Select.Item label="1.5小时" value="1.5" />
            <Select.Item label="2小时" value="2" />
          </Select>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            请设置单节课时长
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
          <FormControl.Label>名字</FormControl.Label>
          <Input variant="underlined" placeholder="学生姓名 / 昵称" />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            ⬆️你要填小朋友的名称。例如: 塔子、曼曼
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

        <FormControl isInvalid>
          <Row justifyContent="space-between" alignItems="center">
            <FormControl.Label>上课记录</FormControl.Label>
            <Popover
              isOpen={showPopover}
              onClose={() => setShowPopover(false)}
              trigger={(triggerProps) => {
                return (
                  <Pressable {...triggerProps} onPress={handlePress}>
                    {({ isPressed }) => (
                      <Box
                        borderRadius={6}
                        backgroundColor={isPressed ? "info.300" : "info.500"}
                        py="0.8"
                        px="2"
                        style={{ transform: [{ scale: isPressed ? 0.99 : 1 }] }}
                      >
                        <Row justifyContent="space-around" alignItems="center">
                          <Icon
                            as={MaterialIcons}
                            color="light.50"
                            name="add"
                            size="4"
                          />
                          <Text
                            letterSpacing={0.5}
                            color="light.50"
                            fontSize={12}
                          >
                            添加新的上课记录
                          </Text>

                          <Icon
                            as={MaterialIcons}
                            color="light.50"
                            name="chevron-right"
                            size="4"
                          />
                        </Row>
                      </Box>
                    )}
                  </Pressable>
                );
              }}
            >
              <Popover.Content w="56">
                <Popover.Arrow />
                <DatePicker
                  mode="calendar"
                  configs={zhConfigs}
                  current={selectedDate}
                  selected={selectedDate}
                  // onSelectedChange={handleSelectDate}
                  onDateChange={handleSelectDate}
                />
              </Popover.Content>
            </Popover>
          </Row>
        </FormControl>

        <FormControl>
          {classList.map((i) => (
            <Row key={i.id} justifyContent="space-between" alignItems="center">
              <Row width="80%" justifyContent="space-between">
                <FormControl.Label>{i.date}</FormControl.Label>
                <FormControl.Label>{i.classTime}课时</FormControl.Label>
              </Row>
              <Pressable>
                {({ isPressed }) => {
                  return (
                    <Box
                      hitSlop={{ right: 10, left: 10 }}
                      px="1.4"
                      borderRadius="50"
                      borderWidth="0.5"
                      borderColor="danger.500"
                    >
                      <Icon
                        as={MaterialIcons}
                        color="danger.500"
                        name="close"
                        size={isPressed ? "4" : "5"}
                      />
                    </Box>
                  );
                }}
              </Pressable>
            </Row>
          ))}
        </FormControl>
      </Box>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.Header>增加记录</Modal.Header>

          <DatePicker
            mode="time"
            // mode="calendar"
            minuteInterval={30}
            configs={zhConfigs}
            // current={selectedDate}
            // selected={selectedDate}
            // onSelectedChange={setSelectedDate}
            onTimeChange={handleTimeChange}
          />
        </Modal.Content>
      </Modal>
    </Column>
  );
};

export default Caculate;

const styles = StyleSheet.create({
  container: {},
});
