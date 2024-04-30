import React from "react";
import {
  Button,
  Tabs,
  Layout,
  Avatar,
  Typography,
  Card,
  Flex,
  Segmented,
} from "antd";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

const BarChart = ({ data, colorType, title }) => {
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
        // anchor: "center", // Position labels at the end of each bar
        align: "right", // Align labels to the top of each bar
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
        // margin: "auto",
        // padding: "3%",
        // borderRadius: "5%",
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
        {title}
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

const BarChartWithTabs = ({ data }) => {
  const [tab, setTab] = React.useState("Type");

  return (
    <div
      style={{
        backgroundColor: "#ededed",
        // width: "100%",
        padding: "3%",
        borderRadius: "2%",
      }}
    >
      <Segmented
        defaultValue="Type"
        //   style={{ marginBottom: 8 }}
        onChange={(value) => setTab(value)}
        options={["Type", "Purpose", "Sentiment"]}
      />
      {tab === "Purpose" && (
        <BarChart data={data.purpose} colorType={"red"} title={"Purpose"} />
      )}
      {tab === "Type" && (
        <BarChart data={data.type} colorType={"green"} title={"Type"} />
      )}
      {tab === "Sentiment" && (
        <BarChart
          data={data.sentiment}
          colorType={"blue"}
          title={"Sentiment"}
        />
      )}
    </div>
  );
};

export default BarChartWithTabs;
