import axios from "axios";
import "./Auth/AuthRoot.css";
import Form from "../components/Form/Form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface FormData {
  email: string;
  password: string;
}
const SignIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loginUser = async () => {
      if (data.email === "") return;

      try {
        setLoading(true);

        const res = await axios.post(
          "https://dashboard-i552.onrender.com/api/login",
          data,
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        localStorage.setItem("token", `Bearer ${res.data.token}`);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loginUser();
  }, [data, navigate]);
  return (
    <div className="auth-flex">
      <Form<FormData>
        logo="/task-4-adv2/assets/Logo.png"
        title="Sign In"
        paraTitle="Enter your credentials to access your account"
        inputs={[
          {
            label: "Email",
            name: "email",
            placeholder: "Enter your email",
            type: "email",
          },
          {
            label: "Password",
            name: "password",
            placeholder: "Enter your password",
            type: "password",
          },
        ]}
        submit="SIGN IN"
        initialData={{
          email: "",
          password: "",
        }}
        className="signin"
        setData={setData}
        loading={loading}
      />
      <p>
        Don’t have an account? <Link to="/signup">Create one</Link>
      </p>
    </div>
  );
};

export default SignIn;
