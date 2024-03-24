import React, { useEffect, useState } from "react";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Button, Space } from "antd";
import APIManager from "../../utils/APIManager";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  useEffect(() => {
    console.log(username, password);
  }, [username, password]);

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      await APIManager.login({ username, password });
      // Handle successful login
    } catch (error) {
      // Handle login error
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async () => {
    setSignupLoading(true);
    try {
      await APIManager.signup({ username, password });
      // Handle successful signup
    } catch (error) {
      // Handle signup error
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.contentContainer}>
        <Input
          placeholder="Enter your username"
          prefix={<UserOutlined />}
          size={"large"}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input.Password
          placeholder="Enter your password"
          prefix={<LockOutlined />}
          size={"large"}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button onClick={handleLogin} type="primary" loading={loginLoading}>
          Login
        </Button>
        <Button onClick={handleSignup} loading={signupLoading}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;

const styles = {
  mainContainer: {
    height: "100vh",
    backgroundColor: "yellow",
  },
  contentContainer: {
    justifyContent: "center",
    height: "100%",
    width: "90%",
    margin: "auto",
    gap: "1em",
    display: "flex",
    flexDirection: "column",
  },
};
