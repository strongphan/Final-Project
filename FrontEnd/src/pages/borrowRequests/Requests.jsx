import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {
  apiGetFilterRequest,
  apiUpdateReturnRequest,
  apiUpdateStatusRequest,
} from "../../services/BorrowRequest";
import { Button, Input, Modal, Space, Table, message } from "antd";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,


  EyeOutlined,
} from "@ant-design/icons";

const RequestTable = () => {
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
      const response = await apiGetFilterRequest({
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
  const handleUpdateStatus = async (id, status) => {
    try {
      await apiUpdateStatusRequest(id, status);
      message.success("Status updated successfully");
      fetchData({
        searchTerm,
        sortColumn,
        sortOrder,
        pagination,
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.response.data.UserMessage,
      });
    }
  };
  const handleUpdateReturn = async (id) => {
    try {
      await apiUpdateReturnRequest(id);
      message.success("Status updated successfully");
      fetchData({
        searchTerm,
        sortColumn,
        sortOrder,
        pagination,
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.response.data.UserMessage,
      });
    }
  };
  const columns = [
    {
      title: "Requestor",
      dataIndex: "requestor",
      sorter: true,
      render: (text, record) => record.requestor?.name,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => record.requestor.email,
    },
    {
      title: "Date Requested",
      dataIndex: "dateRequested",
      sorter: true,
      render: (text, record) => new Date(record.dateRequested).toLocaleString(),
    },
    {
      title: "Books",
      dataIndex: " ",
      render: (text, record) =>
        record.bookBorrowingRequestDetails
          .map((detail) => detail.book.title)
          .join(",\n"),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (text, record) => {
        let color = "";
        if (record.status === 0) {
          color = "blue";
          return <span style={{ color }}>{"Waiting"}</span>;
        } else if (record.status === 1) {
          color = "green";
          return <span style={{ color }}>{"Approved"}</span>;
        } else if (record.status === 2) {
          color = "red";
          return <span style={{ color }}>{"Rejected"}</span>;
        } else {
          color = "gray";
          return <span style={{ color }}>{text}</span>;
        }
      },
    },
    {
      title: "Approver",
      dataIndex: "approver",
      render: (text, record) => record.approver?.name,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            title="Detail"
            type="primary"
            onClick={() => navigator(`${record?.id}`)}
          >
            <EyeOutlined />
          </Button>
          {record.status === 0 && (
            <Space>
              <Button
                title="Approved"
                type="primary"
                onClick={() => handleUpdateStatus(record.id, 1)}
              >
                <CheckOutlined />
              </Button>
              <Button
                title="Rejected"
                type="primary"
                danger
                onClick={() => handleUpdateStatus(record.id, 2)}
              >
                <CloseOutlined />
              </Button>
            </Space>
          )}
          {record.status === 1 && record.isReturn === false && (
            <Space>
              <Button
                type="primary"
                onClick={() => handleUpdateReturn(record.id)}
              >
                <CheckCircleOutlined title="Confirm Return" />
              </Button>
            </Space>
          )}
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="Top_content">
        <Input.Search
          placeholder="Search books"
          onSearch={handleSearch}
          style={{ marginBottom: 16, width: 200 }}
        />
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

export default RequestTable;
