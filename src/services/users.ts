import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  collection,
  collectionGroup,
  doc,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./authentication";

export interface User {
  uid: string;
  name: string;
  username: string;
  authProvider: string;
  email: string;
  followers: string[];
  following: string[];
}

interface UserQueryOptions {
  field: string;
  value: string;
}

const useGetUserData = (queryOptions: UserQueryOptions) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>({} as User);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, "users"),
          where(queryOptions.field, "in", [queryOptions.value])
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0]?.data() as User);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getUserData();
  }, [queryOptions.field, queryOptions.value]);

  return { isLoading, userData };
};

export const useGetUserDataByUsername = (username: string) => {
  return useGetUserData({ field: "username", value: username });
};

export const useGetUserDataByUid = () => {
  const [user] = useAuthState(auth);
  return useGetUserData({ field: "uid", value: user?.uid || "" });
};

export const useSearchUserDataByUsername = (username: string) => {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    setUserData([]);
    const getUserDataByUsername = async () => {
      if (username) {
        try {
          const q = query(
            collection(db, "users"),
            orderBy("username"),
            startAt(username),
            endAt(username + "\uf8ff")
          );

          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            setUserData((prevUserData) => [
              ...prevUserData,
              doc.data() as User,
            ]);
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    getUserDataByUsername();
  }, [username]);

  return { userData };
};

export const addFollowerFollowing = async (
  newFollowingUsername: string = ""
) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return;

  const usersRef = collection(db, "users");
  const newFollowingQuery = query(usersRef, where("uid", "==", user.uid));
  const newFollowingSnapshot = await getDocs(newFollowingQuery);

  if (newFollowingSnapshot.empty) return;

  const newFollowerQuery = query(
    usersRef,
    where("username", "==", newFollowingUsername)
  );
  const newFollowerSnapshot = await getDocs(newFollowerQuery);

  if (newFollowerSnapshot.empty) return;

  const userRef = doc(usersRef, newFollowingSnapshot.docs[0].id);
  await updateDoc(userRef, {
    following: arrayUnion(newFollowerSnapshot.docs[0].data().uid),
  });

  const newFollowerRef = doc(usersRef, newFollowerSnapshot.docs[0].id);
  await updateDoc(newFollowerRef, { followers: arrayUnion(user.uid) });
};

export const useGetFollowingFollower = (
  username: string,
  type: "following" | "followers"
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userData } = useGetUserDataByUsername(username);

  useEffect(() => {
    const fetchData = async () => {
      if (username && userData && userData[type] && userData[type].length > 0) {
        setIsLoading(true);
        try {
          const q = query(
            collectionGroup(db, "users"),
            where("uid", "in", userData[type])
          );

          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            setUsers((prevUsers) => [...prevUsers, doc.data() as User]);
          });
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username, userData, type]);

  console.log(users);
  return { isLoading, users };
};

export const useGetFollowing = (username: string) => {
  return useGetFollowingFollower(username, "following");
};

export const useGetFollowers = (username: string) => {
  return useGetFollowingFollower(username, "followers");
};
