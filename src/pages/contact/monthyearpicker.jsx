import React, { useState } from "react";
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
import moment from "moment";
import { FaAngleLeft, FaAngleRight, FaRegCalendarAlt } from "react-icons/fa";

const { Text, Title } = Typography;

const MonthYearPicker = (props) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // JavaScript months are 0-indexed
  const [isOpen, setIsOpen] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const incrementYear = () => setYear((prevYear) => prevYear + 1);
  const decrementYear = () => setYear((prevYear) => prevYear - 1);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ width: "25%" }}>
      <div
        style={{
          backgroundColor: "white",
          border: "none",
          padding: "5%",
          //   alignItems: "center",
          whiteSpace: "nowrap",
          borderRadius: "2%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        onClick={togglePopup}
      >
        <Text style={{ alignSelf: "center", marginRight: "5%" }}>{`${
          months[month - 1]
        }, ${year}`}</Text>
        <FaRegCalendarAlt size={"1em"} style={{ alignSelf: "center" }} />
      </div>
      {isOpen && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            right: 0,
            backgroundColor: "white",
            // padding: "2%",
            borderRadius: "2%",

            marginTop: "2%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "3%",
              marginLeft: "5%",
              marginTop: "3%",
              marginRight: "5%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FaAngleLeft size={"1.5em"} onClick={decrementYear}></FaAngleLeft>
            <span>{year}</span>
            <FaAngleRight size={"1.5em"} onClick={incrementYear}></FaAngleRight>
          </div>
          <select
            style={{ marginBottom: "3%", marginLeft: "5%", marginRight: "5%" }}
            value={month}
            onChange={handleMonthChange}
          >
            {months.map((name, index) => (
              <option key={name} value={index + 1}>
                {name}
              </option>
            ))}
          </select>
          <Button
            type="primary"
            shape="round"
            size={"small"}
            // icon={<PlusCircleOutlined />}
            style={{
              height: "5%",
              marginLeft: "5%",
              marginBottom: "3%",
              zIndex: 2,
              width: "90%",
              // margin: "auto",
            }}
            onClick={async () => {
              if (props.setYearMonth)
                props.setYearMonth(
                  moment(`${months[month - 1]}, ${year}`).format("YYYY-MM")
                );
              togglePopup();
            }}
          >
            Set Date
          </Button>
        </div>
      )}
    </div>
  );
};

export default MonthYearPicker;
