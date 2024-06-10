import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { apiUpdateCategory, apiGetCategory } from "../../services/Category";

const EditCategory = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [name, setname] = useState("");
  const navigator = useNavigate();

  const onFinish = async (values) => {
    try {
      values.id = id;
      await apiUpdateCategory(values);
      message.success("Category edited successfully");
      navigator("/categories");
    } catch (error) {
      message.error(error.response.data.UserMessage);
    }
  };
  const fetchCategory = async (id) => {
    try {
      const response = await apiGetCategory(id);
      setname(response.data.name);
      form.setFieldsValue({ name: response.data.name });
    } catch (err) {
      message.error("Failed to fetch category: " + err.message);
    }
  };
  useEffect(() => {
    fetchCategory(id);
  }, [id]);

  return (
    <Form
      form={form}
      name="edit_category"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input the category name!",
            min: 3,
            max: 100,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCategory;
