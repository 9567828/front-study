import {
  collection,
  limit,
  // doc,
  // getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
`;

// 트윗 데이터의 형식을 TS로 정의한다.
export interface ITweet {
  id: string;
  photo?: string; // 포토는 requierd가 아니다.
  tweet: string;
  userId: string;
  username: string | null;
  createdAt: number;
  editAt: number;
  userAvatar?: string;
}

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      /*     const snapshot = await getDocs(tweetsQuery);
      const tweets = snapshot.docs.map((doc) => {
        const { tweet, createdAt, userId, username, photo } = doc.data();
        return {
          tweet,
          createdAt,
          userId,
          username,
          photo,
          id: doc.id,
        };
      }); */
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            editAt,
            userAvatar,
          } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
            editAt: editAt || null,
            userAvatar: userAvatar || null,
          };
        });
        setTweet(tweets);
      });
      //트윗을 저장하기 위해서 foreach 대신 map을 사용한다. map은 map내의 함수에서 반환한 항목으로 배열을 만들어준다.
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
