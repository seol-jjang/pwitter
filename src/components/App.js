import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import styled, { ThemeProvider } from "styled-components";
import AppRouter from "components/Router";
import GlobalStyles from "styles/GlobalStyles";
import { theme, SectionColumn } from "styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

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
      <ThemeProvider theme={{ theme }}>
        <GlobalStyles />
        {init ? (
          <SectionColumn>
            <Logo as="a" href="/">
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                color={theme.skyblue}
              />
            </Logo>
            <AppRouter
              userObj={userObj}
              isLoggedIn={isLoggedIn}
              refreshUser={refreshUser}
            />
          </SectionColumn>
        ) : (
          ""
        )}
      </ThemeProvider>
    </>
  );
}

const Logo = styled.span`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

export default App;
