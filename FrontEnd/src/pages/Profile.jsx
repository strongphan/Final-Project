import React, { useState, useEffect } from "react";
import { apiGetProfile } from "../services/Profile";
import { useAuthContext } from "../context/authContext";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [profile, setProfile] = useState({});
  const { user } = useAuthContext();
  const navigator = useNavigate();
  const fetchPost = async (id) => {
    try {
      const response = await apiGetProfile(user.id);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost(user.id);
  }, [user]);
  return (
    <div className="Profile">
      <h1>Name: {profile?.name}</h1>
      <h1>Mail: {profile?.email}</h1>
      {user.role === "User" && (
        <Button
          title="Borrow history"
          type="primary"
          onClick={() => navigator(`requests/${user.id}`)}
        >
          Borrowed
        </Button>
      )}
    </div>
  );
};

export default Profile;
