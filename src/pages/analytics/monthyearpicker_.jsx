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
  Tag,
} from "antd";
import moment from "moment";
import {
  ArrowLeftOutlined,
  PlusCircleOutlined,
  LoadingOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { FaAngleLeft, FaAngleRight, FaRegCalendarAlt } from "react-icons/fa";

const { Text, Title } = Typography;
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
const MonthYearPicker = (props) => {
  const today = new Date();
  const [displayYear, setDisplayYear] = useState(today.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(today.getMonth() + 1); // JavaScript months are 0-indexed
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [isOpen, setIsOpen] = useState(false);
  const selectMenu = useRef(null);

  const incrementYear = () => setYear((prevYear) => prevYear + 1);
  const decrementYear = () => setYear((prevYear) => prevYear - 1);

  const handleMonthChange = (event) => {
    console.log(`Handle Month Change: ${event.target.value}`);
    setMonth(event.target.value);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   if (props.setYearMonth)
  //     console.log(
  //       `onmount monthyearpicker`,
  //       displayMonth,
  //       displayYear,
  //       `${months[displayMonth - 1]}, ${displayYear}`,
  //       moment(`${months[displayMonth - 1]}, ${displayYear}`),
  //       moment([displayYear, displayMonth, 1]),
  //       moment(`${months[displayMonth - 1]}, ${displayYear}`).format("YYYY-MM"),
  //       moment([displayYear, displayMonth, 1]).format("YYYY-MM"),
  //       months
  //     );
  //   props.setYearMonth(
  //     moment([displayYear, displayMonth - 1, 1]).format("YYYY-MM")
  //   );
  //   // props.setYearMonth(
  //   //   moment(`${months[displayMonth - 1]}, ${displayYear}`).format("YYYY-MM")
  //   // );
  // }, []);
  return (
    <div style={{ width: "100%", ...props.style }}>
      <div
        style={{
          backgroundColor: "white",
          // padding: "5%",
          //   alignItems: "center",
          fontSize: "clamp(10px, 2vw, 24px)",

          whiteSpace: "nowrap",
          borderRadius: "5px",
          border: "1px solid #ededed",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "30px",
        }}
        onClick={togglePopup}
      >
        <Text
          style={{
            alignSelf: "center",
            marginRight: "5%",
            fontSize: "clamp(12px, 2vw, 24px)",
          }}
        >{`${months[displayMonth - 1]}, ${displayYear}`}</Text>
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
            borderRadius: "5px",

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
              width: "90%",
            }}
          >
            <FaAngleLeft size={"1.5em"} onClick={decrementYear}></FaAngleLeft>
            <span>{year}</span>
            <FaAngleRight size={"1.5em"} onClick={incrementYear}></FaAngleRight>
          </div>
          <div
            style={{
              width: "90%",
              display: "flex",
              position: "relative",
              margin: "auto",
              alignContent: "center",
              // padding: "2%",
              marginBottom: "2%",
              // position: "relative",
            }}
            onClick={() => {
              if (selectMenu.current) selectMenu.current.focus();
            }}
          >
            <select
              ref={selectMenu}
              style={{
                // backgroundColor: "red",
                // position: "absolute",
                // top: 0,
                // left: 0,

                // height: "100%",
                // padding: "2%",
                width: "100%",
                height: "50px",
                borderRadius: "5px",
                padding: "2%",
                border: "1px solid #d3d3d3",
                // paddingLeft: "2%",
                // paddingRight: "2%",
              }}
              value={month}
              onChange={handleMonthChange}
            >
              {months.map((name, index) => (
                <option key={name} value={index + 1}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="primary"
            shape="round"
            size={"small"}
            // icon={<PlusCircleOutlined />}
            style={{
              height: "40px",
              marginLeft: "5%",
              marginBottom: "3%",
              zIndex: 2,
              width: "90%",

              // margin: "auto",
            }}
            onClick={() => {
              console.log(`clicked set date`, props, year, month);
              if (props.setYearMonth)
                props.setYearMonth(
                  moment([year, month - 1, 1]).format("YYYY-MM")
                );
              // props.setYearMonth(
              //   moment(`${months[month - 1]}, ${year}`).format("YYYY-MM")
              // );
              setDisplayMonth(month);
              setDisplayYear(year);
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
