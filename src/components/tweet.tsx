import { styled } from "styled-components";
import { ITweet } from "./time-line";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import TweetEdit from "./tweet-edit";

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
    align-self: center;
    padding-left: 10px;
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
  padding-right: 20px;
  font-size: 18px;
`;
const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button`
  padding: 5px;
  border: none;
  color: #fff;
  background-color: #000;
  cursor: pointer;
  svg {
    fill: #fff;
    width: 20px;
    height: 20px;
  }
`;
const EditButton = styled.button`
  padding: 5px;
  border: none;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  background-color: #000;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export default function Tweet({
  username,
  photo,
  tweet,
  userId,
  id,
  editAt,
}: ITweet) {
  const [editup, setEditup] = useState(false);
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
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
  const onEdit = () => {
    setEditup(!editup);
  };
  return (
    <Wrapper>
      <Column>
        <Usrname>
          {username} {editAt ? " | 수정된 트윗" : null}
        </Usrname>
        {editup ? (
          <TweetEdit
            tweet={tweet}
            userId={userId}
            id={id}
            setEditup={setEditup}
          />
        ) : (
          <Payload>{tweet}</Payload>
        )}
        <BtnWrap>
          {user?.uid === userId ? (
            <DeleteButton onClick={onDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
              </svg>
            </DeleteButton>
          ) : null}
          {user?.uid === userId ? (
            <EditButton onClick={onEdit}>
              {editup ? (
                // 캔슬
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="cancel"
                >
                  {/* !Font Awesome Free 6.5.1 by @fontawesome -
                  https://fontawesome.com License -
                  https://fontawesome.com/license/free Copyright 2024 Fonticons,
                  Inc. */}
                  <path
                    fill="#ff0000"
                    d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                  />
                </svg>
              ) : (
                //수정
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  {/* !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                  <path
                    fill="#ffffff"
                    d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                  />
                </svg>
              )}
            </EditButton>
          ) : null}
        </BtnWrap>
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
