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
  const [contactsExpanded, setContactsExpanded] = useState(false);
  const [yearMonth, setYearMonth] = useState(moment().format("YYYY-MM"));
  const [analytics, setAnalytics] = useState(null);
  const [contactsInteracted, setContactsInteracted] = useState([]);
  const [contactSelected, setContactSelected] = useState("All Contacts");
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

  useEffect(() => {
    console.log(`UseEffect [yearMonth]`, yearMonth);

    var authToken = LocalStorageManager.getItem("authToken");

    APIManager.getContactsByUserId(authToken).then((result) => {
      if (result.data.contacts) {
        setContactsInteracted(result.data.contacts);
      }
    });

    fetchMonthlyInteractions();
  }, [yearMonth]);

  async function fetchMonthlyInteractions() {
    var authToken = LocalStorageManager.getItem("authToken");

    setLoading(true);
    await APIManager.getMonthlyInteractions(
      contact.id,
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
    setLoading(false);
  }
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

  function renderListOfContactsInteractedWith() {
    var list = [];
    list.push(
      <Button
        onClick={() => {
          setContactSelected("All Contacts");
        }}
        type={contactSelected === "All Contacts" ? "primary" : null}
        style={{
          margin: "auto",

          width: "95%",
          backgroundColor:
            contactSelected === "All Contacts" ? null : "#f3f3f3",
          borderRadius: 5,
          padding: 5,
        }}
      >
        All Contacts{" "}
        {contactSelected === "All Contacts" && (
          <CheckCircleOutlined color={"white"} />
        )}
      </Button>
    );

    var list2 = contactsInteracted.map((contact) => (
      <Button
        id={contact.id}
        onClick={(e) => {
          setContactSelected(contact.id);
        }}
        type={contactSelected === contact.id ? "primary" : null}
        style={{
          margin: "auto",

          width: "95%",
          backgroundColor: contactSelected === contact.id ? null : "#f3f3f3",
          borderRadius: 5,
          padding: 5,
        }}
      >
        {contact.name}{" "}
        {contactSelected === contact.id && (
          <CheckCircleOutlined color={"white"} />
        )}
      </Button>
    ));

    return (
      <div style={{ display: "flex", gap: 5, flexDirection: "column" }}>
        {[...list, ...list2]}
      </div>
    );
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
          marginTop: "1em",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: 5,
            position: "relative",
          }}
        >
          {contactsExpanded && (
            <div
              style={{
                backgroundColor: "white",
                maxHeight: "30vh",
                width: "100%",
                position: "absolute",
                top: 40,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 5,
                border: "1px solid #dedede",
                alignItems: "center",
              }}
            >
              <div>{renderListOfContactsInteractedWith()}</div>
              <Text style={{ color: "gray", fontSize: "0.8em" }}>
                Contacts you've interacted with will show up here.
              </Text>
            </div>
          )}
          <Text
            style={{
              fontSize: "1em",

              color: "black",
              alignSelf: "center",
            }}
          >
            Analytics for
          </Text>
          <Button
            onClick={() => {
              setContactsExpanded(!contactsExpanded);
            }}
            // icon={
            // }
          >
            {contactSelected === "All Contacts"
              ? "All Contacts"
              : contactsInteracted.find((e) => e.id === contactSelected).name}
            {!contactsExpanded ? <DownCircleOutlined /> : <UpCircleOutlined />}
          </Button>
        </div>

        <MonthYearPicker setYearMonth={setYearMonth} />
      </div>

      <div
        style={{
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
