import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Button = styled.span`
  width: 100%;
  margin-top: 15px;
  padding: 10px 20px;
  border: 0;
  border-radius: 50px;
  background-color: #fff;
  color: #000;
  font-weight: 500;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GoogleButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provieder = new GoogleAuthProvider();
      await signInWithPopup(auth, provieder);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/Google__G__logo.svg" />
      Continue wih Github
    </Button>
  );
}
