import { Box, Heading } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import CurrentEvent from "./CurrentEvent";
import currentEvents from "../data/currentEvents";
import profiles from "../data/profiles";
import FollowSuggestion from "./FollowSuggestion";
import { useGetUserDataByUsername } from "../services/addTweet";
import { useState } from "react";

const SearchList = () => {
  const [username, setUsername] = useState("");
  const { userData } = useGetUserDataByUsername(username);

  return (
    <>
      <SearchInput
        onSearch={(username) => {
          setUsername(username);
        }}
      />
      <Box bg={"gray.100"} marginTop={5} borderRadius={8}>
        <Heading fontSize={"xl"} p={5}>
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
      <Box bg={"gray.100"} marginTop={5} borderRadius={8}>
        <Heading fontSize={"xl"} p={5}>
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

export default SearchList;
