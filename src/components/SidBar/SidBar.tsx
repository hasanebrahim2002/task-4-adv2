import { Link, NavLink, useNavigate } from "react-router-dom";
import "./SidBar.css";
import type { ReactElement } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
interface Link {
  content: string;
  path: string;
  icon: ReactElement;
}
interface SidebarProps {
  links: Array<Link>;
}
const SidBar = ({ links }: SidebarProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user);
  const navigate = useNavigate();
  function logout() {
    axios
      .post(
        "https://dashboard-i552.onrender.com/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application.json",
          },
        },
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      });
  }
  return (
    <div className="sidebar">
      <div className="sidebarImg">
        <img src="/dashboard-s/assets/Logo.png" alt="" />
      </div>
      <div className="personInfo">
        <div className="sidbarImgPerson">
          <img
            src={user.profile_image_url}
            onError={(e) => {
              e.currentTarget.src = "/dashboard-s/assets/person.jpg";
            }}
            alt=""
          />
        </div>
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
        <div className="links">
          {links.map((link, index) => {
            return (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.icon}
                {link.content}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="logout" onClick={logout}>
        Logout <FaSignOutAlt />
      </div>
    </div>
  );
};

export default SidBar;
