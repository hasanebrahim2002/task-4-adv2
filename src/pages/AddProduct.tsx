import { useEffect, useState } from "react";
import CrudForm from "../components/CrudForm/CrudForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface CrudData {
  name: string;
  price: string;
  image: Blob | null;
}
const AddProduct = () => {
  const [data, setData] = useState<CrudData>({
    name: "",
    price: "",
    image: null,
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    const createItem = async () => {
      if (!submit) return;
      try {
        setLoading(true);

        await axios.post(
          "https://dashboard-i552.onrender.com/api/items",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
              Accept: "application/json",
            },
          },
        );

        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    createItem();
  }, [submit, navigate, data]);
  return (
    <CrudForm
      titleCrud="ADD NEW ITEM"
      submitCrud="Save"
      inputsCrud={[
        {
          name: "name",
          type: "text",
          placholder: "Enter the product name",
          content: "Name",
        },
        {
          name: "price",
          type: "text",
          placholder: "Enter the product price",
          content: "Price",
        },
        {
          name: "image",
          type: "file",
          content: "Image",
        },
      ]}
      setData={setData}
      setSubmit={setSubmit}
      loading={loading}
    />
  );
};

export default AddProduct;
