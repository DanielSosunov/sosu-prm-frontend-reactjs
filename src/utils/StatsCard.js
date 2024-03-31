import React from "react";
import { Button, Tabs, Layout, Avatar, Typography, Card, Flex } from "antd";

const { Text, Title } = Typography;
const StatsCard = ({ text, icon, stat, cardColor, style }) => {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: "10px", // Adjust as needed for rounded corners
    // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // Adjust as needed for shadow effect
    backgroundColor: cardColor, // Replace with actual color for each activity
    padding: "1em",
    // marginRight: "1em",
    ...style,
  };

  return (
    <div style={cardStyle}>
      {icon}
      <Text
        style={{
          color: "black",
          fontWeight: "bolder",
          lineHeight: "1.2",
          fontSize: "2em",
        }}
      >
        {stat}
      </Text>
      <Text
        style={{
          lineHeight: "1",
          fontSize: "0.8em",
          color: "#8A7A9A",
          fontWeight: "normal",
        }}
      >
        {text}
      </Text>
    </div>
  );
};

export default StatsCard;
