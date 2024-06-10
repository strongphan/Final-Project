// Using Ant Design components in the Home component
import React, { useEffect, useState } from "react";
import { Card, Button, message } from "antd"; // Importing Ant Design components
import { useNavigate } from "react-router-dom";
import { apiGetFilterBooks } from "../../services/Books";
import { debounce } from "../../common/debounce"; // Import debounce function
import { useAuthContext } from "../../context/authContext";
import "./Home.css";
import { useCartContext } from "../../context/cartContext";
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [totalPages, setTotalPages] = useState();
  const { cartItems, addItemToCart, removeItemFromCart } = useCartContext();
  const { isAuthenticated } = useAuthContext();
  const navigator = useNavigate();

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await apiGetFilterBooks({
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
      setTotalPages(
        Math.ceil(response.data.totalCount / params.pagination.pageSize)
      );
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

  const handleAddToCart = (book) => {
    if (!isAuthenticated) {
      message.error("Please login to add to cart");
      return;
    }
    if (cartItems.length > 4) {
      message.error("Cannot add more than 5 items to cart");
      return;
    }
    addItemToCart(book);
  };
  const handleRemoveFromCart = (book) => {
    if (!isAuthenticated) {
      message.error("Please login to add to cart");
      return;
    }
    removeItemFromCart(book);
  };
  const previous = () => {
    setPagination({ ...pagination, current: pagination.current - 1 });
    fetchData({
      searchTerm,
      sortColumn,
      sortOrder,
      pagination: { ...pagination, current: pagination.current - 1 },
    });
  };
  const next = () => {
    setPagination({ ...pagination, current: pagination.current + 1 });
    fetchData({
      searchTerm,
      sortColumn,
      sortOrder,
      pagination: { ...pagination, current: pagination.current + 1 },
    });
  };
  return (
    <>
      <div className="Top_content">
        <input
          type="text"
          placeholder="Search Term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortColumn}
          onChange={(e) => setSortColumn(e.target.value)}
        >
          <option value="">Sort Column</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort Order</option>
          <option value="asc">Ascending</option>
          <option value="descend">Descending</option>
        </select>
      </div>

      <div className="BookCards">
        {data.map((book) => (
          <Card
            key={book.id}
            title={book.title}
            style={{ width: 250, alignContent: "center", height: 350 }}
          >
            <img
              src="https://everyday-reading.com/wp-content/uploads/2015/12/TheBestBooks2015-003-1-724x1024.jpg"
              alt="Book Cover"
              style={{ width: 100 }}
            />
            <p>Author: {book.author}</p>
            <p>{book.description}</p>
            <Button
              onClick={() =>
                cartItems.some((item) => item.id === book.id)
                  ? handleRemoveFromCart(book)
                  : handleAddToCart(book)
              }
            >
              {cartItems.some((item) => item.id === book.id)
                ? "Remove from Cart"
                : "Add to Cart"}
            </Button>{" "}
          </Card>
        ))}
      </div>
      <div className="Pagination">
        <Button onClick={pagination.current === 1 ? null : previous}>
          Previous
        </Button>
        <span>
          {pagination.current} / {totalPages}
        </span>
        <Button onClick={pagination.current === totalPages ? null : next}>
          Next
        </Button>{" "}
      </div>
    </>
  );
};

export default Home;
