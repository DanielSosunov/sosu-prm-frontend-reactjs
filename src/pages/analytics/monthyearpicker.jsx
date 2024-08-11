import React, { useState } from "react";
import {
  Modal,
  Select,
  Checkbox,
  Button,
  Typography,
  Row,
  Col,
  Space,
} from "antd";
import moment from "moment";
import { FaRegCalendarAlt } from "react-icons/fa";

const { Text } = Typography;

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const currentYear = new Date().getFullYear();
const years = Array.from(new Array(20), (val, index) => currentYear - index);

const MonthYearPicker = ({ setYearMonth }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Temporary state to hold changes in the modal
  const [tempMonth, setTempMonth] = useState(selectedMonth);
  const [tempYear, setTempYear] = useState(selectedYear);
  const [tempSelectAll, setTempSelectAll] = useState(selectAll);

  const handleMonthChange = (value) => {
    setTempMonth(value);
    setTempSelectAll(false);
  };

  const handleYearChange = (value) => {
    setTempYear(value);
    setTempSelectAll(false);
  };

  const handleSelectAllChange = (e) => {
    setTempSelectAll(e.target.checked);
    if (e.target.checked) {
      setTempMonth(null);
      setTempYear(null);
    } else {
      setTempMonth(selectedMonth);
      setTempYear(selectedYear);
    }
  };

  const handleOk = () => {
    setSelectAll(tempSelectAll);
    if (tempSelectAll) {
      setYearMonth("All");
    } else if (tempMonth && tempYear) {
      setYearMonth(moment([tempYear, tempMonth - 1]).format("YYYY-MM"));
      setSelectedMonth(tempMonth);
      setSelectedYear(tempYear);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    // Set temp state to current state
    setTempMonth(selectedMonth);
    setTempYear(selectedYear);
    setTempSelectAll(selectAll);
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          width: "auto",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          height: "32px",
        }}
      >
        <Text
          ellipsis={{ tooltip: true }}
          style={{
            flexShrink: 1,
          }}
        >
          {selectAll
            ? "All"
            : `${months[selectedMonth - 1]?.label}, ${selectedYear}`}
        </Text>
        <FaRegCalendarAlt style={{ flexShrink: 0 }} />
      </Button>
      <Modal
        title="Select Month and Year"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Set Date
          </Button>,
        ]}
      >
        <Checkbox checked={tempSelectAll} onChange={handleSelectAllChange}>
          Select All Analytics
        </Checkbox>
        <Row gutter={8} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Select
              placeholder="Select Month"
              value={tempMonth}
              onChange={handleMonthChange}
              style={{ width: "100%" }}
              disabled={tempSelectAll}
            >
              {months.map((month) => (
                <Select.Option key={month.value} value={month.value}>
                  {month.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              placeholder="Select Year"
              value={tempYear}
              onChange={handleYearChange}
              style={{ width: "100%" }}
              disabled={tempSelectAll}
            >
              {years.map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default MonthYearPicker;
