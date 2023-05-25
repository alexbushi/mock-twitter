import { useParams } from "react-router-dom";
import UserList from "./UserList";
import { useGetFollowing } from "../services/users";
import { Spinner } from "@chakra-ui/react";

const FollowingList = () => {
  const { username } = useParams();
  const { isLoading, users } = useGetFollowing(username || "");

  if (isLoading) return <Spinner />;

  return <UserList users={users} />;
};

export default FollowingList;
