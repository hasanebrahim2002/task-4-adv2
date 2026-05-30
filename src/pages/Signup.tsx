import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";
import { useEffect, useState } from "react";
import axios from "axios";
export interface RegisterData {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  profile_image: Blob | null;
}
const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<RegisterData>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const registerUser = async () => {
      const newData = {
        ...data,
        user_name: data.email.split("@")[0],
      };

      if (data.first_name === "") return;

      try {
        setLoading(true);

        console.log(newData);

        const res = await axios.post(
          "https://dashboard-i552.onrender.com/api/register",
          newData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          },
        );

        localStorage.setItem("token", `Bearer ${res.data.data.token}`);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));

        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    registerUser();
  }, [data, navigate]);
  return (
    <div className="auth-flex">
      <Form<RegisterData>
        logo="/task-4-adv2/assets/Logo.png"
        title="Sign up"
        paraTitle="Fill in the following fields to create an account."
        inputs={[
          {
            label: "Name",
            name: "first_name",
            type: "text",
            placeholder: "First Name",
          },
          {
            name: "last_name",
            type: "text",
            placeholder: "Last Name",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
          },
          {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Enter password",
          },
          {
            name: "password_confirmation",
            type: "password",
            placeholder: "Re-enter your password",
          },
          {
            label: "Profile Image",
            name: "profile_image",
            type: "file",
          },
        ]}
        submit="SIGN UP"
        initialData={{
          first_name: "",
          last_name: "",
          user_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          profile_image: null,
        }}
        className="signup"
        setData={setData}
        loading={loading}
      />
      <p>
        Do you have an account? <Link to="/">Sign in</Link>
      </p>
    </div>
  );
};

export default Signup;
