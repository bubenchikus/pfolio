import React from "react";
import PropTypes from "prop-types";
import axios from "../axios";
import { LogoBar } from "../components/LogoBar/LogoBar";

async function loginUser(username, password) {
  return axios({
    method: "POST",
    url: "login",
    headers: {},
    data: { username: username, password: password },
  }).then((data) => data.data);
}

export const Login = ({ setToken }) => {
  const [username, setUserName] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser(username, password);
    setToken(token);
  };

  return (
    <div className="centralWrapper">
      <form onSubmit={handleSubmit} className="formBlock">
        <LogoBar />
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
