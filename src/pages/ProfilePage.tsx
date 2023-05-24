import {
  Box,
  Button,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { logout } from "../services/authentication";
import { Tweet, useGetTweetsByUsername } from "../services/tweets";
import TweetCard from "../components/TweetCard";
import { Link, useParams } from "react-router-dom";
import {
  addFollowerFollowing,
  useGetUserDataByUsername,
} from "../services/users";

const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, tweets } = useGetTweetsByUsername(username);
  const { userData } = useGetUserDataByUsername(username || "");

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
          <HStack>
            <Link to={`/${username}/following`}>
              <Text mr={3} _hover={{ textDecoration: "underline" }}>
                {" "}
                <span style={{ fontWeight: "bold" }}>
                  {userData?.following?.length}{" "}
                </span>
                Following
              </Text>
            </Link>
            <Link to={`/${username}/followers`}>
              <Text _hover={{ textDecoration: "underline" }}>
                <span style={{ fontWeight: "bold" }}>
                  {userData?.followers?.length}{" "}
                </span>
                Followers
              </Text>
            </Link>
          </HStack>
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
