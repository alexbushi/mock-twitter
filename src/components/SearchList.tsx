import { Box, Heading } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import CurrentEvent from "./CurrentEvent";
import currentEvents from "../data/currentEvents";
import profiles from "../data/profiles";
import FollowSuggestion from "./FollowSuggestion";
import { User, useGetUserDataByUsername } from "../services/addTweet";
import { useState } from "react";
import { Link } from "react-router-dom";

const SearchList = () => {
  const [username, setUsername] = useState("");
  const { userData } = useGetUserDataByUsername(username);

  const renderUserProfileCards = () => {
    console.log("userData is", userData);
    if (userData.length === 0) {
      return null;
    }

    return (
      <Box bg="white" borderRadius={8} boxShadow="lg" mt={2} p={4}>
        {userData.map((user) => (
          <UserProfileCard key={user.uid} user={user} />
        ))}
      </Box>
    );
  };

  return (
    <>
      <SearchInput
        onSearch={(username) => {
          setUsername(username);
        }}
      />
      {renderUserProfileCards()}
      <Box bg="gray.100" mt={5} borderRadius={8}>
        <Heading fontSize="xl" p={5}>
          What's happening
        </Heading>
        {currentEvents.map((currentEvent, index) => (
          <CurrentEvent
            key={index}
            category={currentEvent.category}
            subject={currentEvent.subject}
            num_of_tweets={currentEvent.num_of_tweets}
          />
        ))}
      </Box>
      <Box bg="gray.100" mt={5} borderRadius={8}>
        <Heading fontSize="xl" p={5}>
          Who to follow
        </Heading>
        {profiles.map((profile, index) => (
          <FollowSuggestion
            key={index}
            name={profile.name}
            handle={profile.handle}
          />
        ))}
      </Box>
    </>
  );
};

interface Props {
  user: User;
}

const UserProfileCard = ({ user }: Props) => {
  return (
    <Box p={2} borderRadius={8} bg="gray.200" mb={2}>
      <Link to={`/profile/${user.username}`}>
        <Heading fontSize="md" mb={1}>
          @{user.username}
        </Heading>
        <Heading fontSize={"sm"}>{user.name}</Heading>
      </Link>
    </Box>
  );
};

export default SearchList;
