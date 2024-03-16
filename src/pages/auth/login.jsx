import React, { useEffect, useState } from "react";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Button, Space } from "antd";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(username, password);
  }, [username, password]);

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

        <Button type="primary">Login</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
};

export default LoginForm;

const styles = {
  mainContainer: {
    height: "100vh",
    // width: "100vh",
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
