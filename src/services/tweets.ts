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
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./authentication";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useGetUserData } from "./users";

export interface Tweet {
  id?: string;
  user_id: string;
  username: string;
  name: string;
  content: string;
  created_at: { seconds: number; nanoseconds: number };
  likes: string[];
}

const TWEETS_REF = collection(db, "tweets") as CollectionReference<Tweet>;

export const addTweet = async (content: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const { name, username } = querySnapshot.docs[0]?.data();

      await addDoc(TWEETS_REF, {
        user_id: user.uid,
        username: username,
        name: name,
        content,
        created_at: serverTimestamp(),
        likes: [],
      });
    }
  }
};

export const addLike = async (tweetId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return;

  const tweetRef = doc(TWEETS_REF, tweetId);
  await updateDoc(tweetRef, { likes: arrayUnion(user.uid) });
};

export const useGetTweetsByIds = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { userData } = useGetUserData();

  useEffect(() => {
    if (userData?.following && userData?.following.length > 0) {
      setIsLoading(true);

      const unsubscribe = onSnapshot(
        query(
          TWEETS_REF,
          where("user_id", "in", userData.following),
          orderBy("created_at", "desc")
        ),
        (querySnapshot: QuerySnapshot<Tweet>) => {
          const tweetsList: Tweet[] = [];

          querySnapshot.forEach((tweet) => {
            const tweetData = tweet.data();
            const tweetObj = { ...tweetData, id: tweet.id };
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

export const useGetTweetsByUsername = (username: string = "") => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = onSnapshot(
      query(
        TWEETS_REF,
        where("username", "==", username),
        orderBy("created_at", "desc")
      ),
      (querySnapshot: QuerySnapshot<Tweet>) => {
        const tweetsList: Tweet[] = [];

        querySnapshot.forEach((tweet) => {
          const tweetData = tweet.data();
          const tweetObj = { ...tweetData, id: tweet.id };
          tweetsList.push(tweetObj);
        });

        setTweets(tweetsList);
        setIsLoading(false);
      }
    );

    // Unsubscribe from the real-time listener when the component unmounts
    return () => unsubscribe();
  }, [username]);

  return { isLoading, tweets };
};
export { useGetUserData };
