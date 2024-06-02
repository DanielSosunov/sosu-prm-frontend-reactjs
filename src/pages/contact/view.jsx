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
import AddInteraction from "../addinteraction/addinteraction";
import Analytics from "./analytics";
import APIManager from "../../utils/APIManager";
import LocalStorageManager from "../../utils/LocalStorageManager";
import InteractionsPaginated from "./interactionspaginated";
import { useNavigate, useSearchParams } from "react-router-dom";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

const ContactPage = (props) => {
  // const { name, phone, email, photo } = contact;
  const [contact, setContact] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function getAndSetContact(contactId) {
    setLoading(true);
    var authToken = LocalStorageManager.getItem("authToken");

    var apiContact = await APIManager.getContactById(contactId, authToken);
    setContact(apiContact.data.contact);
    setLoading(false);
  }

  useEffect(() => {
    var contactId = searchParams.get(`contactId`);
    if (contactId) {
      getAndSetContact(contactId);
    }
  }, []);
  return contact == null ? (
    loading ? (
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
    ) : (
      <></>
    )
  ) : (
    <div>
      <Affix offsetTop={0}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginLeft: "3%",
              // justifyContent: "center",
              height: 60,
            }}
          >
            <ArrowLeftOutlined
              style={{
                // position: "absolute",
                marginRight: "3%",
                alignSelf: "center",
                //   backgroundColor: "green",
                fontSize: "16px",
              }}
            />

            {/* <Avatar
              src={contact.photo}
              size={40}
              style={{ ...styles.photo, marginRight: "2%" }}
            /> */}
            <div
              style={{
                // paddingLeft: "3%",
                // backgroundColor: "green",
                display: "flex",
                flexDirection: "column",
                marginLeft: "1%",
                marginTop: "1%",
                marginBottom: "1%",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Text style={styles.titleText}>{contact.name || "No Name"}</Text>
              <Text style={styles.subtitleText}>
                {contact.phone || "No Phone"}
              </Text>
            </div>
          </div>
          <Button
            type="primary"
            shape="round"
            size={"large"}
            icon={<PlusCircleOutlined />}
            style={{
              // position: "fixed",
              // bottom: "3%",
              justifySelf: "end",
              alignSelf: "center",
              // width: "30%",
              // height: "5%",
              // height: "10px",
              right: "2.5%",
              // margin: "auto",
              zIndex: 3,
            }}
            onClick={() => {
              navigate(
                `/addinteraction?contactId=${contact.id}&contactName=${contact.name}&contactPhone=${contact.phone}`
              );
            }}
          >
            Add Interaction
          </Button>
        </div>
      </Affix>

      <div style={styles.container}>
        <div style={{ width: "95%", margin: "auto", zIndex: 1 }}>
          <Analytics contact={contact} />
          <Divider />
          <InteractionsPaginated contact={contact} />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

const styles = {
  container: {
    height: "100%",
    backgroundColor: "#f3f3f3",
    position: "relative",
    zIndex: 1,
    // paddingBottom: "15%",
    // height: "fit",
    // width: "95%",
    // margin: "auto",
    // paddingLeft: "2.5%",
    // paddingRight: "2.5%",
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
    lineHeight: 1,
  },
  subtitleText: {
    fontSize: "12px",
    color: "#666",
    lineHeight: 1,
  },
};
