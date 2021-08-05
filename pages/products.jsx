import MainLayout from "../components/MainLayout";
import {
  message,
  Table,
  Button,
  Modal,
  Image,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
const { Dragger } = Upload;
import { InboxOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
const { Option } = Select;
import { ApiFood } from "../api";
import moment from "moment";
import Cookies from "js-cookie";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [image, setAddImg] = useState();
  const [loading, setLoadin] = useState(false);
  const getData = () => {
    setLoadin(true);
    ApiFood((data, error) => {
      setLoadin(false);
      if (error) return message.error(error);
      setData(data);
    });
  };
  useEffect(() => {
    getData();
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

  const onFinish = (values) => {
    setLoadin(true);
    var formdata = new FormData();
    formdata.append("image", image, image.name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`https://api.imgbb.com/1/upload?key=`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        const imageToUpload = result.data.url;

        const token = await Cookies.get("adminToken");
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          ...values,
          image: imageToUpload,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("https://prisma-shop.herokuapp.com/v1/product", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            message.success("uploaded successfully");
            setLoadin(false);
            getData();
            handleCancel();
          })
          .catch((error) => console.log("error", error));
      })
      .catch((e) => console.log(e));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleImageUpload = ({ fileList }) => {
    if (fileList[0]) {
      setAddImg(fileList[0].originFileObj);
    }
  };

  return (
    <div className="home-container">
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Dragger onChange={handleImageUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>

        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <p>Product Name</p>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input product name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <p>Description</p>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <p>Price</p>
          <div style={{ display: "flex" }}>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input price",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="currency"
              rules={[
                {
                  required: true,
                  message: "Please input price",
                },
              ]}
            >
              <Select defaultValue="IQD" style={{ width: 120 }}>
                <Option value="IQD">IQD</Option>
                <Option value="USD">USD</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              loading={loading}
              disabled={loading}
              type="primary"
              htmlType="submit"
            >
              Add Product
            </Button>
          </Form.Item>
        </Form>
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
