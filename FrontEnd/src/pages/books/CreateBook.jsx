import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, Select, Modal, message } from "antd";
import { apiCreateBooks } from "../../services/Books";
import { apiGetCategory } from "../../services/Category";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateBook = () => {
  const [form] = Form.useForm();
  const [categories, SetCategories] = useState(null);
  const navigators = useNavigate();
  const onFinish = (values) => {
    createFunc(values);
  };
  const createFunc = async (values) => {
    try {
      const { title, author, description, availableCopies, categoryId } =
        values;
      const newBook = {
        title,
        author,
        description,
        availableCopies,
        categoryId,
      };
      await apiCreateBooks(newBook);
      message.success("Book updated successfully!");
      navigators("/books");
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.response.data.UserMessage,
      });
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await apiGetCategory("");
      SetCategories(response.data);
    } catch (error) {
      message.error(error.response.data.UserMessage);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <Form
      form={form}
      name="create_book"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        availableCopies: 1,
      }}
    >
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
          {categories?.map((category) => (
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBook;
