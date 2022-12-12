import { Box, Button, Row, Text } from "native-base";
import { FC } from "react";

interface TimeRangeprops {
  startTime: string;
  endTime: string;
  onClickStartTime?: () => void;
  onClickEndTime?: () => void;
}

export const TimeRange: FC<TimeRangeprops> = (props) => {
  const { startTime, endTime, onClickStartTime, onClickEndTime } = props;
  return (
    <Box px="3" backgroundColor="info.100">
      <Row alignItems="center" justifyContent="space-between">
        <Button variant="ghost" size="sm" onPress={onClickStartTime}>
          {startTime}
        </Button>
        <Text fontSize="xs">~</Text>
        <Button variant="ghost" size="sm" onPress={onClickEndTime}>
          {endTime}
        </Button>
      </Row>
    </Box>
  );
};

export default TimeRange;
