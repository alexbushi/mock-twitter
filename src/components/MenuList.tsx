import { Button, List, ListItem } from "@chakra-ui/react";
import { FaHome, FaHashtag } from "react-icons/fa";
import { BsPerson, BsTwitter } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { CgMoreO } from "react-icons/cg";
import { ReactElement } from "react";

const MenuList = () => {
  const iconMap: { [key: string]: ReactElement } = {
    "": <BsTwitter size={28} color="#4299E1" />,
    Home: <FaHome size={30} />,
    Explore: <FaHashtag size={22} />,
    Notifications: <GrNotification size={22} />,
    Messages: <HiOutlineMail size={25} />,
    Bookmarks: <BiBookmark size={23} />,
    Profile: <BsPerson size={30} />,
    More: <CgMoreO size={22} />,
  };

  return (
    <List>
      {Object.keys(iconMap).map((key) => (
        <ListItem key={key}>
          <Button
            leftIcon={iconMap[key]}
            variant="ghost"
            size="lg"
            borderRadius="25px"
          >
            {key}
          </Button>
        </ListItem>
      ))}
      <Button
        ml={3}
        mt={3}
        w="200px"
        h="50px"
        colorScheme="twitter"
        borderRadius="20px"
        fontSize={"lg"}
      >
        Tweet
      </Button>
    </List>
  );
};

export default MenuList;
