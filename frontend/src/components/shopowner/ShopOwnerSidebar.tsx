import {
  LayoutDashboard,
  Store,
  Layers,
  Package,
  AlertTriangle,
  Clock,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  Receipt,
  BarChart3,
  Sparkles,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import "./ShopOwnerSidebar.css";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Shop Profile", icon: Store },
  { label: "Products", icon: Layers, badge: "9" },
  { label: "Inventory", icon: Package },
  { label: "Low Stock", icon: AlertTriangle, badge: "2", type: "red" },
  { label: "Expiry Tracking", icon: Clock },
  {
    label: "Farmer Enquiries",
    icon: MessageSquare,
    badge: "2",
    type: "yellow",
  },
  { label: "Orders", icon: ShoppingBag, badge: "2", type: "green" },
  { label: "Sales", icon: TrendingUp },
  { label: "Invoices", icon: Receipt },
  { label: "Demand Forecast", icon: BarChart3, badge: "ML", type: "purple" },
  {
    label: "AI Recommendations",
    icon: Sparkles,
    badge: "AI",
    type: "green",
  },
  { label: "Analytics", icon: TrendingUp },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
];

export default function ShopOwnerSidebar() {
  return (
    <aside className="shop-sidebar">
      <div className="shop-sidebar-header">
        <div>
          <p className="shop-sidebar-brand">AGRI RETAIL PORTAL</p>
          <h2 className="shop-sidebar-user">Kishan Rao</h2>
        </div>

        <span className="shop-sidebar-collapse">‹</span>
      </div>

      <nav className="shop-sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.label}
              className={`shop-sidebar-item ${
                item.active ? "active" : ""
              }`}
            >
              <span className="shop-sidebar-item-left">
                <Icon size={18} strokeWidth={1.8} />

                <span>{item.label}</span>
              </span>

              {item.badge && (
                <span
                  className={`shop-sidebar-badge ${
                    item.type ? `badge-${item.type}` : ""
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="shop-sidebar-footer">
        <button type="button" className="shop-sidebar-item logout-item">
          <span className="shop-sidebar-item-left">
            <LogOut size={18} />
            <span>Logout</span>
          </span>
        </button>
      </div>
    </aside>
  );
}