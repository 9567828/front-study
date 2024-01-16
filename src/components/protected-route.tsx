// 로그인한 사용자는 protected-route 화면을 보게 되고, 로그인 하지 않으면 로그인 or 계정생성 페이지로 넘어간다.

import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children, // 첫 번째 = props
}: {
  children: React.ReactNode; // 모든 chilren이 React.ReactNode 라고 전달할 것이다.
}) {
  const user = auth.currentUser; // Firebase에서 유저의 로그인 여부를 확인해 준다.
  console.log(user);
  if (user === null) {
    /**
     * !user 보다 안정적
     * 사용자가 로그인을 했는 지 한했는지 먼저 확인하는 if문
     * 로그인을 안 했으면 로그인 페이지로 넘긴다.
     * 아니면 children 페이지로 넘어간다.
     */
    return <Navigate to="/login" />;
  }
  return children;
}
