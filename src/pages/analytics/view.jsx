import React, { useState, useEffect } from "react";
import { Button, Tabs, Layout, Typography, Divider, Affix } from "antd";
import Analytics from "./analytics";
import InteractionsPaginated from "./interactionspaginated";
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectContact from "./selectcontact";

const { Text } = Typography;

const ContactPage = (props) => {
  // const { name, phone, email, photo } = contact;
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [yearMonth, setYearMonth] = useState(null);
  function sendMessagetoReactNative(message) {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
  }
  useEffect(() => {
    if (searchParams.get("contactId")) {
      setContact({
        phone: searchParams.get(`contactPhone`),
        name: searchParams.get(`contactName`),
        id: searchParams.get(`contactId`),
      });
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#f3f3f3" }}>
      <Affix offsetTop={0}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            backgroundColor: "white",
            height: 60,
            justifyContent: "end",
          }}
        >
          <Text
            style={{
              ...styles.titleText,
              display: "flex",
              position: "absolute",
              alignSelf: "center",
              justifyContent: "center",
              width: "100%",
              textAlign: "center",
            }}
          >
            Analytics
          </Text>
          <Button
            type="link"
            size={"large"}
            style={{
              alignSelf: "center",
              padding: 0,
              fontSize: "clamp(14px, 2vw, 24px)",
              right: "2.5%",
              zIndex: 3,
            }}
            onClick={() => {
              sendMessagetoReactNative({
                phone: searchParams.get(`contactPhone`),
                name: searchParams.get(`contactName`),
                id: searchParams.get(`contactId`),
                method: "add-interaction",
              });
              // if (contact)
              //   navigate(
              //     `/addinteraction?contactId=${contact.id}&contactName=${contact.name}&contactPhone=${contact.phone}`
              //   );
              // else navigate(`/addinteraction`);
            }}
          >
            Add Interaction
          </Button>
        </div>
      </Affix>

      <div style={styles.container}>
        <div
          style={{
            position: "relative",
            width: "95%",
            margin: "auto",
          }}
        >
          <Analytics
            contactName={searchParams.get(`contactName`)}
            contact={contact}
            setYearMonth={setYearMonth}
          />
          <Divider />
          <InteractionsPaginated contact={contact} yearMonth={yearMonth} />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

const styles = {
  container: {
    height: "100%",
    backgroundColor: "#f3f3f3",
    position: "relative",
    zIndex: 1,
    // paddingBottom: "15%",
    // height: "fit",
    // width: "95%",
    // margin: "auto",
    // paddingLeft: "2.5%",
    // paddingRight: "2.5%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
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
    alignSelf: "center",
    // marginRight: "12px",
  },

  titleText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    lineHeight: 1,
  },
  subtitleText: {
    fontSize: "12px",
    color: "#666",
    lineHeight: 1,
  },
};
