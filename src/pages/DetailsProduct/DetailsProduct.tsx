import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import "./DetailsProduct.css";
interface DetailsProduct {
  created_at: string;
  id: number;
  image_url: string;
  name: string;
  price: string;
  updated_at: string;
}
const DetailsProduct = () => {
  const [dataOfProduct, setDataOfProduct] = useState<DetailsProduct>();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://dashboard-i552.onrender.com/api/items/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setDataOfProduct(res.data));
  }, [id]);
  return (
    <>
      <div className="mainDetails">
        <Link to="/dashboard" className="backDetails">
          <IoIosArrowBack />
        </Link>
        <h1 className="nameDetails">{dataOfProduct?.name}</h1>
        <div className="imgDetails">
          <img
            src={dataOfProduct?.image_url}
            onError={(e) => {
              e.currentTarget.src = "/task-4-adv2/assets/defaultProduct.png";
            }}
            alt=""
          />
        </div>
        <div className="detailsInfo">
          <h1>
            price: <span> {dataOfProduct?.price}$</span>
          </h1>
          <h1>
            Added at: <span>{dataOfProduct?.updated_at.split("T")[0]}</span>
          </h1>
          <h1>
            updated at: <span> {dataOfProduct?.updated_at.split("T")[0]}</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default DetailsProduct;
