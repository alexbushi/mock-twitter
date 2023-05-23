import { Box, Button, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { logout } from "../firebase";
import {
  Tweet,
  addFollowerFollowing,
  useGetTweetsByUsername,
} from "../services/addTweet";
import TweetCard from "../components/TweetCard";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, tweets } = useGetTweetsByUsername(username);

  return (
    <>
      <Box maxW="md" mx="auto" my="7">
        <Stack spacing={4}>
          <Heading fontSize={"xl"}>Profile</Heading>
          <Text>@{username}</Text>
          <Box
            as="button"
            bg="black"
            borderRadius="full"
            w="90px"
            h="40px"
            textColor="white"
            fontWeight="bold"
            onClick={() => {
              addFollowerFollowing(username);
            }}
          >
            Follow
          </Box>
          <Button size="sm" w="90px" onClick={() => logout()}>
            Logout
          </Button>
        </Stack>
      </Box>
      {isLoading ? (
        <Spinner />
      ) : (
        tweets.map((tweet: Tweet) => (
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
        ))
      )}
    </>
  );
};

export default ProfilePage;
