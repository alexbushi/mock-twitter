import { useParams } from "react-router-dom";
import { useGetFollowerFollowing } from "../services/users";
import UserCard from "./UserCard";

const UserList = () => {
  const { username } = useParams();
  const { users } = useGetFollowerFollowing(username || "");
  return (
    <>
      {users.map((user) => (
        <UserCard key={user.uid} user={user} />
      ))}
    </>
  );
};

export default UserList;
