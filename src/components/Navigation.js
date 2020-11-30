import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { theme } from "styles/Theme";

const Navigation = () => {
  return (
    <MemuList>
      <li>
        <Link to="/" replace>
          <FontAwesomeIcon
            icon={faHome}
            color={theme.skyblue}
            size="lg"
            aria-label="홈"
          />
        </Link>
      </li>
      <li>
        <Link to="/profile" replace>
          <FontAwesomeIcon
            icon={faUser}
            color={theme.skyblue}
            size="lg"
            aria-label="프로필"
          />
        </Link>
      </li>
    </MemuList>
  );
};

const MemuList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 10px;
  border-bottom: 1px solid #ddd;
  li {
    &:first-child {
      margin-right: 20px;
    }
  }
`;

export default Navigation;
