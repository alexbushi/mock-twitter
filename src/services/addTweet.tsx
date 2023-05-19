import {
  collection,
  addDoc,
  serverTimestamp,
  QuerySnapshot,
  onSnapshot,
  CollectionReference,
  orderBy,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export interface Tweet {
  id?: string;
  user_id: string;
  username: string;
  content: string;
  created_at: { seconds: number; nanoseconds: number };
  likes_count: number;
}

interface User {
  uid: string;
  name: string;
  authProvider: string;
  email: string;
  followers: string[];
  following: string[];
}

const TWEETS_REF = collection(db, "tweets") as CollectionReference<Tweet>;

export const addTweet = async (content: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user !== null) {
    const userID = user.uid;
    const username = user.displayName || "";

    await addDoc(TWEETS_REF, {
      user_id: userID,
      username: username,
      content,
      created_at: serverTimestamp(),
      likes_count: 0,
    });
  }
};

export const useGetUserData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>({} as User);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);

      if (user) {
        try {
          const q = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          );

          const querySnapshot = await getDocs(q);
          setUserData(querySnapshot.docs[0]?.data() as User);
        } catch (error) {
          console.log(error);
        }
      }
      setIsLoading(false);
    };

    getUserData();
  }, [user]);

  return { isLoading, userData };
};

export const useGetAllTweets = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { userData } = useGetUserData();

  useEffect(() => {
    setIsLoading(true);

    if (userData?.following && userData?.uid) {
      const unsubscribe = onSnapshot(
        query(
          TWEETS_REF,
          where("user_id", "in", [...userData.following, userData.uid]),
          orderBy("created_at", "desc")
        ),
        (querySnapshot: QuerySnapshot<Tweet>) => {
          const tweetsList: Tweet[] = [];

          querySnapshot.forEach((tweet) => {
            const tweetData = tweet.data();
            const tweetObj = {
              id: tweet.id,
              user_id: tweetData.user_id,
              username: tweetData.username,
              content: tweetData.content,
              created_at: tweetData.created_at,
              likes_count: tweetData.likes_count,
            };

            tweetsList.push(tweetObj);
          });

          setTweets(tweetsList);
          setIsLoading(false);
        }
      );

      // Unsubscribe from the real-time listener when the component unmounts
      return () => unsubscribe();
    }
  }, [userData]);

  return { isLoading, tweets };
};
