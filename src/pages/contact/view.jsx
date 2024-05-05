import React, { useState, useEffect } from "react";
import {
  Button,
  Tabs,
  Layout,
  Avatar,
  Typography,
  Card,
  Flex,
  Segmented,
  Divider,
  Affix,
  Radio,
  Spin,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { MdEmojiPeople, MdFavorite } from "react-icons/md";
import { PiHandsClappingBold } from "react-icons/pi";
// import "a ntd/dist/antd.css";
import StatsCard from "../../utils/StatsCard";
import BarChartWithTabs from "../../utils/BarChart";
import AddInteraction from "./addinteraction";
import Analytics from "./analytics";
import APIManager from "../../utils/APIManager";
import LocalStorageManager from "../../utils/LocalStorageManager";
import InteractionsPaginated from "./interactionspaginated";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

const readable = {
  positive: "Positive",
  negative: "Negative",
  neutral: "Neutral",
  phone: "Phone",
  inPerson: "In Person",
  messages: "Messages",
  personal: "Personal",
  business: "Not Personal",
  other: "Other",
};

const ContactPage = ({ contact, onBack }) => {
  const { name, phone, email, photo } = contact;

  const [interactionMode, setInteractionMode] = useState(false);

  return interactionMode ? (
    <AddInteraction contact={contact} setInteractionMode={setInteractionMode} />
  ) : (
    <div>
      <Affix offsetTop={0}>
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            height: 60,
          }}
        >
          <ArrowLeftOutlined
            style={{
              position: "absolute",
              left: "3%",
              alignSelf: "center",
              //   backgroundColor: "green",
              fontSize: "16px",
            }}
          />

          <Avatar src={photo} size={40} style={styles.photo} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "1%",
              marginTop: "1%",
              marginBottom: "1%",
              justifyContent: "center",
            }}
          >
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.subtitleText}>{phone}</Text>
          </div>
        </div>
      </Affix>
      <div style={styles.container}>
        <div style={{ width: "95%", margin: "auto" }}>
          <Analytics contact={contact} />
          <Divider />
          <InteractionsPaginated contact={contact} />
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
  },
  subtitleText: {
    fontSize: "14px",
    color: "#666",
  },
};
