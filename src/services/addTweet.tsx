import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export interface Tweet {
  id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: { seconds: number; nanoseconds: number };
  likes_count: number;
}

const TWEETS_REF = collection(db, "tweets");

export const addTweet = async (content: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user !== null) {
    const userID = user.uid;
    const username = user.displayName;

    await addDoc(TWEETS_REF, {
      user_id: userID,
      username: username,
      content,
      created_at: serverTimestamp(),
      likes_count: 0,
    });
  }
};

export const useGetAllTweets = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const querySnapshot = await getDocs(TWEETS_REF);
      const tweetsList: Tweet[] = [];

      querySnapshot.forEach((tweet) => {
        // console.log(tweet.id, " => ", tweet.data());
        const { id } = tweet;
        const tweetData = tweet.data();
        const tweetObj = {
          id,
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
    };

    fetchData();
  }, []);

  return { isLoading, tweets };
};
