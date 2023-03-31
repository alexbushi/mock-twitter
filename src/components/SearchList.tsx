import { Box, Heading } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import CurrentEvent from "./CurrentEvent";
import currentEvents from "../data/currentEvents";
import profiles from "../data/profiles";
import FollowSuggestion from "./FollowSuggestion";

const SearchList = () => {
  return (
    <>
      <SearchInput onSearch={() => {}} />
      <Box bg={"gray.100"} marginTop={5} borderRadius={8}>
        <Heading fontSize={"xl"} p={5}>
          What's happening
        </Heading>
        {currentEvents.map((currentEvent) => (
          <CurrentEvent
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
        {profiles.map((profile) => (
          <FollowSuggestion name={profile.name} handle={profile.handle} />
        ))}
      </Box>
    </>
  );
};

export default SearchList;
