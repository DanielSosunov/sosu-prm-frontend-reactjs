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

const InteractionsPaginated = ({ contact }) => {
  const { name, phone, email, photo, id } = contact;

  const [listOfInteractions, setListOfInteractions] = useState([]);
  const [loading, setLoading] = useState(false);

  function generateRenderedListOfItems(interactions) {
    var list = [];
    for (var interaction of interactions) {
    }
  }

  async function fetchPaginatedInteractions() {
    var startAfter = LocalStorageManager.getItem("paginatedPointer");
    var authToken = LocalStorageManager.getItem("authToken");

    setLoading(true);
    await APIManager.getPaginatedInteractions(
      contact.id,
      startAfter,
      authToken
    ).then((result) => {
      console.log(result);
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
      <div></div>
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
