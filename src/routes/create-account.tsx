import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";

export default function CreatAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // 내용이 있으면 비워주기 위해서
    if (isLoading || name === "" || email === "" || password === "") return;
    // isLoading 또는 나머지 블라블라 = true면 함수를 종료한다.
    try {
      // 1. create an account
      // 2. set the name of the user
      // 3. redirect to the home page
      setLoading(true); // submit을 실행할 때 true로 실행한다.
      const credentials = await createUserWithEmailAndPassword(
        // createUserWithEmailAndPassword 인증(자격증명=credentials)이 성공하면 계정이 생성되고 실패되면 오류 메시지로 넘어간다.
        auth,
        email,
        password
      );
      console.log(credentials.user); // 유저정보를 얻는다.
      await updateProfile(credentials.user, {
        //사용자의 프로필을 업데이트 한다.
        displayName: name,
      });
      navigate("/");
      /**
       * 1. 계정을 만든다 (성공)
       * 2. 사용자의 프로필을 업데이트 한다 (성공)
       * 3. 홈페이지로 보낸다. "/"
       */
    } catch (e) {
      //setError
      // 이미 계정이 있거나, 비밀번호가 유효하지 않을 경우 Firebase에서 비밀번호가 안전한지 유효성 검사를 해준다.
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
    console.log(name, email, password);
  };
  return (
    <Wrapper>
      <Title>Join 🎉</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={name}
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <Input
          onChange={onChange}
          value={email}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <Input
          onChange={onChange}
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Alreay have an account? <Link to="/login">Login &rarr;</Link>
      </Switcher>
      <GithubButton />
      <GoogleButton />
    </Wrapper>
  );
}
