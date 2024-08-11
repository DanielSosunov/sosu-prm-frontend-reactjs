import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

const StatsCard = ({ text, icon, stat, cardColor, style }) => {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around", // Ensures equal space between elements
    width: "100%",
    borderRadius: "10px", // Adjust as needed for rounded corners
    backgroundColor: cardColor, // Replace with actual color for each activity
    padding: "1em",
    ...style,
  };

  const statStyle = {
    color: "black",
    fontWeight: "bolder",
    lineHeight: "1.2",
    fontSize: "2em",
    margin: "0", // Remove any default margin
    textAlign: "center", // Center the text
  };
  const textStyle = {
    lineHeight: "1.1", // Slightly increased line height for better readability
    color: "#8A7A9A",
    fontWeight: "normal",
    margin: "0", // Remove any default margin
    textAlign: "center", // Center the text
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "2.8em", // Slightly increased height to accommodate larger text
    whiteSpace: "normal", // Allow text to wrap
    wordWrap: "break-word", // Break long words onto the next line
    overflow: "hidden", // Hide any overflow
    fontSize: "clamp(0.7em, 2.2vw, 0.9em)", // Slightly smaller clamp range to prevent cutting off
  };

  return (
    <div style={cardStyle}>
      {icon}
      <Text style={statStyle}>{stat}</Text>
      <Text style={textStyle}>{text}</Text>
    </div>
  );
};

export default StatsCard;
