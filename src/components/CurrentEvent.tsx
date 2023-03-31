import { Box, HStack, Spacer } from "@chakra-ui/react";

interface Props {
  category: string;
  subject: string;
  num_of_tweets: string;
}

const CurrentEvent = ({ category, subject, num_of_tweets }: Props) => {
  return (
    <Box _hover={{ bg: "gray.200" }} p={3}>
      <HStack>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          {category} Trending
        </Box>
        <Spacer />
        <Box>...</Box>
      </HStack>

      <Box
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        noOfLines={1}
        mb={1}
      >
        {subject}
      </Box>

      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
      >
        {num_of_tweets} Tweets
      </Box>
    </Box>
  );
};

export default CurrentEvent;
