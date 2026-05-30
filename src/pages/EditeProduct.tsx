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
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://dashboard-i552.onrender.com/api/items/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          Accept: "application/json",
        },
      })
      .then((res) => setOldData(res.data));
  }, [id]);
  useEffect(() => {
    if (submit) {
      const newData = {
        name: data.name ? data.name : oldData.name,
        price: data.price ? data.price : oldData.price,
        image: data.image ? data.image : null,
        _method: "PUT",
      };
      axios
        .post(`https://dashboard-i552.onrender.com/api/items/${id}`, newData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
          },
        })
        .then(() => {
          navigate("/dashboard");
        });
      console.log(newData);
    }
  }, [
    submit,
    data.image,
    data.name,
    data.price,
    id,
    navigate,
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
    />
  );
};

export default EditeProduct;
