import React from "react";
import { Button, Tabs, Layout, Avatar, Typography, Card, Flex } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { MdEmojiPeople, MdFavorite } from "react-icons/md";
import { PiHandsClappingBold } from "react-icons/pi";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

const ContactPage = ({ contact, onBack }) => {
  const { name, phone, email, photo, location } = contact;
  const data = [
    { label: "Personal", percent: 60, numb: 6 },
    { label: "Not Personal", percent: 40, numb: 4 },
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

        <BarChartComponent data={data} colorType={"red"} />
      </Content>
    </Layout>
  );
};
const BarChartComponent = ({ data, colorType }) => {
  const colors = {
    blue: ["#CAF0F8", "#ADE8F4", "#90E0EF", "#48CAE4"], // Blue colors from light to medium-light
    green: ["#d0ffd0", "#b0ffb0", "#90ff90", "#60ff60"], // Green colors from light to medium-light
    red: ["#ffcccc", "#ffb3b3", "#ff9999", "#ff8080"], // Red colors from light to medium-light
  };
  function assignColors(data, colors, type) {
    let colorIndex = 0; // Initialize color index
    switch (type) {
      case "blue":
        data.forEach((item, index) => {
          item.color = colors.blue[colorIndex];
          colorIndex = (colorIndex + 1) % colors.blue.length; // Increment color index, loop back if exceeds array length
        });
        break;
      case "green":
        data.forEach((item, index) => {
          item.color = colors.green[colorIndex];
          colorIndex = (colorIndex + 1) % colors.green.length; // Increment color index, loop back if exceeds array length
        });
        break;
      case "red":
        data.forEach((item, index) => {
          item.color = colors.red[colorIndex];
          colorIndex = (colorIndex + 1) % colors.red.length; // Increment color index, loop back if exceeds array length
        });
        break;
      default:
        console.error("Invalid type:", type);
    }
  }

  assignColors(data, colors, colorType);

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Dataset 1",
        data: data.map((item) => item.percent),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: "y", // Use a horizontal bar chart
    scales: {
      x: {
        display: false, // Hide the lower axis numbers
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: "10em", // Set the font size for the labels on the left side
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
      datalabels: {
        display: true,
        anchor: "center", // Position labels at the end of each bar
        align: "center", // Align labels to the top of each bar
        formatter: (value, context) => {
          // Display the value and the numb variable
          const { dataIndex } = context;
          const numb = data[dataIndex].numb;
          return `${numb} times (${value}%)`; // Adjusted label format
        },
        color: "#000", // Set the color of the datalabels text
        font: {
          weight: "bold",
        },
      },
    },
    maintainAspectRatio: false, // Adjust aspect ratio
  };

  return (
    <Flex
      vertical
      style={{
        backgroundColor: "#ededed",
        // width: "95%",
        margin: "auto",
        padding: "3%",
        borderRadius: "5%",
        marginTop: "3%",
      }}
    >
      <Text
        style={{
          color: "black",
          fontWeight: "bolder",
          fontSize: "1em",
          textAlign: "left",
        }}
      >
        Purpose Breakdown
      </Text>
      <Flex
        style={{
          width: "100%",
          //   display: "flex",
          //   flexDirection: "column",
          // margin: "auto",
          // backgroundColor: "#ededed",
          // overflow: "hidden", // Ensure the container properly contains its children
        }}
      >
        <Bar
          data={chartData}
          options={options}
          // style={{ height: "80%", margin: "auto" }}
        />
      </Flex>
    </Flex>
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
    // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // Adjust as needed for shadow effect
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
