import React, { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

const ContactFab = ({ contact, setContact }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleContactSelect = () => {
    // Trigger the native message for contact selection
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ method: "select-contact" })
      );
    }
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        type="primary"
        shape="round"
        icon={contact ? <UserOutlined /> : <PlusOutlined />}
        size="large"
        onClick={showModal}
        style={{
          height: "28px",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          alignSelf: "center",
          marginLeft: "5px",
        }}
      >
        {contact ? contact.name : "Select Contact"}
      </Button>

      {/* Contact Selection Modal */}
      <Modal
        title="Select Contact"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          contact && (
            <Button
              key="remove"
              type="danger"
              onClick={() => {
                setContact(null);
              }}
            >
              Remove Contact
            </Button>
          ),
          <Button key="select" type="primary" onClick={handleContactSelect}>
            Select Contact
          </Button>,
        ]}
      >
        <p>Select a contact or remove the current contact.</p>
        {/* Add more content or logic here for contact selection */}
      </Modal>
    </>
  );
};

export default ContactFab;
