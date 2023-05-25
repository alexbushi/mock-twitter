import { useParams } from "react-router-dom";
import UserList from "./UserList";
import { useGetFollowers } from "../services/users";
import { Spinner } from "@chakra-ui/react";

const FollowerList = () => {
  const { username } = useParams();
  const { isLoading, users } = useGetFollowers(username || "");

  if (isLoading) return <Spinner />;

  return <UserList users={users} />;
};

export default FollowerList;
