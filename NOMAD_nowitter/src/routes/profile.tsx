import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { styled } from "styled-components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/time-line";
import Tweet from "../components/tweet";
import { tweetList } from "../components/tweet-edit";
import EditNickname from "../components/edit-nickname";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;
const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;
const NameBtn = styled.button``;
const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function Profile({ username, id }: ITweet) {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL); // user의 아바타가 maybe null
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [editTweet, setEdittweet] = useState<tweetList[]>([]);
  const [changename, setChangename] = useState(false);
  const onAvatarChnage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`); // 유저가 아바타이미지를 바꿀 때 마다 교체 된다 이전 파일이 저장 되지 않는다는 뜻
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref); // 유저의 아바타 이미지를 얻어서 url을 만들어주는 것.
      setAvatar(avatarUrl); //input에 state가 할당되어 있기 때문에 이 위치에 set을 넣어준다
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };
  useEffect(() => {
    const fetchTweets = async () => {
      const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      const snapshot = await getDocs(tweetQuery);
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
          username: username || null,
          photo,
          editAt: editAt || null,
          id: doc.id,
          userAvatar: userAvatar || null,
        };
      });
      setTweets(tweets);
      setEdittweet(editTweet);
    };
    fetchTweets();
  }, [editTweet, user?.uid]);
  const onchnageName = () => {
    setChangename(!changename);
  };
  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar ?? ""} />
        ) : (
          <svg
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"></path>
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChnage}
        id="avatar"
        type="file"
        accept="image/*"
      />
      {changename ? (
        <EditNickname
          username={username}
          id={id}
          setChangename={setChangename}
        />
      ) : (
        <Name>{user?.displayName ?? "Anonymous"}</Name>
      )}
      {/* 삼항연산자 shortcut 한것. user?.displayName ? user?.displayName : "Anonymous" */}
      <NameBtn onClick={onchnageName}>{changename ? "취소" : "수정"}</NameBtn>
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
