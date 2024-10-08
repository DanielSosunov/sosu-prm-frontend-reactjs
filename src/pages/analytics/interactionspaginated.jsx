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
import AddInteraction from "../addinteraction/addinteraction";
import APIManager from "../../utils/APIManager";
import LocalStorageManager from "../../utils/LocalStorageManager";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PaginatedElement from "./paginatedelement";
import SingleInteraction from "./singleinteraction";
import { formatYYYYMMtoReadable } from "../../utils/utility";
const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

/**
 *
 */
const InteractionsPaginated = ({ contact, yearMonth }) => {
  const [listOfInteractions, setListOfInteractions] = useState([]);
  const [loading, setLoading] = useState(false);

  function generateRenderedListOfItems(interactions) {
    var list = [];
    for (var i = 0; i < interactions.length; i++) {
      var interaction = interactions[i];
      console.log(interaction);
      list.push(
        <SingleInteraction
          key={interaction.id}
          contact={interaction.contactName}
          time={interaction.timestamp}
          method={interaction.type}
          sentiment={interaction.sentiment}
          purpose={interaction.purpose}
          initiatedBy={interaction.direction === "outgoing" ? "Me" : "They"}
          diary={interaction.diary}
        />
      );
      // list.push(
      //   <PaginatedElement contact={contact} interaction={interaction} />
      // );
    }
    var startAfter = LocalStorageManager.getItem("paginatedPointer");
    if (startAfter !== null && startAfter !== `null`) {
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
            // alignSelf: "left",
            // border: "1px solid #000",
            // backgroundColor: "#ededed",
            // color: "black",
            zIndex: 2,
            width: "30%",
            // margin: "auto",
          }}
          onClick={async () => {
            await fetchPaginatedInteractions();
          }}
        >
          Load More
        </Button>
      );
    } else {
      list.push(
        <Button
          type="primary"
          shape="round"
          size={"large"}
          loading={loading}
          // icon={<PlusCircleOutlined />}
          style={{
            height: "100%",
            // margin: "auto",
            // alignSelf: "left",
            // color: "#EdEdEd",
            // color: "black",
            zIndex: 2,
            opacity: 0, //Hidden Load button
            width: "30%",
            // margin: "auto",
          }}
          disabled
          onClick={async () => {
            await fetchPaginatedInteractions();
          }}
        >
          Load More
        </Button>
      );
    }
    return list;

    // console.log(listOfInteractions.length);
    // setListOfInteractions([...listOfInteractions, ...list]);
    // console.log(listOfInteractions.length);
  }

  async function fetchPaginatedInteractions() {
    var startAfter = LocalStorageManager.getItem("paginatedPointer");
    var authToken = LocalStorageManager.getItem("authToken");
    if (startAfter === null || startAfter === "null") {
      startAfter = null;
    }
    setLoading(true);
    await APIManager.getPaginatedInteractions(
      contact?.id || null,
      startAfter,
      yearMonth || null,
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
    setListOfInteractions([]);
    // if (contact?.id) fetchPaginatedInteractions();
    fetchPaginatedInteractions();
  }, [contact, yearMonth]);

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
        paddingBottom: "4%",
        scrollbarWidth: "none",
        height: "100%",
        zIndex: 1,
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
        {yearMonth && yearMonth.toLowerCase() !== "all"
          ? formatYYYYMMtoReadable(yearMonth) + " All Interactions"
          : "All Interactions"}
        {contact && (
          <>
            {" "}
            <Text
              style={{
                fontSize: "1em",

                color: "black",
              }}
            >
              with
            </Text>{" "}
            <Text
              style={{
                fontSize: "1em",

                color: "black",
                fontWeight: "bold",
              }}
            >
              {contact.name}
            </Text>
          </>
        )}
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
      {listOfInteractions.length > 1 && listOfInteractions}
      {listOfInteractions.length <= 1 && !loading && (
        <div style={{ height: "100%", width: "100%", textAlign: "center" }}>
          <Text
            style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
          >
            No interactions found in this date range.
          </Text>
        </div>
      )}
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
