import { Heading, Spacer, Tab, TabList, Tabs } from "@chakra-ui/react";

const MainList = () => {
  return (
    <>
      <Heading fontSize={"xl"} marginBottom={7} marginLeft={5}>
        Home
      </Heading>
      <Tabs align="center">
        <TabList marginX={20}>
          <Tab whiteSpace="nowrap">For You</Tab>
          <Spacer />
          <Tab>Following</Tab>
        </TabList>
      </Tabs>
    </>
  );
};

export default MainList;
