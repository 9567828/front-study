import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Textarea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: #fff;
  background-color: #000;
  width: 100%;
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
const AttachFileButton = styled.label`
  padding: 10px 0;
  color: #1d9bf0;
  border: 1px solid #1d9bf0;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitBtn = styled.input`
  padding: 10px 0;
  background-color: #1d9bf0;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setIsloading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null); //타입스크립트 구문이다
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFilechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const filesize = (e.target.files as FileList)[0].size;
    const maxsize = 3 * 1024 * 1024; //1mb = 1024 * 1024

    if (filesize > maxsize) {
      alert("파일의 최대 용량은 3MB입니다.");
      setFile(null);
      return;
    }
    if (files && files.length === 1) {
      // 파일을 1개만 받겠다
      setFile(files[0]); // 파일의 첫 번째 자식을 file의 값으로 저장
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setIsloading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`); // 이미지 파일이 들어갈 경로를 만들어 준것. 슬래쉬로 구분해 준 것이다
        const result = await uploadBytes(locationRef, file); //이미지를 어디에 저장하고 싶은지 알려주고(locationRef), file을 넣어준다.
        const url = await getDownloadURL(result.ref); // 업로드하고 나서 url을 얻고싶다. result의 퍼블릭 url을 반환해준다. getdownloadURL은 string으로 반환해준다.
        await updateDoc(doc, {
          // 위에 지정한 const doc에 업로드한 이미지의 url을 저장해준다(업데이트해준다).
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Textarea
        onChange={onChange}
        value={tweet}
        rows={5}
        maxLength={180}
        placeholder="What is happening?"
        required
      />
      <AttachFileButton htmlFor="file">
        {file ? "Photo added ✅" : "Add photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFilechange}
        id="file"
        type="file"
        accept="image/*"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}
