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
  Tag,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { IoMdHappy, IoMdSad } from "react-icons/io";

import {
  MdEmojiPeople,
  MdFavorite,
  MdOutlineSentimentNeutral,
} from "react-icons/md";
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
/**
 *
 */
const InteractionsPaginated = ({ contact }) => {
  const { name, phone, email, photo, id } = contact;

  const [listOfInteractions, setListOfInteractions] = useState([]);
  const [loading, setLoading] = useState(false);
  function generateRenderedListOfItems(interactions) {
    const colors = {
      blue: ["#CAF0F8", "#ADE8F4", "#90E0EF", "#48CAE4"], // Blue colors from light to medium-light
      green: ["#d0ffd0", "#b0ffb0", "#90ff90", "#60ff60"], // Green colors from light to medium-light
      red: ["#ffcccc", "#ffb3b3", "#ff9999", "#ff8080"], // Red colors from light to medium-light
    };
    var interactionTypeLanguage = {
      messages: "Message",
      inPerson: "In Person",
      other: "Interaction",
      phone: "Phone",
    };
    var purposeLanguage = {
      personal: "Personal",
      business: "Not Personal",
    };
    var initiatedByLanguage = {
      contact: "They reached out",
      me: "You reached out",
    };
    var sentimentLanguage = {
      negative: "Negative",
      positive: "Positive",
      neutral: "Neutral",
    };
    var list = [];
    for (var interaction of interactions) {
      list.push(
        <>
          <div
            style={{
              backgroundColor: "#ededed",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 10,
              borderRadius: "2%",
            }}
          >
            <div
              style={{
                padding: "3%",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                // flex: 5,
              }}
            >
              <Text
                style={{
                  fontSize: "1em",
                  fontWeight: "bold",
                }}
              >
                {interactionTypeLanguage[interaction.type.channel]}
              </Text>

              <Text>{initiatedByLanguage[interaction.initiatedBy]}</Text>

              <Text>{purposeLanguage[interaction.purpose]}</Text>
            </div>
            <div
              style={{
                padding: "3%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "right",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignSelf: "flex-end",
                }}
              >
                <Tag
                  color={
                    interaction.sentiment === "positive"
                      ? "#86DC3D"
                      : interaction.sentiment === "negative"
                      ? "#ff8080"
                      : "#48CAE4"
                  }
                >
                  {sentimentLanguage[interaction.sentiment]}
                </Tag>
              </div>
              <Tag>{new Date(interaction.timestamp).toDateString()}</Tag>
            </div>
          </div>
        </>
      );
    }
    var startAfter = LocalStorageManager.getItem("paginatedPointer");
    if (startAfter !== null && startAfter !== `null`)
      list.push(
        <Button
          type="primary"
          shape="round"
          size={"large"}
          loading={loading}
          // icon={<PlusCircleOutlined />}
          style={{
            height: "5%",
            margin: "auto",

            zIndex: 2,
            width: "60%",
            // margin: "auto",
          }}
          onClick={async () => {
            await fetchPaginatedInteractions();
          }}
        >
          Load More
        </Button>
      );
    return list;

    // console.log(listOfInteractions.length);
    // setListOfInteractions([...listOfInteractions, ...list]);
    // console.log(listOfInteractions.length);
  }

  async function fetchPaginatedInteractions() {
    var startAfter = LocalStorageManager.getItem("paginatedPointer");
    var authToken = LocalStorageManager.getItem("authToken");
    if (startAfter === null || startAfter === "null") startAfter = null;
    setLoading(true);
    await APIManager.getPaginatedInteractions(
      contact.id,
      startAfter,
      authToken
    ).then((result) => {
      console.log(result);
      var api_interactions = result.data.interactions;
      var api_lastVisible = result.data.lastVisible;
      LocalStorageManager.setItem("paginatedPointer", api_lastVisible || null);
      var list = generateRenderedListOfItems(api_interactions);

      setListOfInteractions((prevList) => {
        if (prevList) prevList.pop();
        return [...prevList, ...list];
      });
      // if (result.data.monthlyInteraction)
      //   setMonthlyInteraction(result.data.monthlyInteraction);
    });
    setLoading(false);
  }

  useEffect(() => {
    //Set paginated requests to null
    LocalStorageManager.setItem("paginatedPointer", null);
    fetchPaginatedInteractions();
  }, []);

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
        paddingBottom: "3%",
        scrollbarWidth: "none",
        zIndex: 9,
        opacity: loading ? 0.3 : 1,
      }}
    >
      <Text
        style={{
          fontSize: "1em",

          color: "black",
          alignSelf: "start",
        }}
      >
        All Interactions
      </Text>

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
      {listOfInteractions}
    </Content>
  );
};

export default InteractionsPaginated;

const styles = {
  container: {
    // height: "100%",
    // backgroundColor: "yellow",
  },
};
