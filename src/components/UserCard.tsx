import { Avatar, Box, HStack, Spacer } from "@chakra-ui/react";
import { User, addFollowerFollowing } from "../services/users";
import { Link } from "react-router-dom";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  return (
    <Box _hover={{ bg: "gray.200" }} p={3}>
      <HStack>
        <Avatar />

        <Box>
          <Link to={`/profile/${user.username}`}>
            <Box
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
              mb={1}
              _hover={{ textDecoration: "underline" }}
            >
              {user.name}
            </Box>
          </Link>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            @{user.username}
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
          onClick={() => addFollowerFollowing(user.username)}
        >
          Follow
        </Box>
      </HStack>
    </Box>
  );
};

export default UserCard;
