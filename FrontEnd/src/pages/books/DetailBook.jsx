import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Spin, message } from "antd";
import { apiGetBooks } from "../../services/Books";

const DetailBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async (id) => {
    setLoading(true);
    try {
      const response = await apiGetBooks(id);
      setBook(response.data);
    } catch (error) {
      message.error(error.response.data.UserMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(id);
    fetchData(id);
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }
  if (!book) {
    return <p>No book found!</p>;
  }

  return (
    <Card title={book.title} bordered={false}>
      <Descriptions bordered>
        <Descriptions.Item label="Title">{book.title}</Descriptions.Item>
        <Descriptions.Item label="Author">{book.author}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {book.description}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {book.category.name}
        </Descriptions.Item>
        <Descriptions.Item label="Available Copies">
          {book.availableCopies}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DetailBook;
