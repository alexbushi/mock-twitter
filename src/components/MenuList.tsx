import { Button, List, ListItem } from "@chakra-ui/react";
import { FaHome, FaHashtag } from "react-icons/fa";
import { BsPerson, BsTwitter } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const MenuList = () => {
  const iconMap: { [key: string]: ReactElement } = {
    Explore: <FaHashtag size={22} />,
    Notifications: <GrNotification size={22} />,
    Messages: <HiOutlineMail size={25} />,
    Bookmarks: <BiBookmark size={23} />,
  };

  const [user] = useAuthState(auth);

  return (
    <List>
      <Link to="/home">
        <ListItem>
          <Button
            leftIcon={<BsTwitter size={28} color="#4299E1" />}
            variant="ghost"
            size="lg"
            borderRadius="25px"
          ></Button>
        </ListItem>
      </Link>
      <Link to="/home">
        <ListItem>
          <Button
            leftIcon={<FaHome size={30} />}
            variant="ghost"
            size="lg"
            borderRadius="25px"
          >
            Home
          </Button>
        </ListItem>
      </Link>
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
      <Link to={`/profile/${user?.displayName}`}>
        <ListItem>
          <Button
            leftIcon={<BsPerson size={30} />}
            variant="ghost"
            size="lg"
            borderRadius="25px"
          >
            Profile
          </Button>
        </ListItem>
      </Link>
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
