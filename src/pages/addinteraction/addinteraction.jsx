import React, { useState, useEffect, useRef } from "react";
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
  Input,
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
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectContact from "../contact/selectcontact";

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
        width: "95%",
        gap: "1em",
        margin: "auto",
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
  const [readable, setReadable] = useState({
    positive: "Positive",
    negative: "Negative",
    neutral: "Neutral",
    phone: "Phone",
    inPerson: "In Person",
    message: "Message",
    personal: "Personal",
    business: "Not Personal",
    other: "other",
    initiatedByMe: "I contacted them",
    initiatedByContact: "They contacted me",
  });
  var typeOptions = ["phone", "inPerson", "message", "other"];
  var purposeOptions = ["personal", "business"];
  var sentimentOptions = ["positive", "neutral", "negative"];
  var whoOptions = ["initiatedByMe", "initiatedByContact"];
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("phone");
  const [purpose, setPurpose] = useState("personal");
  const [sentiment, setSentiment] = useState("positive");
  const [who, setWho] = useState("initiatedByMe");
  const [diary, setDiary] = useState("");
  const saveButton = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    var contactId = searchParams.get(`contactId`);
    var contactName = searchParams.get(`contactName`) || "No Name";
    var contactPhone = searchParams.get("contactPhone") || "No Phone";
    if (contactId) {
      setContact({ id: contactId, phone: contactPhone, name: contactName });
      setReadable({
        positive: "Positive",
        negative: "Negative",
        neutral: "Neutral",
        phone: "Phone",
        inPerson: "In Person",
        message: "Message",
        personal: "Personal",
        business: "Not Personal",
        other: "other",
        initiatedByMe: "I contacted " + (contactName || "them"),
        initiatedByContact: (contactName || "They") + " contacted me",
      });
    }
  }, []);

  useEffect(() => {
    if (contact)
      setReadable({
        positive: "Positive",
        negative: "Negative",
        neutral: "Neutral",
        phone: "Phone",
        inPerson: "In Person",
        message: "Message",
        personal: "Personal",
        business: "Not Personal",
        other: "other",
        initiatedByMe: "I contacted " + (contact.name || "them"),
        initiatedByContact: (contact.name || "They") + " contacted me",
      });
  }, [contact]);

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
              if (contact) navigate("/contact?contactId=" + contact.id);
              else navigate("/contact");
            }}
          />
          <Text style={{ ...styles.titleText, alignSelf: "center" }}>
            Add an Interaction
          </Text>
        </div>
      </Affix>

      <div
        style={{
          width: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Button
          ref={saveButton}
          disabled={contact === null}
          type="primary"
          shape="round"
          size={"large"}
          icon={<CheckCircleOutlined />}
          loading={loading}
          style={{
            position: "fixed",
            bottom: "3%",
            width: "95%",
            height: 40,
            zIndex: 2,
            marginLeft: "2.5%",
          }}
          onClick={async () => {
            setLoading(true);
            var authToken = LocalStorageManager.getItem("authToken");
            var apiDiary = diary === "" ? null : diary;
            var interaction = await APIManager.addInteraction(
              contact,
              contact.id || null,
              {
                initiatedBy: who === "initiatedByMe" ? "me" : "contact",
                type: {
                  channel: type,
                  direction: who === "initiatedByMe" ? "outgoing" : "incoming",
                },
                purpose: purpose,
                sentiment: sentiment,
              },
              apiDiary,
              authToken
            );
            console.log(interaction);
            setLoading(false);
            navigate("/contact?contactId=" + contact.id);

            // props.setInteractionMode(false);
          }}
        >
          Save Interaction
        </Button>

        {/* <div
          style={{
            fontSize: "16px",
            width: "93%",
            backgroundColor: "white",
            padding: "5px",
            marginLeft: "auto",
            borderRadius: 5,
            marginRight: "auto",
            display: "flex",
            flexDirection: "row",
            marginBottom: "2%",
            marginTop: "2%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontSize: "1em", fontWeight: "bold" }}>
              {contact?.name || "No Name"}
            </Text>
            <Text>{contact?.phone || "No Phone"}</Text>
          </div>
          <Button
            ref={saveButton}
            type="primary"
            shape="round"
            size={"large"}
            // icon={<CheckCircleOutlined />}
            loading={loading}
            style={{
              // position: "fixed",
              bottom: "3%",
              // width: "95%",
              zIndex: 2,
              // marginLeft: "2.5%",
            }}
          >
            {contact === null ? "Add Contact" : "Change Contact"}
          </Button>
        </div> */}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "2%",
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: "1.2em",
              fontWeight: "bolder",
            }}
          >
            Select a Contact
          </Text>
          <Button type={"link"}>Select from Phone Contacts</Button>
        </div>

        <SelectContact
          getContact={setContact}
          buttonTitle="Select from Interacted Contacts"
          style={{ width: "95%", margin: "auto", marginBottom: "2%" }}
        />

        <Text
          style={{
            fontSize: "1.2em",
            fontWeight: "bolder",
            marginBottom: "2%",
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
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
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
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
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
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
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text
            style={{
              fontSize: "1.2em",
              fontWeight: "bolder",
              marginTop: "4%",
              marginBottom: "2%",
            }}
          >
            Personal Diary Entry
          </Text>
          <div style={{}}>{diary.length} / 500</div>
        </div>

        <Input.TextArea
          maxLength={500}
          style={{
            // paddingTop: "5%",
            height: "300px",
            fontSize: "16px",
            marginBottom: 80,
            resize: "none",
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            // whiteSpace: "wrap",
            // backgroundColor: "red",
            // whiteSpace: "nowrap",
          }}
          value={diary}
          onChange={(e) => {
            setDiary(e.target.value);
          }}
        ></Input.TextArea>
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
