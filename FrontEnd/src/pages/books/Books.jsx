import React, { useState, useEffect } from "react";
import { Table, Input, message, Button, Space, Modal } from "antd";
import { apiGetFilterBooks, apiDeleteBooks } from "../../services/Books";
import {
  DeleteOutlined,
  EditOutlined,
  ExpandAltOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const BooksTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const navigator = useNavigate();
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await apiGetFilterBooks({
        SearchTerm: params.searchTerm,
        SortColumn: params.sortColumn,
        SortOrder: params.sortOrder,
        Page: params.pagination.current,
        PageSize: params.pagination.pageSize,
      });

      setData(response.data.data);
      setPagination({
        ...params.pagination,
        total: response.data.totalCount,
      });
    } catch (error) {
      message.error("Failed to fetch data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({
      searchTerm,
      sortColumn,
      sortOrder,
      pagination,
    });
  }, [searchTerm, sortColumn, sortOrder]);

  const handleTableChange = (pagination, filters, sorter) => {
    setSortColumn(sorter.field || "");
    setSortOrder(sorter.order || "");
    fetchData({
      pagination,
      searchTerm,
      sortColumn: sorter.field || "",
      sortOrder: sorter.order || "",
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPagination({ ...pagination, current: 1 });
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
      await apiDeleteBooks(Id);
      message.success("Book deleted successfully");
      setPagination({ ...pagination, current: 1 }); // Reset pagination
      fetchData({
        searchTerm,
        sortColumn,
        sortOrder,
        pagination: { ...pagination, current: 1 },
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.response.data.UserMessage,
      });
    }
  }
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Author",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text, record) => record.category.name,
    },
    {
      title: "Available Copies",
      dataIndex: "availableCopies",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => navigator(`${record.id}`)}>
            <EyeOutlined />
          </Button>
          <Button type="primary" onClick={() => navigator(`edit/${record.id}`)}>
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
        <Search
          placeholder="Search books"
          onSearch={handleSearch}
          style={{ marginBottom: 16, width: 200 }}
        />
        <Button type="primary" onClick={() => navigator("create")}>
          Create
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default BooksTable;
