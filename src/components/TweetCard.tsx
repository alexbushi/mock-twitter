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
import { Tweet } from "../services/addTweet";

const TweetCard = ({ content, username }: Tweet) => {
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
            {username}
          </Box>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
          >
            @{username} · 2h
          </Box>
          <Spacer />
          <Button variant="ghost" pb={2}>
            ...
          </Button>
        </HStack>
        <Box pr={3}>{content}</Box>
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

export default TweetCard;
