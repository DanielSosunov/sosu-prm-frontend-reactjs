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
import { useSearchParams } from "react-router-dom";
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

const SelectContact = (props) => {
  const [contactsExpanded, setContactsExpanded] = useState(false);
  const [displayName, setDisplayName] = useState(null);
  const [contactsInteractedWith, setContactsInteractedWith] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [contactIdSelected, setContactIdSelected] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [contactsLoading, setContactsLoading] = useState(false);

  async function getAndSetContactsInteractedWith() {
    var authToken = LocalStorageManager.getItem("authToken");
    setContactsLoading(true);
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
    setContactsLoading(false);
  }

  useEffect(() => {
    //Set initial contacts interacted with
    getAndSetContactsInteractedWith();
    var contactId = searchParams.get(`contactId`);
    if (contactId) {
      setContactIdSelected(contactId);
    }
  }, []);

  useEffect(() => {
    setContactsExpanded(false);
    //When a contact is selected, generate the display name
    getButtonDisplayName();

    //When a contact is selected, pull it and pass it down to props.getContact
    if (contactIdSelected && props.getContact) {
      var authToken = LocalStorageManager.getItem("authToken");

      APIManager.getContactById(contactIdSelected, authToken).then((result) => {
        if (result?.data?.contact) props.getContact(result.data.contact);
      });
    } else if (!contactIdSelected && props.getContact) {
      props.getContact(null);
    }
  }, [contactIdSelected]);
  function renderListOfContactsInteractedWith() {
    var list = [];
    list.push(
      <Button
        onClick={() => {
          setContactIdSelected(null);
        }}
        type={contactIdSelected === null ? "primary" : null}
        style={{
          margin: "auto",

          width: "95%",
          backgroundColor: contactIdSelected === null ? null : "#f3f3f3",
          borderRadius: 5,
          padding: 5,
        }}
      >
        {props.buttonTitle || "All Contacts"}{" "}
        {contactIdSelected === null && <CheckCircleOutlined color={"white"} />}
      </Button>
    );

    var list2 = contactsInteractedWith.map((contact) => (
      <Button
        id={contact.id}
        onClick={(e) => {
          setContactIdSelected(contact.id);
        }}
        type={contactIdSelected === contact.id ? "primary" : null}
        style={{
          margin: "auto",

          width: "95%",
          backgroundColor: contactIdSelected === contact.id ? null : "#f3f3f3",
          borderRadius: 5,
          padding: 5,
        }}
      >
        {contact.name}{" "}
        {contactIdSelected === contact.id && (
          <CheckCircleOutlined color={"white"} />
        )}
      </Button>
    ));

    if (lastVisible) {
      list2.push(
        <Button
          loading={contactsLoading}
          onClick={() => {
            getAndSetContactsInteractedWith();
          }}
          type={"link"}
          style={{
            margin: "auto",

            width: "95%",
            borderRadius: 5,
            padding: 5,
          }}
        >
          Load More
        </Button>
      );
    }
    return (
      <div style={{ display: "flex", gap: 5, flexDirection: "column" }}>
        {[...list, ...list2]}
      </div>
    );
  }

  async function getButtonDisplayName() {
    var dName = "No Name";

    if (contactIdSelected === null) dName = props.buttonTitle || "All Contacts";
    else if (contactsInteractedWith) {
      var findContact = contactsInteractedWith.find(
        (e) => e.id === contactIdSelected
      );
      if (findContact) dName = findContact.name;
    } else {
      var authToken = LocalStorageManager.getItem("authToken");

      var pullContact = await APIManager.getContactById(
        contactIdSelected,
        authToken
      );
      if (pullContact?.data?.contact) dName = pullContact.data.contact.name;
    }
    setDisplayName(dName);
  }
  return (
    contactsInteractedWith &&
    displayName && (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          gap: 5,
          position: "relative",
          zIndex: 10,
          ...props.style,
        }}
      >
        {contactsExpanded && (
          <div
            style={{
              backgroundColor: "white",
              maxHeight: "30vh",
              overflow: "auto",
              width: "100%",
              // width: "100vw",
              // height: "100vh",
              // position: "fixed",
              position: "absolute",
              top: 40,
              // left: 0,
              // top: 0,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 5,
              border: "1px solid #dedede",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <div>{renderListOfContactsInteractedWith()}</div>
            <div
              style={{
                width: "95%",
                margin: "auto",
                paddingTop: 5,
                //  paddingLeft: 5,
                // paddingRight: 5,
                color: "gray",
                // fontSize: "0.6em",
                // backgroundColor: "red",
                textAlign: "center",
              }}
            >
              Contacts you've interacted with will show up here.
            </div>
          </div>
        )}
        {props.title && (
          <Text
            style={{
              fontSize: "1em",
              whiteSpace: "nowrap",
              color: "black",
              alignSelf: "center",
            }}
          >
            {props.title}
          </Text>
        )}

        <Button
          style={{ width: "100%" }}
          onClick={() => {
            setContactsExpanded(!contactsExpanded);
          }}
          // icon={
          // }
        >
          {displayName}
          {!contactsExpanded ? <DownCircleOutlined /> : <UpCircleOutlined />}
        </Button>
      </div>
    )
  );
};

export default SelectContact;
