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
import SelectContact from "./selectcontact";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

const ContactPage = (props) => {
  // const { name, phone, email, photo } = contact;
  const [contact, setContact] = useState(null);
  const [contactIdSelected, setContactIdSelected] = useState(null);
  const [contactsInteractedWith, setContactsInteractedWith] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);

  async function getAndSetContactsInteractedWith() {
    var authToken = LocalStorageManager.getItem("authToken");
    setLoading(true);
    await APIManager.getContactsByUserId(authToken, lastVisible).then(
      (result) => {
        if (result.data.contacts) {
          if (!contactsInteractedWith)
            setContactsInteractedWith(result.data.contacts);
          else
            setContactsInteractedWith([
              ...contactsInteractedWith,
              ...result.data.contacts,
            ]);
          if (result.data.lastVisible) setLastVisible(result.data.lastVisible);
          else setLastVisible(null);
        }
      }
    );

    setLoading(false);
  }
  async function initialFunc() {
    await getAndSetContactsInteractedWith();
    var contactId = searchParams.get(`contactId`);
    if (contactId) {
      setContactIdSelected(contactId);
    }
  }
  useEffect(() => {
    // initialFunc();
  }, []);
  return (
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
        <div
          style={{
            position: "relative",
            width: "95%",
            margin: "auto",
            zIndex: 1,
          }}
        >
          <div
            style={{
              // backgroundColor: "green",
              position: "absolute",

              marginTop: "1.1em",
            }}
          >
            <SelectContact
              lastVisibleFunc={
                lastVisible
                  ? () => {
                      getAndSetContactsInteractedWith();
                    }
                  : null
              }
              contactIdSelected={contactIdSelected}
              setContactIdSelected={setContactIdSelected}
              contactsInteractedWith={contactsInteractedWith}
            />
          </div>
          {/* <Analytics contact={contact} />
          <Divider />
          <InteractionsPaginated contact={contact} /> */}
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
