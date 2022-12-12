import { zhConfigs } from "@/src/utils";
import { IModalProps, Modal } from "native-base";
import { forwardRef, useImperativeHandle, useState } from "react";
import DatePicker from "react-native-modern-datepicker";

interface TimePickerModalProps extends IModalProps {
  time?: string;
  onTimeChange?: (dateString: string, type: "start" | "end") => void;
}

interface ModalOptionType {
  title: string;
  time?: string;
  type: "start" | "end";
}

export interface TimePickerModalMethod {
  show: (option?: ModalOptionType) => void;
}

type T = TimePickerModalProps;

type P = TimePickerModalMethod;

export const TimePickerModal = forwardRef<P, T>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"start" | "end">("start");
  const [time, setTime] = useState("");

  useImperativeHandle(ref, () => ({
    show: (option: ModalOptionType) => {
      setType(option.type);
      setTitle(option.title);
      setVisible(true);
      setTime(option.time);
    },
  }));

  const handleTimeChange = (timeString: string) => {
    setVisible(false);
    props.onTimeChange?.(timeString, type);
  };

  return (
    <Modal {...props} isOpen={visible} onClose={() => setVisible(false)}>
      <Modal.Content>
        {!!title && <Modal.Header>{title}</Modal.Header>}

        <DatePicker
          mode="time"
          // mode="calendar"
          minuteInterval={10}
          configs={zhConfigs}
          current={time}
          selected={time}
          onTimeChange={handleTimeChange}
        />
      </Modal.Content>
    </Modal>
  );
});
export default TimePickerModal;
