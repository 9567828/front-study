import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

interface tweetList {
  id: string;
  photo?: string; // 포토는 requierd가 아니다.
  tweet: string;
  userId: string;
  setEditup: any;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Textarea = styled.textarea`
  width: 100%;
  margin-top: 10px;
  padding: 20px;
  border: 2px solid white;
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #000;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const BtnWrap = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const AttachFileButton = styled.label`
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 5px;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  svg {
    width: 20px;
    height: 20px;
    fill: #fff;
  }
`;
const AttachFileInput = styled.input`
  display: none;
`;
const DeleteImg = styled.button``;
const SubmitBtn = styled.button`
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 5px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  svg {
    width: 20px;
    height: 20px;
    fill: #fff;
  }
`;

export default function TweetEdit({ tweet, id, photo, setEditup }: tweetList) {
  const [Isloading, setIsloading] = useState(false);
  const [editTweet, setEdittweet] = useState("");
  const [editFile, setEditfile] = useState<File | null>(null);
  const user = auth.currentUser;
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEdittweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // const filesize = (e.target.files as FileList)[0].size;
    const maxsize = 5 * 1024 * 1024;

    if (files && files.length === 1) {
      if (files[0].size > maxsize) {
        alert("파일의 최대 용량은 5MB 입니다");
        setEditfile(null);
        return;
      }
      setEditfile(files[0]);
    }
  };
  const onDeletIMG = async () => {
    console.log("click");
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || Isloading || editTweet === "" || editTweet.length > 180)
      return;
    try {
      setIsloading(true);
      const editDoc = doc(db, "tweets", id);
      await updateDoc(editDoc, {
        tweet: editTweet,
        editAt: Date.now(),
      });
      if (editFile) {
        // 기존 이미지 삭제 없으면 아무일 없음
        if (photo) {
          const originalRef = ref(storage, `tweets/${user.uid}/${id}`);
          await deleteObject(originalRef);
        }
        const locationRef = ref(storage, `tweets/${user.uid}/${id}`);
        const result = await uploadBytes(locationRef, editFile);
        const url = await getDownloadURL(result.ref);

        await updateDoc(editDoc, {
          photo: url,
        });
      }
      setEdittweet("");
      setEditfile(null);
      setEditup(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    setEdittweet(tweet);
  }, [tweet]);
  return (
    <Form onSubmit={onSubmit}>
      <Textarea
        onChange={onChange}
        value={editTweet}
        rows={5}
        maxLength={180}
        placeholder="What is happening?"
        required
      />
      <BtnWrap>
        <AttachFileButton htmlFor="editFile">
          {editFile ? (
            "Photo added✅"
          ) : (
            <div>
              <p>이미지수정</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z" />
              </svg>
            </div>
          )}
        </AttachFileButton>
        <AttachFileInput
          onChange={onFileChange}
          id="editFile"
          type="file"
          accept="image/*"
        />
        <DeleteImg onClick={onDeletIMG}>이미지지우기</DeleteImg>
        <SubmitBtn>
          {Isloading ? (
            // 로딩
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
            </svg>
          ) : (
            <div>
              <p>완료</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3c0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256h57.7c12.3 0 22.3-10 22.3-22.3c0-6.2-2.6-12.1-7.1-16.3L269.8 117.5c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5L135.1 217.4z" />
              </svg>
            </div>
          )}
        </SubmitBtn>
      </BtnWrap>
    </Form>
  );
}
