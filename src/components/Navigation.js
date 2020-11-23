import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to="/" replace>
          Home
        </Link>
      </li>
      <li>
        <Link to="/profile" replace>
          Profile
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
