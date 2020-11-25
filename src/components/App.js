import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, dbService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoUrl: user.photoURL,
          updateProfile: (args) => user.updateProfile(args)
        });
        getUserName(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoUrl: user.photoURL,
      updateProfile: (args) => user.updateProfile(args)
    });
  };
  const getUserName = (user) => {
    dbService
      .collection("users")
      .doc(`${user.uid}`)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (user.displayName === null) {
          user.updateProfile({
            displayName: data.name
          });
        }
      });
  };
  return (
    <>
      {init ? (
        <AppRouter
          userObj={userObj}
          isLoggedIn={isLoggedIn}
          refreshUser={refreshUser}
        />
      ) : (
        "initializing.."
      )}
    </>
  );
}

export default App;
