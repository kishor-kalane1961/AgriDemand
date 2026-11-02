import { useCallback, useEffect, useState } from "react";
import "./FarmerDashboard.css";

import {
  getMyCrops,
  type Crop,
} from "../../services/farmerCropService";

import {
  getMyFarmerProfile,
  type FarmerProfile,
} from "../../services/farmerProfileService";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  unit: string;
  shop: string;
  image: string;
}

interface Order {
  id: string;
  items: string;
  shop: string;
  date: string;
  amount: string;
  status: "Completed" | "Processing" | "Pending";
}

/*
 * DEMO DATA
 *
 * These products and orders are temporary examples.
 * They are not fetched from the database.
 */

const demoProducts: Product[] = [
  {
    id: 1,
    name: "Soybean Seeds (JS-335 Certified)",
    category: "SEEDS",
    price: "₹2,850",
    unit: "bag (30kg)",
    shop: "Demo agricultural shop",
    image: "🌱",
  },
  {
    id: 2,
    name: "IFFCO Neem Coated Urea",
    category: "FERTILIZERS",
    price: "₹266",
    unit: "bag (45kg)",
    shop: "Demo agricultural shop",
    image: "🌿",
  },
  {
    id: 3,
    name: "DAP 18:46:0 Fertilizer",
    category: "FERTILIZERS",
    price: "₹1,350",
    unit: "bag (50kg)",
    shop: "Demo agricultural shop",
    image: "🌾",
  },
];

const demoOrders: Order[] = [
  {
    id: "DEMO-ORDER-101",
    items: "Soybean Seeds and DAP Fertilizer",
    shop: "Demo agricultural shop",
    date: "Example date",
    amount: "₹15,450",
    status: "Completed",
  },
  {
    id: "DEMO-ORDER-102",
    items: "Insecticide",
    shop: "Demo agricultural shop",
    date: "Example date",
    amount: "₹1,780",
    status: "Processing",
  },
  {
    id: "DEMO-ORDER-103",
    items: "Neem Coated Urea",
    shop: "Demo agricultural shop",
    date: "Example date",
    amount: "₹1,596",
    status: "Pending",
  },
];

function getToken(): string | undefined {
  return (
    localStorage.getItem("token") ??
    sessionStorage.getItem("token") ??
    undefined
  );
}

