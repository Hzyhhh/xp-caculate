import { Box } from "native-base";
import { useRef, useState } from "react";
import { BottomBar } from "@/src/components";
import type { BottomBarTabType } from "@/src/components/BottomBar";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import Mine from "./Mine";
import Caculate from "./Caculate";
import SearchPage from "./SearchPage";

interface HomeProps {}

const tabs: BottomBarTabType[] = [
  {
    key: "search",
    title: "搜索",
    icon: () => <MaterialIcons name="search" />,
  },
  {
    key: "home",
    title: "Home",
    icon: (selected) => (
      <MaterialCommunityIcons name={selected === 1 ? "home" : "home-outline"} />
    ),
  },
  {
    key: "mine",
    title: "我的",
    icon: (selected) => (
      <MaterialCommunityIcons
        name={selected === 2 ? "account" : "account-outline"}
      />
    ),
  },
];

const Home = (props: HomeProps) => {
  const [selected, setSelected] = useState(0);
  const _page = useRef<PagerView>(null);

  const handleScroll = (page: PagerViewOnPageSelectedEvent) => {
    console.log("page", page);
  };

  return (
    <Box
      flex={1}
      // bg="white"
      // safeAreaTop
      width="100%"
      // maxW="300px"
      alignSelf="center"
      justifyContent="flex-end"
    >
      <PagerView
        style={{ flex: 1 }}
        initialPage={1}
        onPageSelected={handleScroll}
      >
        <SearchPage key="search" />
        <Caculate key="home" />
        <Mine key="mine" />
      </PagerView>
      <BottomBar tabs={tabs} currentTab={selected} onChangeTab={setSelected} />
    </Box>
  );
};

export default Home;
