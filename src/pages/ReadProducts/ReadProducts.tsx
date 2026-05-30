import axios from "axios";
import { useEffect, useState } from "react";
import "./ReadProducts.css";
import { IoIosArrowBack, IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";
interface Product {
  created_at: string;
  id: number;
  image_url: string;
  name: string;
  price: string;
  updated_at: string;
}
const ReadProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [deletedTask, setDeletedTask] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          "https://dashboard-i552.onrender.com/api/items",
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );

        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 695) {
        setItemsPerPage(2);
      } else if (window.innerWidth <= 945) {
        setItemsPerPage(4);
      } else if (window.innerWidth <= 1230) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(8);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = filteredProducts.slice(start, end);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const navigate = useNavigate();
  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search product by name "
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <span className="icon">
          <IoIosSearch />
        </span>
      </div>
      <div className="add-task-btn">
        <p>
          <Link to="/dashboard/add">ADD NEW PRODUCT</Link>
        </p>
      </div>
      <div className="mainProducts">
        {loading ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <div className="cardSkeleton" key={index}>
              <div className="skeletonImage"></div>
              <div className="skeletonTitle"></div>

              <div className="skeletonButtons">
                <div></div>
                <div></div>
              </div>
            </div>
          ))
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="card" key={product.id}>
              <img
                src={product.image_url}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "/task-4-adv2/assets/defaultProduct.png";
                }}
              />

              <div
                className="overlay"
                onClick={() =>
                  navigate(`/dashboard/detailsProduct/${product.id}`)
                }
              >
                <h2>{product.name}</h2>

                <div className="buttons">
                  <button
                    className="editButton"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Link to={`/dashboard/edite/${product.id}`}>Edit</Link>
                  </button>

                  <button
                    className="deleteButton"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPopUp(true);
                      setDeletedTask(product.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
        </button>
        <button
          className={currentPage === 1 ? "activePage" : ""}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>
        {currentPage > 3 && <span>...</span>}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page !== 1 &&
              page !== totalPages &&
              Math.abs(page - currentPage) <= 1,
          )
          .map((page) => (
            <button
              key={page}
              className={currentPage === page ? "activePage" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        {currentPage < totalPages - 2 && <span>...</span>}
        {totalPages > 1 && (
          <button
            className={currentPage === totalPages ? "activePage" : ""}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </button>
        )}
        <button
          onClick={() => setCurrentPage((pre) => Math.min(pre + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward />
        </button>
      </div>
      {showPopUp && (
        <PopUp productId={deletedTask} closePopup={() => setShowPopUp(false)} />
      )}
    </div>
  );
};

export default ReadProducts;
