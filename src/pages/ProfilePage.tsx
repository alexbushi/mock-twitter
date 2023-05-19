import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Tweet, useGetUserTweets } from "../services/addTweet";
import TweetCard from "../components/TweetCard";

const ProfilePage = () => {
  const [user] = useAuthState(auth);
  const { isLoading, tweets } = useGetUserTweets();

  return (
    <>
      <Box maxW="md" mx="auto" my="7">
        <Stack spacing={4}>
          <Heading fontSize={"xl"}>Profile</Heading>
          <Text>{user?.displayName}</Text>
          <Button size="sm" w="90px" onClick={() => logout()}>
            Logout
          </Button>
        </Stack>
      </Box>
      {tweets.map((tweet: Tweet) => (
        <TweetCard
          key={tweet.id}
          id={tweet.id}
          user_id={tweet.user_id}
          content={tweet.content}
          username={tweet.username}
          likes_count={tweet.likes_count}
          created_at={tweet.created_at}
        />
      ))}
    </>
  );
};

export default ProfilePage;
