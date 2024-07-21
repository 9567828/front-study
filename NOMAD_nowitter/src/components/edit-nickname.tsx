import { styled } from "styled-components";
import { auth } from "../firebase";
import React, { useState } from "react";
import { updateProfile } from "firebase/auth";

export interface updateList {
  id: string;
  username: string | null;
  setChangename: any;
}

const Form = styled.form``;
const Changename = styled.button``;
const Nickname = styled.input``;

export default function EditNickname({ setChangename }: updateList) {
  const user = auth.currentUser;
  const [isloading, setIsloading] = useState(false);
  const [editName, setEditname] = useState(user?.displayName);
  const onChangeNmae = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditname(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || isloading || editName === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    try {
      setIsloading(true);
      await updateProfile(user, {
        displayName: editName || null,
      });
      setEditname(editName);
      setChangename(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Nickname
        onChange={onChangeNmae}
        type="text"
        value={editName ?? ""}
        maxLength={10}
      />
      <Changename>{isloading ? "로딩.." : "변경"}</Changename>
    </Form>
  );
}
