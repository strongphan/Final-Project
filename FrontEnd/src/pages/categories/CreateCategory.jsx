import React from "react";
import { Form, Input, Button, message } from "antd";
import { apiCreateCategory } from "../../services/Category";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const navigator = useNavigate();
  const createCategory = async (values) => {
    try {
      await apiCreateCategory(values);
      message.success("Category created successfully");
      navigator("/categories");
    } catch (err) {
      message.error(err.response.data.UserMessage);
    }
  };
  const onFinish = (values) => {
    createCategory(values);
  };

  return (
    <Form name="create_category_form" onFinish={onFinish}>
      <Form.Item
        label="Category Name"
        name="name"
        rules={[{ required: true, message: "Please input the category name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Category
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCategory;
