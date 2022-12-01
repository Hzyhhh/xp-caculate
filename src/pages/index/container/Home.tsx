import { Box, Column, ScrollView } from "native-base";
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
  const _page = useRef<PagerView>(null);
  const [selected, setSelected] = useState(1);

  const handleScroll = (page: PagerViewOnPageSelectedEvent) => {
    setSelected(page.nativeEvent.position);
  };

  const handleChangeTab = (tabIndex: number) => {
    console.log("12", tabIndex);

    setSelected(tabIndex);
    _page.current?.setPage(tabIndex);
  };

  return (
    <Column
      flex={1}
      // bg="white"
      // safeAreaTop={false}
      width="100%"
    >
      <Column flex={1}>
        <ScrollView>
          <PagerView ref={_page} initialPage={1} onPageSelected={handleScroll}>
            <SearchPage key="search" />
            <Caculate key="home" />
            <Mine key="mine" />
          </PagerView>
        </ScrollView>
      </Column>

      {/* 底部栏 */}
      <BottomBar
        tabs={tabs}
        currentTab={selected}
        onChangeTab={handleChangeTab}
      />
    </Column>
  );
};

export default Home;
