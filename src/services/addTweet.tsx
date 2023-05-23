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
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export interface Tweet {
  id?: string;
  user_id: string;
  username: string;
  name: string;
  content: string;
  created_at: { seconds: number; nanoseconds: number };
  likes: string[];
}

interface User {
  uid: string;
  name: string;
  username: string;
  authProvider: string;
  email: string;
  followers: string[];
  following: string[];
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
