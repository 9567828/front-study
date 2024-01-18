import { styled } from "styled-components";
import { ITweet } from "./time-line";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;
const Column = styled.div`
  display: grid;
  align-content: space-between;
  &:last-child {
    place-self: end;
  }
`;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;
const Usrname = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;
const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button`
  width: 80px;
  padding: 5px 10px;
  border: 0;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: #fff;
  background-color: tomato;
  cursor: pointer;
`;
const EditButton = styled.button`
  width: 80px;
  padding: 5px 10px;
  border: 0;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: #fff;
  background-color: green;
  cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want o delete his tweete?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };
  return (
    <Wrapper>
      <Column>
        <Usrname>{username}</Usrname>
        <Payload>{tweet}</Payload>
        <BtnWrap>
          {user?.uid === userId ? (
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          ) : (
            "null"
          )}
          <EditButton>edit</EditButton>
        </BtnWrap>
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
