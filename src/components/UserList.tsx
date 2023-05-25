import { Alert, AlertIcon } from "@chakra-ui/react";
import { User } from "../services/users";
import UserCard from "./UserCard";

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  if (users.length === 0)
    return (
      <Alert status="warning">
        <AlertIcon />
        No users to show
      </Alert>
    );

  return (
    <>
      {users.map((user) => (
        <UserCard key={user.uid} user={user} />
      ))}
    </>
  );
};

export default UserList;
