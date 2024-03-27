import React from "react";
import { Button, Tabs, Layout, Avatar, Typography, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { MdEmojiPeople, MdFavorite } from "react-icons/md";
import { PiHandsClappingBold } from "react-icons/pi";
import { VictoryPie, VictoryLabel } from "victory";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

const ContactPage = ({ contact, onBack }) => {
  const { name, phone, email, photo, location } = contact;
  const sampleData = [
    { label: "A", y: 50, color: "tomato" },
    { label: "B", y: 30, color: "orange" },
    { label: "C", y: 20, color: "gold" },
    // Add more slices as needed
  ];
  return (
    <Layout style={styles.container}>
      <Header style={styles.header}>
        <ArrowLeftOutlined style={styles.icon} />
        <div style={styles.contentContainer}>
          <Avatar src={photo} size={40} style={styles.photo} />
          <div style={styles.textContainer}>
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.subtitleText}>{phone}</Text>
          </div>
        </div>
        <div style={{ width: "24px" }} />
      </Header>
      <Content
        style={{
          width: "95%",
          //   backgroundColor: "red",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1em",
            marginTop: "1em",
          }}
        >
          <StatsCard
            stat="6"
            text={"Interactions with " + name}
            cardColor={"#FDDCFF"}
            icon={
              <MdEmojiPeople
                size={"2em"}
                color={"#E957F3"}
                style={{ marginBottom: "1em" }}
              />
            }
          />
          <StatsCard
            stat="6"
            text={"They contacted you"}
            cardColor={"#ECE4FF"}
            icon={
              <MdFavorite
                size={"2em"}
                color={"#A279F8"}
                style={{ marginBottom: "1em" }}
              />
            }
          />
          <StatsCard
            stat="6"
            text={"You contacted them"}
            cardColor={"#D9E7F7"}
            icon={
              <PiHandsClappingBold
                size={"2em"}
                color={"#4688DB"}
                style={{ marginBottom: "1em" }}
              />
            }
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <ReusablePieChart data={sampleData} />
          </div>
          <div
            style={{
              width: "50%",
            }}
          >
            <ReusablePieChart data={sampleData} />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

const StatsCard = ({ text, icon, stat, cardColor }) => {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: "10px", // Adjust as needed for rounded corners
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // Adjust as needed for shadow effect
    backgroundColor: cardColor, // Replace with actual color for each activity
    padding: "1em",
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

const ReusablePieChart = ({ data }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <VictoryPie
        data={data}
        labelRadius={({ innerRadius }) => innerRadius + 20} // Adjust label positioning based on the inner radius
        labelComponent={
          <VictoryLabel
            verticalAnchor="middle"
            textAnchor="middle"
            style={{ fill: "white", fontSize: 15, fontFamily: "Arial" }}
          />
        }
        labels={({ datum }) => `${datum.label}: ${datum.y}%`}
        colorScale={data.map((item) => item.color)}
        style={{
          parent: { maxWidth: "100%", maxHeight: "100%" },
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // Adjust as needed for shadow effect
        }}
        width={400} // Adjust as needed
        height={400} // Adjust as needed
        containerComponent={<svg viewBox="0 0 400 400" />}
      />
    </div>
  );
};

export default ContactPage;

const styles = {
  container: {
    height: "100vh",
    // backgroundColor: "yellow",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
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
    marginRight: "12px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  titleText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  subtitleText: {
    fontSize: "14px",
    color: "#666",
  },
};
