import { useEffect, useState } from "react";
import CrudForm from "../components/CrudForm/CrudForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
interface CrudData {
  name: string;
  price: string;
  image: Blob | null;
}
interface product {
  created_at: string;
  id: number;
  image_url: string;
  name: string;
  price: string;
  updated_at: string;
}
const EditeProduct = () => {
  const [oldData, setOldData] = useState<product>({
    created_at: "",
    id: 0,
    image_url: "",
    name: "",
    price: "",
    updated_at: "",
  });
  const { id } = useParams();
  const [data, setData] = useState<CrudData>({
    name: "",
    price: "",
    image: null,
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://dashboard-i552.onrender.com/api/items/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              Accept: "application/json",
            },
          },
        );

        setOldData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);
  useEffect(() => {
    const updateItem = async () => {
      if (!submit) return;

      try {
        setLoading(true);

        const newData = {
          name: data.name ? data.name : oldData.name,
          price: data.price ? data.price : oldData.price,
          image: data.image ? data.image : null,
          _method: "PUT",
        };

        await axios.post(
          `https://dashboard-i552.onrender.com/api/items/${id}`,
          newData,
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

    updateItem();
  }, [
    submit,
    id,
    navigate,
    data.image,
    data.name,
    data.price,
    oldData.name,
    oldData.price,
  ]);
  return (
    <CrudForm
      titleCrud="EDIT ITEM"
      submitCrud="Save"
      inputsCrud={[
        {
          name: "name",
          type: "text",
          placholder: "Enter the product name",
          content: "Name",
          value: oldData.name,
        },
        {
          name: "price",
          type: "text",
          placholder: "Enter the product price",
          content: "Price",
          value: oldData.price,
        },
        {
          name: "image",
          type: "file",
          content: "Image",
          value: oldData.image_url,
        },
      ]}
      setData={setData}
      setSubmit={setSubmit}
      loading={loading}
    />
  );
};

export default EditeProduct;
