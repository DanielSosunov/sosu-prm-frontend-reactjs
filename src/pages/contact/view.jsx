import React from "react";
import { Button, Tabs, Layout, Avatar } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const ContactPage = ({ contact, onBack }) => {
  const { name, phone, email, photo, location } = contact;

  return (
    <Layout style={styles.container}>
      <Header style={styles.header}>
        <Button style={styles.backButton} onClick={onBack}>
          <ArrowLeftOutlined />
        </Button>
      </Header>
      <Content style={styles.content}>
        <div style={styles.contactCard}>
          <Avatar size={120} src={photo} style={{ alignSelf: "center" }} />
          <h2 style={styles.name}>{name}</h2>
          <p style={styles.location}>{location}</p>
          <Tabs defaultActiveKey="details" centered>
            <TabPane tab="Details" key="details">
              <p style={styles.info}>
                <span role="img" aria-label="phone">
                  &#128241;
                </span>{" "}
                {phone}
              </p>
              <p style={styles.info}>
                <span role="img" aria-label="email">
                  &#128231;
                </span>{" "}
                {email}
              </p>
            </TabPane>
            <TabPane tab="Call Log" key="callLog">
              <p>Call log content goes here.</p>
            </TabPane>
          </Tabs>
        </div>
      </Content>
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
    backgroundColor: "red",
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
  backButton: {
    border: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
    // padding: "10px",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // padding: "20px",
    backgroundColor: "green",
  },
  contactCard: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  name: {
    marginTop: "10px",
    marginBottom: "5px",
  },
  location: {
    marginBottom: "20px",
    color: "#888",
    // backgroundColor: "blue",
  },
  info: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
  },
};
