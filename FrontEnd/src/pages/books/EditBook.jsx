import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, Select, Modal, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { apiUpdateBooks, apiGetBooks } from "../../services/Books";
import { apiGetCategory } from "../../services/Category";
const { Option } = Select;

const EditBook = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigators = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    updateBook(values);
  };

  const updateBook = async (values) => {
    try {
      values.id = id;
      await apiUpdateBooks(values);
      message.success("Book updated successfully!");
      navigators("/books");
    } catch (error) {
      Modal.error({
        title: "Error",
        content: `Failed to update the book: ${error.response.data.UserMessage}`,
      });
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await apiGetCategory("");
      setCategories(response.data);
    } catch (error) {
      message.error(error.response.data.UserMessage);
    }
  };

  const loadBookDetails = async () => {
    try {
      const response = await apiGetBooks(id);
      form.setFieldsValue(response.data);
    } catch (error) {
      message.error("Failed to fetch book details: " + error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
    loadBookDetails();
  }, [id]);

  return (
    <Form form={form} name="edit_book" onFinish={onFinish} layout="vertical">
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: "Please input the title!",
            min: 3,
            max: 100,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="author"
        label="Author"
        rules={[
          {
            required: true,
            message: "Please input the author!",
            min: 3,
            max: 100,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please input the description!",
            min: 10,
            max: 500,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true, message: "Please select the category!" }]}
      >
        <Select placeholder="Select a category">
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="availableCopies"
        label="Available Copies"
        rules={[
          {
            required: true,
            message: "Please input the number of available copies!",
          },
        ]}
      >
        <InputNumber min={1} max={1000} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditBook;
