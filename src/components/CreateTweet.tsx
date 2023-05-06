import {
  Avatar,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Textarea,
  Spacer,
} from "@chakra-ui/react";
import {
  AiOutlinePicture,
  AiOutlineFileGif,
  AiOutlineCalendar,
} from "react-icons/ai";
import { BsListTask, BsEmojiSmile } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import { useState } from "react";

const CreateTweet = () => {
  const [value, setValue] = useState("");

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(7, 1fr)"
      gap={1}
      borderBottom="1px"
      borderColor="gray.100"
    >
      <GridItem rowSpan={2} colSpan={1} justifySelf="center" pt={2}>
        <Avatar />
      </GridItem>
      <GridItem colSpan={6} h="50px" p={2}>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What's happening?"
          variant="unstyled"
          resize="none"
        />
      </GridItem>
      <GridItem colSpan={6} pr={3}>
        <HStack>
          <ButtonGroup spacing={0} size="md" variant="ghost" color="#4299E1">
            <IconButton icon={<AiOutlinePicture />} aria-label="Image 1" />
            <IconButton icon={<AiOutlineFileGif />} aria-label="Image 1" />
            <IconButton icon={<BsListTask />} aria-label="Image 1" />
            <IconButton icon={<BsEmojiSmile />} aria-label="Image 1" />
            <IconButton icon={<AiOutlineCalendar />} aria-label="Image 1" />
            <IconButton icon={<BiMap />} aria-label="Image 1" />
          </ButtonGroup>
          <Spacer />
          <Button colorScheme="twitter" size="sm" borderRadius="full">
            Tweet
          </Button>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default CreateTweet;
