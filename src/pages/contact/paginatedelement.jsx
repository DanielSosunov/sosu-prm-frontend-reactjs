import React, { useState, useEffect } from "react";
import { Typography, Tag } from "antd";

const { Text, Title } = Typography;

/**
 *
 */
const PaginatedElement = (props) => {
  const [diaryView, setDiaryView] = useState(false);

  var interactionTypeLanguage = {
    message: "Message",
    messages: "Message",
    inPerson: "In Person",
    other: "Interaction",
    phone: "Phone",
  };

  var purposeLanguage = {
    personal: "Personal",
    business: "Not Personal",
  };
  var initiatedByLanguage = {
    contact: "They reached out",
    me: "You reached out",
  };
  var sentimentLanguage = {
    negative: "Negative",
    positive: "Positive",
    neutral: "Neutral",
  };

  return (
    props.interaction && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ededed",
          borderRadius: "5px",
          //   width: "100%",
          padding: "3%",
        }}
        onClick={(event) => {
          if (props.interaction.diary) setDiaryView(!diaryView);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 10,
            marginBottom: diaryView ? "2%" : 0,
            // backgroundColor: "green",
          }}
        >
          <div
            style={{
              //   padding: "3%",
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              // flex: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: "1em",
                  fontWeight: "bold",
                }}
              >
                {interactionTypeLanguage[props.interaction.type.channel]}{" "}
                {!props.contact && props.interaction.contactName && (
                  <>
                    <Text style={{ fontWeight: "lighter", fontSize: "1em" }}>
                      with
                    </Text>{" "}
                    <Text style={{ fontWeight: "bold", fontSize: "1em" }}>
                      {props.interaction.contactName}
                    </Text>
                  </>
                )}
              </Text>
              <div style={{ marginLeft: "2px", marginRight: "2px" }} />
              <Text style={{ fontSize: "0.7em", fontWeight: "regular" }}>
                • {new Date(props.interaction.timestamp).toDateString()}
              </Text>
            </div>

            <Text
              style={{
                fontSize: "0.8em",
              }}
            >
              {initiatedByLanguage[props.interaction.initiatedBy]}
            </Text>

            <Text
              style={{
                fontSize: "0.8em",
              }}
            >
              {purposeLanguage[props.interaction.purpose]}
            </Text>
          </div>
          <div
            style={{
              //   padding: "3%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              //   textAlign: "right",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: "0.8em",
                  padding: 4,
                  borderRadius: "5px",
                  //   border: "1px solid #f3f3f3",

                  color: "white",
                  backgroundColor:
                    props.interaction.sentiment === "positive"
                      ? "#86DC3D"
                      : props.interaction.sentiment === "negative"
                      ? "#ff8080"
                      : "#48CAE4",
                }}
              >
                {sentimentLanguage[props.interaction.sentiment]}
              </div>
            </div>
            {props.interaction.diary && (
              <div
                style={{
                  fontSize: "0.8em",
                  //   backgroundColor: "#1578FE",
                  //   color: "white",
                  backgroundColor: "white",
                  //   border: "1px solid #f3f3f3",
                  borderRadius: "5px",
                  padding: 4,
                }}
              >
                {diaryView ? "Click to hide diary" : "Click to view diary"}
              </div>
            )}
          </div>
        </div>
        {diaryView && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              //   width: "100%",
              //   alignItems: "flex-start",
              padding: "1%",
              borderRadius: "5px",
              textAlign: "left",
            }}
          >
            <Text
              style={{
                fontSize: "0.8em",
                fontWeight: "bold",
              }}
            >
              Diary
            </Text>
            <Text style={{ fontSize: "0.8em" }}>{props.interaction.diary}</Text>
          </div>
        )}
      </div>
    )
  );
};

export default PaginatedElement;
