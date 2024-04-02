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
import AddInteraction from "./addinteraction";

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

const ContactPage = ({ contact, onBack }) => {
  const { name, phone, email, photo, location } = contact;

  const [interactionMode, setInteractionMode] = useState(true);

  var interaction = {
    totalInteractions: 10,
    initiatedByMe: 4,
    initiatedByContact: 6,
    interactionTypes: {
      phone: 5,
      inPerson: 3,
      messages: 2,
    },
    interactionSentiments: {
      positive: 6,
      neutral: 3,
      negative: 1,
    },
    interactionPurposes: {
      personal: 7,
      business: 3,
    },
    resolvedIssues: 2,
    pendingFollowUps: 1,
    averageResponseTime: 2.5,
    longestInteractionDuration: 120,
    shortestInteractionDuration: 5,
  };

  const sentiment = Object.keys(interaction.interactionSentiments).map(
    (sentiment) => {
      return {
        label: readable[sentiment],
        numb: interaction.interactionSentiments[sentiment],
        percent:
          (interaction.interactionSentiments[sentiment] /
            interaction.totalInteractions) *
          100,
      };
    }
  );

  const purpose = Object.keys(interaction.interactionPurposes).map(
    (sentiment) => {
      return {
        label: readable[sentiment],
        numb: interaction.interactionPurposes[sentiment],
        percent:
          (interaction.interactionPurposes[sentiment] /
            interaction.totalInteractions) *
          100,
      };
    }
  );

  const type = Object.keys(interaction.interactionTypes).map((sentiment) => {
    return {
      label: readable[sentiment],
      numb: interaction.interactionTypes[sentiment],
      percent:
        (interaction.interactionTypes[sentiment] /
          interaction.totalInteractions) *
        100,
    };
  });

  var data = { type, purpose, sentiment };

  return interactionMode ? (
    <AddInteraction contact={contact} setInteractionMode={setInteractionMode} />
  ) : (
    <Layout style={styles.container}>
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

      <Content
        style={{
          width: "95%",
          //   backgroundColor: "red",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          overflow: "auto",
          marginBottom: "3%",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // gap: "1em",
            marginTop: "1em",
            backgroundColor: "#ededed",
            padding: "3%",
            borderRadius: "2%",
          }}
        >
          <StatsCard
            stat={interaction.totalInteractions}
            text={"Interactions with " + name}
            cardColor={"#FDDCFF"}
            icon={
              <MdEmojiPeople
                size={"2em"}
                color={"#E957F3"}
                style={{ marginBottom: "1em" }}
              />
            }
          />

          <Divider
            type="vertical"
            style={{
              height: "100%",
            }}
          />
          <StatsCard
            style={{
              marginRight: "1%",
            }}
            stat={interaction.initiatedByContact}
            text={"They contacted you"}
            cardColor={"#ECE4FF"}
            icon={
              <MdFavorite
                size={"2em"}
                color={"#A279F8"}
                style={{ marginBottom: "1em" }}
              />
            }
          />
          {/* <div style={{ width: "5%" }} /> */}

          <StatsCard
            stat={interaction.initiatedByMe}
            text={"You contacted them"}
            cardColor={"#D9E7F7"}
            icon={
              <PiHandsClappingBold
                size={"2em"}
                color={"#4688DB"}
                style={{ marginBottom: "1em" }}
              />
            }
          />
        </div>

        <BarChartWithTabs data={data} />

        <Button
          type="primary"
          shape="round"
          size={"large"}
          icon={<PlusCircleOutlined />}
          style={{
            position: "absolute",
            bottom: "3%",
            width: "95%",
            // margin: "auto",
          }}
          onClick={() => {
            setInteractionMode(true);
          }}
        >
          Add Interaction
        </Button>
      </Content>
    </Layout>
  );
};

export default ContactPage;

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
