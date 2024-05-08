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
} from "antd";

import {
  ArrowLeftOutlined,
  PlusCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { MdEmojiPeople, MdFavorite } from "react-icons/md";
import { PiHandsClappingBold } from "react-icons/pi";
// import "a ntd/dist/antd.css";
import StatsCard from "../../utils/StatsCard";
import BarChartWithTabs from "../../utils/BarChart";
import APIManager from "../../utils/APIManager";
import LocalStorageManager from "../../utils/LocalStorageManager";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

const ButtonRow = (props) => {
  const handleClick = (value) => {
    props.setCurrent(value);
  };

  useEffect(() => {
    console.log(props.current);
  }, [props.current]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around", // Distribute space evenly around items
        flexWrap: "nowrap", // Prevent wrapping
        maxWidth: "100%", // Container takes full width
        gap: "1em",
      }}
    >
      {props.options.map((option) => (
        <Button
          style={{
            flex: 1, // Each button will grow and shrink as needed
            textAlign: "center", // Center the text inside the button
            padding: "0 10px", // Add padding inside the button
          }}
          size="large"
          key={option}
          type={props.current === option ? "primary" : "default"}
          onClick={() => handleClick(option)}
        >
          {props.readable[option]}
        </Button>
      ))}
    </div>
  );
};

const AddInteraction = (props) => {
  const readable = {
    positive: "Positive",
    negative: "Negative",
    neutral: "Neutral",
    phone: "Phone",
    inPerson: "In Person",
    message: "Message",
    personal: "Personal",
    business: "Not Personal",
    other: "other",
    initiatedByMe: "I contacted " + props.contact.name,
    initiatedByContact: props.contact.name + " contacted me",
  };
  var typeOptions = ["phone", "inPerson", "message", "other"];
  var purposeOptions = ["personal", "business"];
  var sentimentOptions = ["positive", "neutral", "negative"];
  var whoOptions = ["initiatedByMe", "initiatedByContact"];

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("phone");
  const [purpose, setPurpose] = useState("personal");
  const [sentiment, setSentiment] = useState("positive");
  const [who, setWho] = useState("initiatedByMe");

  return (
    <div
      style={{
        // width: "95%",
        margin: "auto",
        backgroundColor: "#f5f5f5",
        height: "100vh",
        textAlign: "left",
        // display: "flex",
        // flexDirection: "column",
        // gap: "1em",
      }}
    >
      <Affix offsetTop={0}>
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            // marginTop: "1%",
            marginBottom: "1%",
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
            onClick={() => {
              props.setInteractionMode(false);
            }}
          />
          <Text style={{ ...styles.titleText, alignSelf: "center" }}>
            Interaction with {props.contact.name}
          </Text>

          {/* <Avatar src={props.contact.photo} size={40} style={styles.photo} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "1%",
              marginTop: "1%",
              marginBottom: "1%",
            }}
          >
            <Text style={styles.titleText}>{props.contact.name}</Text>
            <Text style={styles.subtitleText}>{props.contact.phone}</Text>
          </div> */}
        </div>
      </Affix>

      <div
        style={{
          width: "95%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          type="primary"
          shape="round"
          size={"large"}
          icon={<CheckCircleOutlined />}
          loading={loading}
          style={{
            position: "absolute",
            bottom: "3%",
            width: "95%",
            // margin: "auto",
          }}
          onClick={async () => {
            setLoading(true);
            var authToken = LocalStorageManager.getItem("authToken");
            var interaction = await APIManager.addInteraction(
              props.contact,
              props.contact.id || null,
              {
                initiatedBy: who === "initiatedByMe" ? "me" : "contact",
                type: {
                  channel: type,
                  direction: who === "initiatedByMe" ? "outgoing" : "incoming",
                },
                purpose: purpose,
                sentiment: sentiment,
              },
              authToken
            );
            console.log(interaction);
            setLoading(false);
            props.setInteractionMode(false);
          }}
        >
          Save Interaction
        </Button>
        <Text
          style={{
            fontSize: "1.2em",
            fontWeight: "bolder",
            marginBottom: "2%",
          }}
        >
          Who Contacted Who
        </Text>
        <ButtonRow
          readable={readable}
          options={whoOptions}
          current={who}
          setCurrent={setWho}
        />

        <Text
          style={{
            fontSize: "1.2em",
            fontWeight: "bolder",
            marginBottom: "2%",
            marginTop: "4%",
          }}
        >
          How did you guys interact?
        </Text>
        <ButtonRow
          readable={readable}
          options={typeOptions}
          current={type}
          setCurrent={setType}
        />

        <Text
          style={{
            fontSize: "1.2em",
            fontWeight: "bolder",
            marginBottom: "2%",
            marginTop: "4%",
          }}
        >
          What was the purpose?
        </Text>
        <ButtonRow
          readable={readable}
          options={purposeOptions}
          current={purpose}
          setCurrent={setPurpose}
        />

        <Text
          style={{
            fontSize: "1.2em",
            fontWeight: "bolder",
            marginTop: "4%",
            marginBottom: "2%",
          }}
        >
          How did you feel?
        </Text>
        <ButtonRow
          readable={readable}
          options={sentimentOptions}
          current={sentiment}
          setCurrent={setSentiment}
        />
      </div>
    </div>
  );
};

export default AddInteraction;

const styles = {
  container: {
    height: window.innerHeight,
    // backgroundColor: "yellow",
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
