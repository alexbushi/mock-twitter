import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { BiExport } from "react-icons/bi";
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

const Tweet = () => {
  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      gap={1}
      borderBottom="1px"
      borderColor="gray.100"
      _hover={{ bg: "gray.100", transition: "background-color 0.4s ease" }}
    >
      <GridItem colSpan={1} justifySelf="center" pt={2}>
        <Avatar />
      </GridItem>
      <GridItem colSpan={6} p={2}>
        <HStack>
          <Box fontWeight="semibold" as="h5" lineHeight="tight" noOfLines={1}>
            President Biden
          </Box>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
          >
            @POTUS · 2h
          </Box>
          <Spacer />
          <Button variant="ghost" pb={2}>
            ...
          </Button>
        </HStack>
        <Box pr={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Box>
        <HStack align="center">
          <ButtonGroup size="md" variant="ghost" alignItems="center">
            <IconButton icon={<FaRegComment />} aria-label="Image 1" mr={-2} />
            <Text fontSize="14px" mr={3}>
              120
            </Text>
            <IconButton icon={<FaRetweet />} aria-label="Image 1" mr={-2} />
            <Text fontSize="14px" mr={3}>
              120
            </Text>
            <IconButton icon={<FaRegHeart />} aria-label="Image 1" mr={-2} />
            <Text fontSize="14px" mr={3}>
              120
            </Text>
            <IconButton icon={<IoIosStats />} aria-label="Image 1" mr={-2} />
            <Text fontSize="14px" mr={5}>
              120
            </Text>
            <IconButton icon={<BiExport />} aria-label="Image 1" />
          </ButtonGroup>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default Tweet;
