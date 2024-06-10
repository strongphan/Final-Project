import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import {
  apiGetFilterRequest,
  apiGetUserRequest,
  apiUpdateReturnRequest,
  apiUpdateStatusRequest,
} from "../../services/BorrowRequest";
import { Button, Modal, Space, Table, message } from "antd";

import Search from "antd/es/transfer/search";

const UserRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { id } = useParams();
  const navigator = useNavigate();
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await apiGetUserRequest(id, {
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

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => record.requestor.email,
    },
    {
      title: "Date Requested",
      dataIndex: "dateRequested",
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
  ];
  return (
    <>
      <div className="Top_content">
        <Search
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

export default UserRequests;
