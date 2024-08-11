import React, { useState, useEffect, useRef } from "react";
import { Button, Layout, Typography, Affix, Input } from "antd";
import { ArrowLeftOutlined, CheckCircleOutlined } from "@ant-design/icons";
import APIManager from "../../utils/APIManager";
import LocalStorageManager from "../../utils/LocalStorageManager";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./addinteraction.css";
import { pullQueryParamsFromUrl } from "../../utils/utility";
const { Text } = Typography;

const ButtonRow = (props) => {
  const handleClick = (value) => {
    props.setCurrent(value);
  };

  useEffect(() => {
    console.log(props.current);
  }, [props.current]);

  return (
    <div className="buttonRow">
      {props.options.map((option) => (
        <Button
          className="buttonRowButton"
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

const AddInteraction = () => {
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

  const typeOptions = ["phone", "inPerson", "message", "other"];
  const purposeOptions = ["personal", "business"];
  const sentimentOptions = ["positive", "neutral", "negative"];
  const whoOptions = ["initiatedByMe", "initiatedByContact"];

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("phone");
  const [purpose, setPurpose] = useState("personal");
  const [sentiment, setSentiment] = useState("positive");
  const [who, setWho] = useState("initiatedByMe");
  const [diary, setDiary] = useState("");
  const saveButton = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function sendMessagetoReactNative(message) {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(message);
    }
  }

  const handleSave = async () => {
    setLoading(true);
    const authToken = LocalStorageManager.getItem("authToken");
    const apiDiary = diary === "" ? null : diary;
    const interaction = await APIManager.addInteraction(
      contact,
      contact.id || null,
      {
        initiatedBy: whoOptions === "initiatedByMe" ? "user" : "contact",
        direction: whoOptions === "initiatedByMe" ? "outgoing" : "incoming",
        type,
        purpose,
        sentiment,
      },
      apiDiary,
      authToken
    );
    console.log(interaction);
    setLoading(false);
    navigate("/analytics?" + pullQueryParamsFromUrl(window.location.href));
  };

  useEffect(() => {
    setContact({
      phone: searchParams.get(`contactPhone`),
      name: searchParams.get(`contactName`),
      id: searchParams.get(`contactId`),
    });
  }, []);

  return (
    <div className="container">
      <Affix offsetTop={0}>
        <div className="header">
          {searchParams.get("back") && (
            <ArrowLeftOutlined
              className="backIcon"
              onClick={() => {
                sendMessagetoReactNative("exit");
              }}
            />
          )}
          <Text className="titleText">Add an Interaction</Text>
        </div>
      </Affix>

      {contact && (
        <div className="contentContainer">
          <Button
            ref={saveButton}
            disabled={!contact.id}
            type="primary"
            shape="round"
            size="large"
            icon={<CheckCircleOutlined />}
            loading={loading}
            className="saveButton"
            onClick={handleSave}
          >
            Save Interaction
          </Button>

          <Text style={{ marginTop: 0 }} className="sectionTitle">
            Contact
          </Text>

          <div className="contactContainer">
            <div className="contactAvatar">
              {contact.name
                .split(" ")
                .map((e) => e[0].toUpperCase())
                .join("")}
            </div>
            <div className="contactDetails">
              <div>{contact.name}</div>
              <div>{contact.phone}</div>
            </div>
          </div>

          <Text className="sectionTitle">Who Contacted Who</Text>
          <ButtonRow
            readable={readable}
            options={whoOptions}
            current={who}
            setCurrent={setWho}
          />

          <Text className="sectionTitle">How did you guys interact?</Text>
          <ButtonRow
            readable={readable}
            options={typeOptions}
            current={type}
            setCurrent={setType}
          />

          <Text className="sectionTitle">What was the purpose?</Text>
          <ButtonRow
            readable={readable}
            options={purposeOptions}
            current={purpose}
            setCurrent={setPurpose}
          />

          <Text className="sectionTitle">How did you feel?</Text>
          <ButtonRow
            readable={readable}
            options={sentimentOptions}
            current={sentiment}
            setCurrent={setSentiment}
          />
          <div className="diaryEntryContainer">
            <Text className="diaryTitle">Personal Diary Entry</Text>
            <div>{diary.length} / 500</div>
          </div>

          <Input.TextArea
            maxLength={500}
            style={{
              height: 300,
              fontSize: 16,
              marginBottom: 80,
              resize: "none",
              width: "95%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="diaryTextArea"
            value={diary}
            onChange={(e) => {
              setDiary(e.target.value);
            }}
          ></Input.TextArea>
        </div>
      )}
    </div>
  );
};

export default AddInteraction;
