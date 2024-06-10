import {
  HomeOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Menu, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useCartContext } from "../context/cartContext";
import { useState } from "react";
import { RequiredAuth } from "../components";
import { apiCreateRequest } from "../services/BorrowRequest";
function Navbar() {
  const nav = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const { cartItems, removeItemFromCart, clearCart } = useCartContext();
  const [isVisible, setIsVisible] = useState(false);
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
  const handleDisplayCart = () => {
    if (isAuthenticated) setIsVisible(!isVisible);
  };
  const handleBorrow = async () => {
    if (cartItems.length > 0) {
      const cartItemIds = cartItems.map((item) => item.id);
      try {
        await apiCreateRequest(cartItemIds);
      } catch (error) {
        return message.error(error.response.data.UserMessage);
      }
      clearCart();
      message.success("Borrowing succes");
    }
  };
  return (
    <div className="Navbar">
      <Menu mode="horizontal" onClick={({ key }) => handleMenuClick(key)}>
        <Menu.Item key="/home">
          <HomeOutlined style={{ paddingRight: 10 }} />
          Home
        </Menu.Item>
        <Menu.Item key="/profile">
          <ProfileOutlined style={{ paddingRight: 10 }} />
          Profiles
        </Menu.Item>
        <Menu.Item key="#" onClick={handleDisplayCart}>
          <ShoppingCartOutlined style={{ paddingRight: 10 }} />
          Cart
        </Menu.Item>
        <Menu.Item key="/login">
          {isAuthenticated ? "Logout" : "Login"}
        </Menu.Item>
      </Menu>
      {isVisible && (
        <div className="Cart">
          <div>
            {cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                {item.title}
                <Button onClick={() => removeItemFromCart(item.id)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <RequiredAuth>
              <Button type="primary" onClick={handleBorrow}>
                Borrow
              </Button>
            </RequiredAuth>
            <Button type="primary" danger onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
