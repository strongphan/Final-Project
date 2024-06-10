import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Space, Table, message } from "antd";
import { apiDeleteCategory, apiGetCategory } from "../../services/Category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigator = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPosts = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  const fetchCategories = async () => {
    try {
      const response = await apiGetCategory(""); // Assuming this fetches all categories
      setCategories(response.data);
    } catch (error) {
      message.error(error.response.data.UserMessage);
    }
  };
  function handleDelete(id) {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this post?",
      onOk() {
        Delete(id);
      },
    });
  }
  async function Delete(Id) {
    try {
      await apiDeleteCategory(Id);
      message.success("Book deleted successfully");
      fetchCategories();
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.response.data.UserMessage,
      });
    }
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            warning
            onClick={() => navigator(`edit/${record.id}`)}
          >
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="Top_content">
        <Input.Search
          placeholder="Search by name"
          onSearch={handleSearch}
          style={{ width: 400 }}
        />
        <Button type="primary" onClick={() => navigator("create")}>
          Create
        </Button>
      </div>
      <Table
        dataSource={filteredPosts}
        columns={columns}
        rowKey={(record) => record.id}
      ></Table>
    </>
  );
};

export default Categories;
