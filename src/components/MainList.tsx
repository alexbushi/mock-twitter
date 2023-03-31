import { Heading, Spacer, Tab, TabList, Tabs } from "@chakra-ui/react";
import CreateTweet from "./CreateTweet";

const MainList = () => {
  return (
    <>
      <Heading fontSize={"xl"} marginY={7} marginLeft={5}>
        Home
      </Heading>
      <Tabs align="center" borderBottom="1px" borderColor="gray.100">
        <TabList marginX={20}>
          <Tab whiteSpace="nowrap">For You</Tab>
          <Spacer />
          <Tab>Following</Tab>
        </TabList>
      </Tabs>
      <CreateTweet />
    </>
  );
};

export default MainList;
