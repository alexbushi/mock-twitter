import { Heading, Spacer, Spinner, Tab, TabList, Tabs } from "@chakra-ui/react";
import CreateTweet from "./CreateTweet";
import TweetCard from "./TweetCard";
import { Tweet, useGetTweetsByIds } from "../services/addTweet";

const MainList = () => {
  const { isLoading, tweets } = useGetTweetsByIds();

  if (isLoading) return <Spinner />;

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
      {tweets.map((tweet: Tweet) => (
        <TweetCard
          key={tweet.id}
          id={tweet.id}
          user_id={tweet.user_id}
          content={tweet.content}
          username={tweet.username}
          name={tweet.name}
          likes={tweet.likes}
          created_at={tweet.created_at}
        />
      ))}
    </>
  );
};

export default MainList;
