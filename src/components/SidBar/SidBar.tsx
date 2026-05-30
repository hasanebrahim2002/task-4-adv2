import { NavLink, useNavigate } from "react-router-dom";
import "./SidBar.css";
import type { ReactElement } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

interface Link {
  content: string;
  path: string;
  icon: ReactElement;
}

interface SidebarProps {
  links: Array<Link>;
}

const SidBar = ({ links }: SidebarProps) => {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
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
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      });
  }

  return (
    <>
      <div className={`sidebar ${open ? "open" : ""}`}>
        <button className="sidebarToggle" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <div className="sidebarImg">
          <img src="/task-4-adv2/assets/Logo.png" alt="" />
        </div>

        <div className="personInfo">
          <div className="sidbarImgPerson">
            <img
              src={user.profile_image_url}
              onError={(e) => {
                e.currentTarget.src = "/task-4-adv2/assets/person.jpg";
              }}
              alt=""
            />
          </div>

          <h2>{`${user.first_name} ${user.last_name}`}</h2>

          <div className="links">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.icon}
                {link.content}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="logout" onClick={logout}>
          Logout <FaSignOutAlt />
        </div>
      </div>
    </>
  );
};

export default SidBar;
