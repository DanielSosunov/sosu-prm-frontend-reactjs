import React, { useState } from "react";
import { format } from "date-fns";

const SingleInteraction = ({
  contact,
  time,
  method,
  sentiment,
  purpose,
  initiatedBy,
  diary,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  const generateMessage = () => {
    const methodText = `<span><strong>${method}</strong></span>`;
    const sentimentText = `<span><strong>${sentiment}</strong></span>`;
    const purposeText = `<span><strong>${purpose}</strong></span>`;

    let message = "";

    if (initiatedBy === "Me") {
      message += `I contacted ${contact} `;
    } else {
      message += `${contact} contacted me `;
    }

    message += `via ${methodText}. It was ${purposeText} `;

    switch (sentiment) {
      case "positive":
        message += `and a ${sentimentText} interaction. 😊`;
        break;
      case "neutral":
        message += `and a ${sentimentText} interaction. 😐`;
        break;
      case "negative":
        message += `and a ${sentimentText} interaction. 😞`;
        break;
      default:
        message += "interaction with unknown sentiment. ";
    }

    return message;
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  const boxStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "15px",
    boxSizing: "border-box",
    width: "100%",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  };

  const avatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: "15px",
  };

  const boxContentStyle = {
    flex: 1,
  };

  const boxHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
  };

  const contactStyle = {
    fontWeight: "bold",
  };

  const timeStyle = {
    color: "#888",
    whiteSpace: "nowrap",
    alignSelf: "start",
  };

  const messageStyle = {
    margin: 0,
    color: "#555",
  };

  const diaryStyle = {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
    boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const expandTextStyle = {
    cursor: "pointer",
    color: "#007bff",
    marginLeft: "10px",
  };

  const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div style={boxStyle}>
      <div style={avatarStyle}>{getInitials(contact)}</div>
      <div style={boxContentStyle}>
        <div style={boxHeaderStyle}>
          <span style={contactStyle}>{contact}</span>
          <span style={timeStyle}>
            {format(new Date(time), "MMM d, h:mma")}
          </span>
        </div>
        <p
          style={messageStyle}
          dangerouslySetInnerHTML={{ __html: generateMessage() }}
        ></p>
        {expanded && diary && (
          <p style={{ ...messageStyle, ...diaryStyle }}>{diary}</p>
        )}
        {diary && (
          <div style={footerStyle}>
            <span></span>
            <span onClick={toggleExpand} style={expandTextStyle}>
              {expanded ? "hide diary" : "show diary"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleInteraction;
