import { FileOutlined, HomeOutlined, ProfileOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

function SideBar() {
  const nav = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const handleMenuClick = (key) => {
    if (key === "/login") {
      if (isAuthenticated) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        nav("/login");
      } else {
        nav(key);
      }
    } else {
      nav(key);
    }
  };

  return (
    <div className="Navbar">
      <Menu mode="horizontal" onClick={({ key }) => handleMenuClick(key)}>
        <Menu.Item key="/dashboard">
          <HomeOutlined style={{ paddingRight: 10 }} />
          Dashboard
        </Menu.Item>
        <Menu.Item key="/books">
          <FileOutlined style={{ paddingRight: 10 }} />
          Books
        </Menu.Item>
        <Menu.Item key="/categories">
          <FileOutlined style={{ paddingRight: 10 }} />
          Categories
        </Menu.Item>
        <Menu.Item key="/requests">
          <ProfileOutlined style={{ paddingRight: 10 }} />
          Request
        </Menu.Item>
        <Menu.Item key="/profile">
          <ProfileOutlined style={{ paddingRight: 10 }} />
          Profiles
        </Menu.Item>
        <Menu.Item key="/login">
          {isAuthenticated ? "Logout" : "Login"}
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SideBar;
