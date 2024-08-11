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
  Radio,
  Spin,
  DatePicker,
} from "antd";
import Calendar from "react-calendar";

import {
  ArrowLeftOutlined,
  PlusCircleOutlined,
  LoadingOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { MdEmojiPeople, MdFavorite } from "react-icons/md";
import { PiHandsClappingBold } from "react-icons/pi";
// import "a ntd/dist/antd.css";
import moment from "moment";
import StatsCard from "../../utils/StatsCard";
import BarChartWithTabs from "../../utils/BarChart";
import AddInteraction from "../addinteraction/addinteraction";
import APIManager from "../../utils/APIManager";
import LocalStorageManager from "../../utils/LocalStorageManager";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MonthYearPicker from "./monthyearpicker";
import SelectContact from "./selectcontact";
import ContactFab from "./ContactFab";
import useIsInViewport from "../../utils/useIsInViewport";
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

const Analytics = (props) => {
  // const { name, phone, email, photo } = contact;
  //I commented this out and removed contact from prop. Now I have to edit the Monthly Analytics API call to be able to accept no contact so it can give monthly analytics for all
  const statsCardRef = useRef(null);
  const isStatsCardInView = useIsInViewport(statsCardRef);
  const [yearMonth, setYearMonth] = useState(moment().format("YYYY-MM"));
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
  const [contactsExpanded, setContactsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  //Happens every time a Calendar date is selected
  useEffect(() => {
    console.log(`UseEffect [yearMonth]`, yearMonth);

    if (yearMonth) props.setYearMonth(yearMonth);
    fetchMonthlyInteractions();
  }, [props.contact, yearMonth]);

  // useEffect(() => {
  //   console.log(`UseEffect [yearMonth]`, yearMonth);

  //   fetchMonthlyInteractions();
  // }, [yearMonth]);
  //Every time the Monthly Interaction data is set from the API call
  useEffect(() => {
    console.log(`UseEffect:[monthlyInteraction]`, monthlyInteraction);

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

  async function fetchMonthlyInteractions() {
    var authToken = LocalStorageManager.getItem("authToken");

    setLoading(true);

    if (yearMonth.toLowerCase() !== "all") {
      await APIManager.getMonthlyInteractions(
        props.contact?.id || null,

        yearMonth,
        authToken
      ).then((result) => {
        console.log(result);
        if (result.data.monthlyInteraction)
          setMonthlyInteraction(result.data.monthlyInteraction);
        else {
          setMonthlyInteraction({
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
        }
      });
    } else {
      await APIManager.getTotalInteractionsOfContact(
        props.contact?.id || null,

        authToken
      ).then((result) => {
        console.log(result);
        if (result.data.totalInteractions)
          setMonthlyInteraction(result.data.totalInteractions);
        else {
          setMonthlyInteraction({
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
        }
      });
    }

    setLoading(false);
  }

  return (
    <Content
      style={{
        // width: "95%",
        // margin: "auto",
        height: "100%",
        position: "relative",
        //   backgroundColor: "red",
        //   margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        overflow: "auto",
        //   marginBottom: "3%",
        scrollbarWidth: "none",
        // zIndex: 9,
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
          marginTop: "1em",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "fixed",
          width: "95%",
          margin: "auto",
          paddingTop: "10px",
          paddingBottom: "10px",
          zIndex: 999,
          opacity: isStatsCardInView ? 1.0 : 0.5,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* <div style={{ alignContent: "center" }}>Analytics for</div> */}
          <ContactFab contact={props.contact} setContact={props.setContact} />
        </div>

        <MonthYearPicker
          style={{ width: "30vw" }}
          setYearMonth={setYearMonth}
        />
      </div>

      <div
        ref={statsCardRef}
        style={{
          marginTop: "52px",
          display: "flex",
          flexDirection: "row",
          // gap: "1em",
          height: "100%",
          backgroundColor: "#ededed",
          padding: "3%",
          borderRadius: "2%",
        }}
      >
        <StatsCard
          stat={monthlyInteraction.totalInteractions}
          text={
            props.contact
              ? "Interactions with " + props.contact?.name
              : "All Interactions"
          }
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
          type={"vertical"}
          style={{
            alignSelf: "center",
            height: window.innerWidth * 0.1,
            // height: "100%",
            // zIndex: 1,
            // color: "black",
            // height: "100%",
            // width: "1px",
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
