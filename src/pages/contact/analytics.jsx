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
import APIManager from "../../utils/APIManager";
import LocalStorageManager from "../../utils/LocalStorageManager";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

const Analytics = ({ contact }) => {
  const { name, phone, email, photo } = contact;

  const [analytics, setAnalytics] = useState(null);
  const [monthlyInteraction, setMonthlyInteraction] = useState({
    totalInteractions: 0,
    initiatedByMe: 0,
    initiatedByContact: 0,
    interactionTypes: {
      phone: 0,
      inPerson: 0,
      messages: 0,
    },
    interactionSentiments: {
      positive: 0,
      neutral: 0,
      negative: 0,
      other: 0,
    },
    interactionPurposes: {
      personal: 0,
      business: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  async function fetchMonthlyInteractions() {
    var authToken = LocalStorageManager.getItem("authToken");

    setLoading(true);
    await APIManager.getMonthlyInteractions(contact.id, null, authToken).then(
      (result) => {
        console.log(result);
        if (result.data.monthlyInteraction)
          setMonthlyInteraction(result.data.monthlyInteraction);
      }
    );
    setLoading(false);
  }
  useEffect(() => {
    console.log(`UseEffect:[monthlyInteraction]`, monthlyInteraction);
    if (!analytics) fetchMonthlyInteractions();

    const sentiment = Object.keys(monthlyInteraction.interactionSentiments).map(
      (sentiment) => {
        return {
          label: readable[sentiment],
          numb: monthlyInteraction.interactionSentiments[sentiment],
          percent:
            (monthlyInteraction.interactionSentiments[sentiment] /
              monthlyInteraction.totalInteractions || 0) * 100,
        };
      }
    );

    const purpose = Object.keys(monthlyInteraction.interactionPurposes).map(
      (sentiment) => {
        return {
          label: readable[sentiment],
          numb: monthlyInteraction.interactionPurposes[sentiment],
          percent:
            (monthlyInteraction.interactionPurposes[sentiment] /
              monthlyInteraction.totalInteractions || 0) * 100,
        };
      }
    );

    const type = Object.keys(monthlyInteraction.interactionTypes).map(
      (sentiment) => {
        return {
          label: readable[sentiment],
          numb: monthlyInteraction.interactionTypes[sentiment],
          percent:
            (monthlyInteraction.interactionTypes[sentiment] /
              monthlyInteraction.totalInteractions || 0) * 100,
        };
      }
    );
    console.log(type);

    var data = { type, purpose, sentiment };

    setAnalytics(data);
  }, [monthlyInteraction]);

  return (
    <Content
      style={{
        // width: "95%",
        // margin: "auto",
        position: "relative",
        //   backgroundColor: "red",
        //   margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        overflow: "auto",
        //   marginBottom: "3%",
        scrollbarWidth: "none",
        zIndex: 9,
        opacity: loading ? 0.3 : 1,
      }}
    >
      {loading && (
        <Spin
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "100vh",
            width: "100%",
            // top: "50%",
            top: 0,
            left: 0,
            height: "100%",
            // backgroundColor: "green",
            // left: 0,
            // top: 0,
          }}
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      )}
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
          stat={monthlyInteraction.totalInteractions}
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
          stat={monthlyInteraction.initiatedByContact}
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
          stat={monthlyInteraction.initiatedByMe}
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

      {analytics && <BarChartWithTabs data={analytics} />}
    </Content>
  );
};

export default Analytics;

const styles = {
  container: {
    // height: "100%",
    // backgroundColor: "yellow",
  },
};
