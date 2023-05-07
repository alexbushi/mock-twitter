import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProfilePage = () => {
  const [user] = useAuthState(auth);

  return (
    <Box maxW="md" mx="auto" mt="7">
      <Stack spacing={4}>
        <Heading fontSize={"xl"}>Profile</Heading>
        <Text>{user?.displayName}</Text>
        <Button size="sm" w="90px" onClick={() => logout()}>
          Logout
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
