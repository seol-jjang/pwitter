import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, dbService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        getUserName(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const getUserName = async (user) => {
    dbService
      .collection("users")
      .doc(`${user.uid}`)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        setUserName(data.name);
      });
  };
  return (
    <>
      {init ? (
        <AppRouter
          userObj={userObj}
          userName={userName}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        "initializing.."
      )}
    </>
  );
}

export default App;
