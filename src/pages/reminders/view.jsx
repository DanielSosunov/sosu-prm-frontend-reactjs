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
import SelectContact from "../analytics/selectcontact";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

const Reminders = (props) => {
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
            zIndex: 11,
          }}
        >
          <Text style={{ ...styles.titleText, alignSelf: "center" }}>
            Stay In Touch
          </Text>
        </div>
      </Affix>
    </div>
  );
};

export default Reminders;

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
