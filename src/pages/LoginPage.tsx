import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user, loading, navigate]);

  if (loading) return <Spinner />;

  return (
    <Box maxW="md" mx="auto" mt="8">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          logInWithEmailAndPassword(email, password);
        }}
      >
        <Stack spacing="4">
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button colorScheme="twitter" type="submit">
            Login
          </Button>
          <Text align="center">OR</Text>
          <Button
            colorScheme="gray"
            type="submit"
            onClick={() => signInWithGoogle()}
          >
            Login with Google
          </Button>

          <Link to="/registration">
            <Button colorScheme="gray" type="submit" width="100%">
              Create an account
            </Button>
          </Link>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
