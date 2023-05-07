import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

interface Tweet {
  id: string;
  user_id: string;
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

    await addDoc(TWEETS_REF, {
      user_id: userID,
      content,
      created_at: serverTimestamp(),
      likes_count: 0,
    });
  }
};

export const getAllTweets = async () => {
  let tweets: Tweet[] = [];
  const querySnapshot = await getDocs(TWEETS_REF);

  querySnapshot.forEach((tweet) => {
    // console.log(tweet.id, " => ", tweet.data());
    const { id } = tweet;
    const tweetData = tweet.data();
    // @ts-ignore
    tweets.push({ ...tweetData, id });
  });

  return tweets;
};
