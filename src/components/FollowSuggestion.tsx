import { Avatar, Box, HStack, Spacer } from "@chakra-ui/react";

interface Props {
  name: string;
  handle: string;
}

const FollowSuggestion = ({ name, handle }: Props) => {
  return (
    <Box _hover={{ bg: "gray.200" }} p={3}>
      <HStack>
        <Avatar />

        <Box>
          <Box
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            mb={1}
          >
            {name}
          </Box>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            @{handle}
          </Box>
        </Box>

        <Spacer />

        <Box
          as="button"
          bg="black"
          borderRadius="full"
          w="90px"
          h="40px"
          textColor="white"
          fontWeight="bold"
        >
          Follow
        </Box>
      </HStack>
    </Box>
  );
};

export default FollowSuggestion;
