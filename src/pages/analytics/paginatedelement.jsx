import React, { useState, useEffect } from "react";
import { Typography, Tag, Button } from "antd";

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
        key={props.interaction.id}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ededed",
          borderRadius: "5px",
          //   width: "100%",
          padding: "3%",
          zIndex: 1,
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
            zIndex: 1,
            width: "100%",
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
              flex: 7,
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
                  fontSize: "clamp(10px, 2vw, 24px)",

                  // fontSize: "1em",
                  fontWeight: "bold",
                  // whiteSpace: "nowrap",
                }}
              >
                {interactionTypeLanguage[props.interaction.type.channel]}{" "}
                {!props.contact && props.interaction.contactName && (
                  <>
                    <Text
                      style={{
                        fontWeight: "lighter",
                        fontSize: "clamp(10px, 2vw, 24px)",
                      }}
                    >
                      with
                    </Text>{" "}
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: "clamp(10px, 2vw, 24px)",
                      }}
                    >
                      {props.interaction.contactName}
                    </Text>
                  </>
                )}
              </Text>
              <div style={{ marginLeft: "2px", marginRight: "2px" }} />
              <Text
                style={{
                  fontSize: "clamp(10px, 2vw, 20px)",

                  fontWeight: "regular",
                  // whiteSpace: "nowrap",
                }}
              >
                • {new Date(props.interaction.timestamp).toDateString()}
              </Text>
            </div>

            <Text
              style={{
                fontSize: "clamp(10px, 2vw, 20px)",
              }}
            >
              {initiatedByLanguage[props.interaction.initiatedBy]}
            </Text>

            <Text
              style={{
                fontSize: "clamp(10px, 2vw, 20px)",
              }}
            >
              {purposeLanguage[props.interaction.purpose]}
            </Text>
          </div>
          <div
            style={{
              //   padding: "3%",
              flex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "space-between",
              //   textAlign: "right",
            }}
          >
            <div
              style={{
                fontSize: "clamp(10px, 2vw, 20px)",
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
            {props.interaction.diary && (
              <Button
                type={"link"}
                // size={"middle"}
                style={{
                  // width: "100%",
                  fontSize: "clamp(10px, 2vw, 24px)",
                  padding: 0,
                  margin: 0,
                  // fontSize: window.innerWidth * 0.03,
                  //   backgroundColor: "#1578FE",
                  //   color: "white",
                  // backgroundColor: "white",
                  //   border: "1px solid #f3f3f3",
                  // borderRadius: "5px",
                  // padding: 4,
                  // whiteSpace: "nowrap",
                }}
              >
                {diaryView ? "Click to hide diary" : "Click to view diary"}
              </Button>
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
                fontSize: "clamp(10px, 2vw, 24px)",
                fontWeight: "bold",
              }}
            >
              Diary
            </Text>
            <Text style={{ fontSize: "clamp(10px, 2vw, 24px)" }}>
              {props.interaction.diary}
            </Text>
          </div>
        )}
      </div>
    )
  );
};

export default PaginatedElement;
