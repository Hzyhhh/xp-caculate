import { Text, Center, HStack, Icon, Pressable } from "native-base";

export interface BottomBarTabType {
  key: string;
  title: string;
  icon?: (currentTab: number) => React.ReactElement;
  onPress?: () => void;
}

interface BottomBarProps {
  tabs: BottomBarTabType[];

  currentTab: number;
  onChangeTab: (tabIndex: number) => void;
}

const BottomBar = (props: BottomBarProps) => {
  const { tabs, currentTab, onChangeTab } = props;

  return (
    <HStack
      space={3}
      bg="indigo.600"
      alignItems="center"
      safeAreaBottom
      shadow={6}
    >
      {tabs.map((i, idx) => (
        <Pressable
          key={i.key}
          opacity={currentTab === idx ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => onChangeTab(idx)}
        >
          <Center>
            <Icon mb="1" as={i.icon?.(currentTab)} color="white" size="sm" />
            <Text color="white" fontSize="12">
              {i.title}
            </Text>
          </Center>
        </Pressable>
      ))}
    </HStack>
  );
};

export default BottomBar;
