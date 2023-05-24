import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  collection,
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

export const useGetUserData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>({} as User);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const q = query(
            collection(db, "users"),
            where("uid", "in", [user.uid])
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            setUserData(querySnapshot.docs[0]?.data() as User);
          }
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
      }
    };

    getUserData();
  }, [user]);

  return { isLoading, userData };
};

export const useGetUserDataByUsername = (username: string) => {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    setUserData([]);
    const getUserDataByUsername = async () => {
      if (username) {
        console.log(username);

        try {
          const q = query(
            collection(db, "users"),
            orderBy("username"),
            startAt(username),
            endAt(username + "\uf8ff")
          );

          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            console.log("match", doc.data());
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
