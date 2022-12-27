import { useMemo, useRef, useState } from "react";
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
  Toast,
} from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import shortId from "shortid";
import { createForm, WrappedFormMethods } from "rc-form";
import {
  TimePickerModal,
  TimeRange,
  TimePickerModalMethod,
} from "@/src/components";

interface CaculateProps {
  form: WrappedFormMethods;
}

interface ClassListType {
  id: string;
  date: string;
  classTime: number;
}
const date = new Date();

const Caculate = (props: CaculateProps) => {
  const {
    form: {
      getFieldDecorator: f,
      validateFields: v,
      getFieldValue: g,
      setFieldsValue: s,
    },
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [classList, setClassList] = useState<ClassListType[]>([]);
  const _timeModal = useRef<TimePickerModalMethod>(null);
  const [selectedDate, setSelectedDate] = useState(getFormatedDate(date));
  const [startTime, setStartTime] = useState("19:00");
  const [endTime, setEndTime] = useState("20:30");

  const handlePress = () => {
    setShowPopover(true);
  };

  const handleSelectDate = (dateString: string) => {
    setShowPopover(false);
    console.log("dateString", dateString);

    setSelectedDate(dateString);
    setShowModal(true);
  };

  const handleDeleteRecord = (id: string) => {
    setClassList((plist) => {
      plist = [...plist];
      const targetIndex = plist.findIndex((i) => i.id === id);
      plist.splice(targetIndex, 1);
      return plist;
    });
  };

  const handleGenerator = () => {
    v((err, val) => {
      if (err) {
        return;
      }
      console.log("val", val);
    });
  };

  const handleEditTime = (type: "start" | "end") => {
    const renderType = {
      start: () =>
        _timeModal.current?.show({
          type,
          time: startTime,
          title: "设置开始时间",
        }),
      end: () =>
        _timeModal.current?.show({
          type,
          time: endDateTime,
          title: "设置结束时间",
        }),
    };

    return renderType[type]?.();
  };

  const startDateTime = useMemo(() => {
    return selectedDate + " " + startTime;
  }, [selectedDate, startTime]);

  const endDateTime = useMemo(() => {
    return selectedDate + " " + endTime;
  }, [endTime, selectedDate]);

  const handleConfirm = () => {
    setShowModal(false);
    let [startDate, splitStartTime] = startDateTime.split(" ");
    let [endDate, splitEndTime] = endDateTime.split(" ");
    function formatTime(t: string) {
      const [hour, min] = t.split(":");
      return Number(hour) + Number(Number(min) / 60);
    }
    const startTimeFormat = formatTime(splitStartTime);
    const endTimeFormat = formatTime(splitEndTime);
    let classTime = endTimeFormat - startTimeFormat;
    // 这里做跨天的校验
    if (startDate !== endDate) {
      Toast.show({});
    }

    const target = {
      id: shortId.generate(),
      date: startDateTime + " ~ " + endDateTime,
      classTime: classTime / g("classTime"),
    };
    console.log("target", target);

    setClassList((plist) => plist.concat(target));
  };

  return (
    <Column space="3" px="6">
      <Heading size="md">计算页</Heading>
      <Box>
        <FormControl isInvalid w="65%">
          <FormControl.Label>单节课时长</FormControl.Label>

          {f("classTime")(
            <Select
              selectedValue={g("classTime")}
              // minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: "teal.100",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(val) => s({ classTime: val })}
            >
              <Select.Item label="1小时" value="1" />
              <Select.Item label="1.5小时" value="1.5" />
              <Select.Item label="2小时" value="2" />
            </Select>
          )}

          {false && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              请设置单节课时长
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid w="65%">
          <FormControl.Label>优惠（打几折）</FormControl.Label>
          {f("discount")(
            <Input
              // value={g("discount")}
              variant="underlined"
              placeholder="这里输入优惠幅度"
              onChangeText={(disc) => s({ discount: disc })}
            />
          )}
          <FormControl.HelperText fontSize="12">
            填写小数，不超过1。例如七五折就填0.75
          </FormControl.HelperText>
          {false && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Try different from previous passwords.
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid w="65%">
          <FormControl.Label>名字</FormControl.Label>
          {f("name")(
            <Input
              // value={g("name")}
              variant="underlined"
              placeholder="学生姓名 / 昵称"
              onChangeText={(n) => s({ name: n })}
            />
          )}
          {false && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              ⬆️你要填小朋友的名称。例如: 塔子、曼曼
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid w="65%">
          <FormControl.Label>单价💰</FormControl.Label>
          {f("unitPrice")(
            <Input
              // value={g("unitPrice")}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="rmb" />}
                  size={5}
                  // ml="2"
                  color="muted.400"
                />
              }
              InputRightElement={<Text>元</Text>}
              variant="underlined"
              placeholder="这里输入单价"
              keyboardType="numbers-and-punctuation"
              onChangeText={(n) => s({ unitPrice: n })}
            />
          )}
          <FormControl.HelperText>
            填数字，一节课单价多少钱。例如10
          </FormControl.HelperText>
          {false && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Try different from previous passwords.
            </FormControl.ErrorMessage>
          )}
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
                        style={{
                          transform: [{ scale: isPressed ? 0.99 : 1 }],
                        }}
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
                  onDateChange={handleSelectDate}
                />
              </Popover.Content>
            </Popover>
          </Row>
        </FormControl>

        <FormControl>
          {classList.map((i, idx) => (
            <Row key={i.id} justifyContent="space-between" alignItems="center">
              <Row width="80%" justifyContent="space-between">
                <FormControl.Label>{idx + 1}</FormControl.Label>
                <FormControl.Label>{i.date}</FormControl.Label>
                <FormControl.Label>{i.classTime}课时</FormControl.Label>
              </Row>
              <Pressable>
                {({ isPressed }) => {
                  return (
                    <Box
                      hitSlop={{ right: 10, left: 10 }}
                      px="1.1"
                      borderRadius="50"
                      borderWidth="0.5"
                      borderColor="danger.500"
                    >
                      <Icon
                        as={MaterialIcons}
                        color="danger.500"
                        name="close"
                        size={isPressed ? "4" : "5"}
                        onPress={() => handleDeleteRecord(i.id)}
                      />
                    </Box>
                  );
                }}
              </Pressable>
            </Row>
          ))}
        </FormControl>
      </Box>
      <Button onPress={handleGenerator}>生成</Button>

      {/* 弹窗 */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.Header>课程时长</Modal.Header>
          <Modal.Header py="0">
            <Box px="3">
              <Row alignItems="center" justifyContent="space-around">
                <Button disabled variant="unstyled" size="sm">
                  开始时间
                </Button>
                <Button disabled variant="unstyled" size="sm">
                  结束时间
                </Button>
              </Row>
            </Box>
          </Modal.Header>

          <TimeRange
            startTime={startDateTime}
            endTime={endDateTime}
            onClickStartTime={() => handleEditTime("start")}
            onClickEndTime={() => handleEditTime("end")}
          />

          <Modal.Footer py="1">
            <Button.Group>
              <Button size="xs" onPress={handleConfirm}>
                确定时长
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <TimePickerModal
        ref={_timeModal}
        onTimeChange={(time, type) => {
          const setTime = {
            start: () => setStartTime(time),
            end: () => setEndTime(time),
          };

          return setTime[type]?.();
        }}
      />
    </Column>
  );
};

export default createForm()(Caculate);

const styles = StyleSheet.create({
  container: {},
});
