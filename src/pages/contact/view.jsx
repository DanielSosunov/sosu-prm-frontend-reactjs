import React from "react";
import { Button, Tabs, Layout, Avatar, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text } = Typography;

const ContactPage = ({ contact, onBack }) => {
  const { name, phone, email, photo, location } = contact;

  return (
    <Layout style={styles.container}>
      <Header style={styles.header}>
        <ArrowLeftOutlined style={styles.icon} />
        <div style={styles.contentContainer}>
          <Avatar src={photo} size={40} style={styles.photo} />
          <div style={styles.textContainer}>
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.subtitleText}>{phone}</Text>
          </div>
        </div>
        <div style={{ width: "24px" }} />
      </Header>
      <Content style={styles.content}></Content>
    </Layout>
  );
};

export default ContactPage;

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "yellow",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },
  icon: {
    fontSize: "20px",
    color: "#333",
    cursor: "pointer",
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    marginRight: "12px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  titleText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  subtitleText: {
    fontSize: "14px",
    color: "#666",
  },
};
