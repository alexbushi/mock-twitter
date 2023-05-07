import { useState } from "react";
import { sendPasswordReset } from "../firebase";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Stack spacing="4">
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="twitter"
          type="submit"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPasswordPage;
