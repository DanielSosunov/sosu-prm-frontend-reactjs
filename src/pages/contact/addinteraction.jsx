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
import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { MdEmojiPeople, MdFavorite } from "react-icons/md";
import { PiHandsClappingBold } from "react-icons/pi";
// import "a ntd/dist/antd.css";
import StatsCard from "../../utils/StatsCard";
import BarChartWithTabs from "../../utils/BarChart";

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
};
const ButtonRow = (props) => {
  const handleClick = (value) => {
    props.setCurrent(props.options.indexOf(value));
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
          type={props.options[props.current] === option ? "primary" : "default"}
          onClick={() => handleClick(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

const AddInteraction = (props) => {
  var typeOptions = ["Phone", "In Person", "Message", "Other"];
  var purposeOptions = ["Personal", "Not Personal"];
  var sentimentOptions = ["Positive", "Neutral", "Negative"];
  var whoOptions = [
    "I contacted " + props.contact.name,
    props.contact.name + " contacted me",
  ];

  const [type, setType] = useState(0);
  const [purpose, setPurpose] = useState(0);
  const [sentiment, setSentiment] = useState(0);
  const [who, setWho] = useState(0);

  return (
    <div
      style={{
        width: "95%",
        margin: "auto",
        // backgroundColor: "lightblue",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        // gap: "1em",
      }}
    >
      <Text
        style={{
          fontSize: "1.2em",
          fontWeight: "bolder",
          marginBottom: "2%",
        }}
      >
        Who Contacted Who
      </Text>
      <ButtonRow options={whoOptions} current={who} setCurrent={setWho} />

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
      <ButtonRow options={typeOptions} current={type} setCurrent={setType} />

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
        options={sentimentOptions}
        current={sentiment}
        setCurrent={setSentiment}
      />
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
