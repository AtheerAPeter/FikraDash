import MainLayout from "../components/MainLayout";
import { message, Table, Button, Modal, Image } from "antd";
import { useEffect, useState } from "react";
import { ApiFood } from "../api";
import moment from "moment";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoadin] = useState(false);
  useEffect(() => {
    setLoadin(true);
    ApiFood((data, error) => {
      setLoadin(false);
      if (error) return message.error(error);
      setData(data);
    });
  }, []);

  const columns = [
    {
      title: "IDs",
      dataIndex: "id",
      width: 50,
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
    },
    {
      title: "",
      dataIndex: "image",
      render: (url) => <Image className="table-image" width={50} src={url} />,
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "name",
      render: (name) => <strong>{name}</strong>,
      width: 200,
    },

    {
      title: "Price",
      dataIndex: "price",
      render: (data) => numberWithCommas(data),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD/MM/yyyy, hh:mm A"),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="home-container">
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <MainLayout />
      <div className="container">
        <div className="header">
          <h1>Food Products</h1>
          <Button onClick={showModal} type="primary">
            Add New
          </Button>
        </div>
        <Table
          scroll={{ x: "700px" }}
          pagination={{
            defaultPageSize: 6,
          }}
          size="small"
          rowKey={(record) => record.id}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => true,
          }}
          loading={loading}
          className="table"
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default products;