function formatDate(date: string): string {
  if (!date) return "Not specified";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAcres(acres: number): string {
  return `${Number(acres.toFixed(2))} acres`;
}

function getFullAddress(profile: FarmerProfile): string {
  return [
    profile.village,
    profile.district,
    profile.state,
  ]
    .filter(Boolean)
    .join(", ");
}

function FarmerDashboard() {
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);

  const [profileLoading, setProfileLoading] = useState(true);
  const [cropsLoading, setCropsLoading] = useState(true);

  const [profileError, setProfileError] = useState("");
  const [cropsError, setCropsError] = useState("");

  const loadDashboard = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setProfileError(
        "Your login session could not be found. Please sign in again."
      );
      setCropsError(
        "Your login session could not be found. Please sign in again."
      );

      setProfileLoading(false);
      setCropsLoading(false);
      return;
    }

    setProfileLoading(true);
    setCropsLoading(true);

    setProfileError("");
    setCropsError("");

    const profileRequest = getMyFarmerProfile(token)
      .then((data) => {
        setProfile(data);
      })
      .catch((error: unknown) => {
        setProfileError(
          error instanceof Error
            ? error.message
            : "Unable to load farmer profile."
        );
      })
      .finally(() => {
        setProfileLoading(false);
      });

    const cropsRequest = getMyCrops()
      .then((data) => {
        setCrops(data);
      })
      .catch((error: unknown) => {
        setCropsError(
          error instanceof Error
            ? error.message
            : "Unable to load registered crops."
        );
      })
      .finally(() => {
        setCropsLoading(false);
      });

    await Promise.all([profileRequest, cropsRequest]);
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const totalArea = crops.reduce(
    (total, crop) => total + crop.landArea,
    0
  );

  const cropCount = crops.length;

  const products = demoProducts;
  const orders = demoOrders;

  const activeOrders = orders.filter(
    (order) =>
      order.status === "Processing" ||
      order.status === "Pending"
  ).length;

  return (
    <div className="farmer-dashboard">
      {/* Welcome banner */}
      <section className="farmer-welcome">
        <div className="welcome-content">
          <span className="season-badge">
            AgriDemand · Farmer Dashboard
          </span>

          <h1>
            {profileLoading
              ? "Loading your profile..."
              : profile?.fullName
                ? `Namaste, ${profile.fullName}!`
                : "Namaste, Farmer!"}
          </h1>

          <p>
            {profileLoading
              ? "Loading your farm information..."
              : profile
                ? `Your farm in ${
                    getFullAddress(profile) || "your registered location"
                  } has ${formatAcres(profile.landholdingAcres)} of registered land.`
                : "Manage your registered crops and agricultural requirements."}
          </p>

          {!profileLoading && profileError && (
            <p role="alert">
              Profile unavailable: {profileError}
            </p>
          )}

          {!cropsLoading && cropsError && (
            <p role="alert">
              Crop information unavailable: {cropsError}
            </p>
          )}
        </div>

        <div className="welcome-actions">
          <button
            className="button button-light"
            onClick={() => {
              window.location.href = "/farmer/crops";
            }}
          >
            <span>＋</span> Register New Crop
          </button>

          <button
            className="button button-outline"
            onClick={() => {
              window.location.href = "/farmer/products";
            }}
          >
            ▣ Search Inputs
          </button>
        </div>
      </section>

      {/* Statistics */}
      <section className="farmer-stats">
        <article className="stat-card">
          <div className="stat-heading">
            <span>REGISTERED CROPS</span>
            <span className="stat-icon green-icon">♧</span>
          </div>

          <h2>
            {cropsLoading ? "Loading..." : `${cropCount} Crops`}
          </h2>

          <p>
            {cropsLoading
              ? "Retrieving your crops"
              : cropCount > 0
                ? `${formatAcres(totalArea)} registered across your crops`
                : "Register your first crop to get started"}
          </p>
        </article>

        <article className="stat-card">
          <div className="stat-heading">
            <span>PRODUCT SEARCHES</span>
            <span className="stat-icon blue-icon">▣</span>
          </div>

          <h2>Not available</h2>
          <p>Search tracking has not been connected yet.</p>
        </article>

        <article className="stat-card">
          <div className="stat-heading">
            <span>PENDING REQUIREMENTS</span>
            <span className="stat-icon orange-icon">♧</span>
          </div>

          <h2>Not available</h2>
          <p>Requirement tracking has not been connected yet.</p>
        </article>

        <article className="stat-card">
          <div className="stat-heading">
            <span>ACTIVE ORDERS</span>
            <span className="stat-icon purple-icon">⬡</span>
          </div>

          <h2>Not connected</h2>
          <p>Order statistics will appear after backend integration.</p>
        </article>
      </section>

      {/* AI recommendation placeholder */}
      <section className="ai-recommendation">
        <div className="ai-icon">✧</div>

        <div className="ai-content">
          <span className="ai-label">
            AGRIDEMAND · RECOMMENDATION PREVIEW
          </span>

          <h2>
            Crop-Based Agricultural Recommendations
          </h2>

          <p>
            Future recommendations will use your registered crops,
            growth stages, seasonal conditions, and available shop
            inventory. AI-generated predictions are not yet connected
            to this dashboard.
          </p>
        </div>

        <div className="ai-actions">
          <button
            className="button ai-button-secondary"
            onClick={() => {
              window.location.href = "/farmer/products";
            }}
          >
            View Products
          </button>

          <button
            className="button ai-button-primary"
            onClick={() => {
              window.location.href = "/farmer/ai-insights";
            }}
          >
            View AI Insights
          </button>
        </div>
      </section>

      {/* Crops and products */}
      <section className="dashboard-grid">
        <div className="crops-section">
          <div className="section-heading">
            <div>
              <h2>My Registered Crops</h2>
              <p>
                Crop growth stages, registered acreage, and harvest dates
              </p>
            </div>

            <a href="/farmer/crops">
              Manage All Crops →
            </a>
          </div>

          {cropsLoading ? (
            <p role="status">Loading your registered crops...</p>
          ) : cropsError ? (
            <div role="alert">
              <p>Unable to retrieve your crops.</p>
              <button
                className="button"
                onClick={() => void loadDashboard()}
              >
                Retry
              </button>
            </div>
          ) : crops.length === 0 ? (
            <div className="crop-list">
              <article className="crop-card">
                <h3>No crops registered yet</h3>
                <p>
                  Add your first crop to see your farm information here.
                </p>
                <a href="/farmer/crops">
                  Register a Crop →
                </a>
              </article>
            </div>
          ) : (
            <div className="crop-list">
              {crops.map((crop) => (
                <article className="crop-card" key={crop.id}>
                  <div className="crop-card-top">
                    <span className="crop-season">
                      {crop.season.toUpperCase()} SEASON
                    </span>

                    <span className="crop-stage">
                      <span className="stage-dot" />
                      {crop.stage}
                    </span>
                  </div>

                  <h3>{crop.name}</h3>

                  <p className="crop-variety">
                    {crop.variety}
                  </p>

                  <div className="crop-details">
                    <div>
                      <span>Area:</span>
                      <strong>
                        {formatAcres(crop.landArea)}
                      </strong>
                    </div>

                    <div>
                      <span>Planted:</span>
                      <strong>
                        {formatDate(crop.sowingDate)}
                      </strong>
                    </div>

                    <div>
                      <span>Expected Harvest:</span>
                      <strong className="harvest-date">
                        {formatDate(crop.expectedHarvest)}
                      </strong>
                    </div>
                  </div>

                  <div className="crop-card-footer">
                    <span>
                      Health: {crop.health}
                    </span>

                    <a href="/farmer/crops">
                      View Details →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="products-section">
          <div className="section-heading">
            <div>
              <h2>Recommended Products</h2>
              <p>
                Example products · Marketplace integration pending
              </p>
            </div>

            <a href="/farmer/products">
              Marketplace →
            </a>
          </div>

          <div className="recommended-products">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image" aria-hidden="true">
                  {product.image}
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <p>
                    <strong>{product.price}</strong>
                    <span> /{product.unit}</span>
                  </p>

                  <small>
                    ⌂ {product.shop}
                  </small>
                </div>

                <button
                  className="product-button"
                  onClick={() => {
                    window.location.href = "/farmer/products";
                  }}
                >
                  View Details
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recent orders demo */}
      <section className="recent-orders">
        <div className="section-heading">
          <div>
            <h2>Recent Orders</h2>
            <p>
              Example orders · Live order tracking is not connected
            </p>
          </div>

          <a href="/farmer/orders">
            View Orders →
          </a>
        </div>

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Items</th>
                <th>Agri Shop</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">
                    {order.id}
                  </td>

                  <td>{order.items}</td>
                  <td>{order.shop}</td>
                  <td>{order.date}</td>

                  <td className="order-amount">
                    {order.amount}
                  </td>

                  <td>
                    <span
                      className={`order-status status-${order.status.toLowerCase()}`}
                    >
                      <span className="stage-dot" />
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <a
                      className="track-order"
                      href="/farmer/orders"
                    >
                      View Orders →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="dashboard-footer">
        AgriDemand · Smart Farming Management
      </footer>
    </div>
  );
}

export default FarmerDashboard;