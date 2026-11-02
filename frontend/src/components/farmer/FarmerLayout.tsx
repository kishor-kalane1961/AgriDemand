import type { ReactNode } from "react";
import FarmerSidebar from "./FarmerSidebar";
import "./FarmerLayout.css";

interface FarmerLayoutProps {
  children: ReactNode;
}

const FarmerLayout = ({ children }: FarmerLayoutProps) => {
  return (
    <div className="farmer-layout">
      <FarmerSidebar />

      <main className="farmer-main">
        <div className="farmer-content">{children}</div>
      </main>
    </div>
  );
};

export default FarmerLayout;