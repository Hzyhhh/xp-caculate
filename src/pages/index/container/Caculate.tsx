import { useState } from "react";
import { StyleSheet } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { zhConfigs } from "@/src/utils";
import {
  Text,
  Box,
  AddIcon,
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
  Center,
  Modal,
  Button,
} from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

interface CaculateProps {}

const Caculate = (props: CaculateProps) => {
  const [selectedDate, setSelectedDate] = useState(getFormatedDate(new Date()));
  const [classTime, setClassTime] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => {
    // Modal;
    setShowModal(true);
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
            ⬆️小胖你要填小朋友的名称。例如: 塔子、曼曼
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

        <FormControl isInvalid w="80%">
          <Row justifyContent="space-between" alignItems="center">
            <FormControl.Label>上课记录</FormControl.Label>
            <Pressable onPress={handlePress}>
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
                    <Text letterSpacing={0.5} color="light.50" fontSize={12}>
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
          </Row>

          <Select
            // selectedValue={classTime}
            minWidth="200"
            // accessibilityLabel="Choose Service"
            placeholder="请选择"
            _selectedItem={{
              bg: "teal.100",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            dropdownIcon={<></>}
            isDisabled
            onOpen={(nativeEvent) => {
              console.log(123, nativeEvent);
            }}
            // onValueChange={setClassTime}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            请设置单节课时长
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>
      <Text>{selectedDate}</Text>

      <DatePicker
        mode="calendar"
        configs={zhConfigs}
        current={selectedDate}
        selected={selectedDate}
        onSelectedChange={setSelectedDate}
      />

      <DatePicker
        mode="time"
        // mode="calendar"
        minuteInterval={30}
        configs={zhConfigs}
        // current={selectedDate}
        // selected={selectedDate}
        // onSelectedChange={setSelectedDate}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />

          <Modal.Header>增加记录</Modal.Header>

          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                取消
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                确定
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Column>
  );
};

export default Caculate;

const styles = StyleSheet.create({
  container: {},
});
