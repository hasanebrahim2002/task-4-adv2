import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidBar from "../components/SidBar/SidBar";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { LuBoxes } from "react-icons/lu";
const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div
      className="dash"
      style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}
    >
      <SidBar
        links={[
          {
            content: "Products",
            path: "/dashboard",
            icon: <LuBoxes />,
          },
          {
            content: "Favorites",
            path: "/",
            icon: <MdOutlineBookmarkBorder />,
          },
          {
            content: "order list",
            path: "/",
            icon: <MdOutlineBookmarkBorder />,
          },
        ]}
      />
      <Outlet />
    </div>
  );
};

export default Dashboard;
