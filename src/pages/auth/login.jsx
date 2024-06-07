import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import APIManager from "../../utils/APIManager";
import LocalStorageManager from "../../utils/LocalStorageManager";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(username, password);
  }, [username, password]);

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      const response = await APIManager.login({ username, password });
      if (response.success === true) {
        LocalStorageManager.setItem("authToken", response.data.token);
        navigate("/analytics");
      } else {
        setErrorMessage(response.message);
        setErrorModalVisible(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred during login.");
      setErrorModalVisible(true);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async () => {
    setSignupLoading(true);
    try {
      const response = await APIManager.signup({ username, password });
      if (response.success === true) {
        LocalStorageManager.setItem("authToken", response.data.token);
        navigate("/analytics");
      } else {
        setErrorMessage(response.message);
        setErrorModalVisible(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred during signup.");
      setErrorModalVisible(true);
    } finally {
      setSignupLoading(false);
    }
  };

  const handleErrorModalClose = () => {
    setErrorModalVisible(false);
    setErrorMessage("");
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

      <Modal
        open={errorModalVisible}
        onCancel={handleErrorModalClose}
        footer={[
          <Button key="okay" type="primary" onClick={handleErrorModalClose}>
            Okay
          </Button>,
        ]}
        centered
        width="80%"
      >
        <p>{errorMessage}</p>
      </Modal>
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
