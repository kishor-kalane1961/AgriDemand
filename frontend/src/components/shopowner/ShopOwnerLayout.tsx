import type { ReactNode } from "react";
import ShopOwnerSidebar from "./ShopOwnerSidebar";
import "./ShopOwnerLayout.css";

interface ShopOwnerLayoutProps {
  children: ReactNode;
}

export default function ShopOwnerLayout({
  children,
}: ShopOwnerLayoutProps) {
  return (
    <div className="shop-owner-layout">
      {/* Full-width top navbar */}
      <header className="shop-top-navbar">
        <div className="shop-navbar-brand">
          <h2>
            AgriDemand <span>AI</span>
          </h2>
          <p>Smart Demand Intelligence</p>
        </div>

        <nav className="shop-navbar-links">
          <a href="/">Home</a>
          <a href="/#features">Features</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </nav>

        <div className="shop-navbar-actions">
          <a href="/login" className="shop-login-link">
            Login
          </a>
          <a href="/register" className="shop-get-started">
            Get Started
          </a>
        </div>
      </header>

      {/* Sidebar starts below navbar */}
      <ShopOwnerSidebar />

      {/* Dashboard content */}
      <main className="shop-owner-main">{children}</main>
    </div>
  );
}