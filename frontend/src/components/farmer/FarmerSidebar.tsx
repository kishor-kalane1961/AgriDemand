import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./FarmerLayout.css";

import { getMyFarmerProfile } from "../../services/farmerProfileService";

const menuItems = [
  { label: "Dashboard", path: "/farmer/dashboard", icon: "▦" },
  { label: "My Profile", path: "/farmer/profile", icon: "♙" },
  { label: "My Crops", path: "/farmer/crops", icon: "♧" },
  { label: "Products", path: "/farmer/products", icon: "▣" },
  { label: "Orders", path: "/farmer/orders", icon: "⬡" },
  {
    label: "AI Insights",
    path: "/farmer/ai-insights",
    icon: "✧",
    badge: "New",
  },
  { label: "Notifications", path: "/farmer/notifications", icon: "♧" },
  { label: "Settings", path: "/farmer/settings", icon: "⚙" },
];

const FarmerSidebar = () => {
  const [farmerName, setFarmerName] = useState("Farmer");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadFarmerProfile = async () => {
      try {
        const token =
          localStorage.getItem("token") ??
          sessionStorage.getItem("token") ??
          undefined;

        const profile = await getMyFarmerProfile(token);

        if (isMounted) {
          setFarmerName(profile.fullName?.trim() || "Farmer");
        }
      } catch (error) {
        console.error("Failed to load farmer profile:", error);
      }
    };

    loadFarmerProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <aside
      className={`farmer-sidebar ${
        sidebarCollapsed ? "collapsed" : ""
      }`}
    >
      {/* Sidebar header */}
      <div className="farmer-sidebar-header">
        <div>
          <span className="farmer-portal-label">FARMER PORTAL</span>
          {!sidebarCollapsed && <h3>{farmerName}</h3>}
        </div>

        <button
          type="button"
          className="sidebar-collapse-button"
          aria-label={
            sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
          aria-expanded={!sidebarCollapsed}
          onClick={() => setSidebarCollapsed((previous) => !previous)}
        >
          {sidebarCollapsed ? "›" : "‹"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="farmer-navigation" aria-label="Farmer navigation">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={sidebarCollapsed ? item.label : undefined}
            className={({ isActive }) =>
              `farmer-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="farmer-nav-icon" aria-hidden="true">
              {item.icon}
            </span>

            {!sidebarCollapsed && (
              <span className="farmer-nav-label">{item.label}</span>
            )}

            {!sidebarCollapsed && item.badge && (
              <span className="farmer-nav-badge">{item.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="farmer-sidebar-footer">
        <button
          type="button"
          className="farmer-logout-button"
          onClick={() => {
            // Connect this to your existing logout function.
            console.log("Logout clicked");
          }}
        >
          <span aria-hidden="true">⇥</span>
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default FarmerSidebar;