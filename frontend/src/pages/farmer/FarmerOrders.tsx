import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerOrders.css";

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Ready"
  | "Completed"
  | "Cancelled";

interface Order {
  id: string;
  items: string[];
  shop: string;
  date: string;
  deliveryType: "Direct Farm Delivery" | "Shop Pickup";
  amount: number;
  status: OrderStatus;
}

const initialOrders: Order[] = [
  {
    id: "AGRI-ORD-2026-934",
    items: ["UPL Saaf Fungicide (Carbendazim 12% + Mancozeb 63% WP) (2 pack (500g))"],
    shop: "Kisan Krishi Seva Kendra",
    date: "2026-10-19",
    deliveryType: "Direct Farm Delivery",
    amount: 860,
    status: "Pending",
  },
  {
    id: "AGRI-ORD-2026-101",
    items: [
      "Soybean Seeds (JS-335 Certified) (4 bag (30kg))",
      "DAP 18:46:0 Fertilizer (IFFCO) (3 bag (50kg))",
    ],
    shop: "Kisan Krishi Seva Kendra",
    date: "2026-06-18",
    deliveryType: "Shop Pickup",
    amount: 15450,
    status: "Completed",
  },
  {
    id: "AGRI-ORD-2026-102",
    items: ["Bayer Confidor Insecticide (250ml) (2 bottle (250ml))"],
    shop: "Kisan Krishi Seva Kendra",
    date: "2026-07-02",
    deliveryType: "Direct Farm Delivery",
    amount: 1780,
    status: "Processing",
  },
  {
    id: "AGRI-ORD-2026-103",
    items: ["IFFCO Neem Coated Urea (6 bag (45kg))"],
    shop: "Kisan Krishi Seva Kendra",
    date: "2026-07-08",
    deliveryType: "Shop Pickup",
    amount: 1596,
    status: "Pending",
  },
];

const statuses = [
  "All",
  "Pending",
  "Confirmed",
  "Processing",
  "Ready",
  "Completed",
  "Cancelled",
] as const;

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const FarmerOrders = () => {
  const navigate = useNavigate();

  const [orders] = useState<Order[]>(initialOrders);
  const [activeStatus, setActiveStatus] =
    useState<(typeof statuses)[number]>("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    if (activeStatus === "All") {
      return orders;
    }

    return orders.filter((order) => order.status === activeStatus);
  }, [orders, activeStatus]);

  return (
    <div className="farmer-orders-page">
      <div className="orders-breadcrumb">
        <button type="button" onClick={() => navigate("/")}>
          Home
        </button>
        <span>›</span>
        <span>Farmer</span>
        <span>›</span>
        <strong>Orders</strong>
      </div>

      <header className="orders-header">
        <div>
          <h1>My Orders &amp; Dispatches</h1>
          <p>
            Track the status and delivery progress of your agricultural input
            orders.
          </p>
        </div>

        <button
          type="button"
          className="orders-marketplace-button"
          onClick={() => navigate("/farmer/products")}
        >
          <span aria-hidden="true">▣</span>
          Browse Marketplace
        </button>
      </header>

      <div className="orders-status-filters" aria-label="Filter orders by status">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            className={activeStatus === status ? "selected" : ""}
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <section className="orders-table-card">
        {filteredOrders.length > 0 ? (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Agri Shop</th>
                  <th>Date</th>
                  <th>Delivery Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className="orders-id">
                        {order.id}
                      </span>
                    </td>

                    <td>
                      <div className="orders-items">
                        {order.items.map((item, index) => (
                          <div key={`${order.id}-${index}`}>{item}</div>
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="orders-shop">
                        <span aria-hidden="true">♙</span>
                        {order.shop}
                      </div>
                    </td>

                    <td className="orders-date">{order.date}</td>

                    <td>{order.deliveryType}</td>

                    <td className="orders-amount">
                      {formatPrice(order.amount)}
                    </td>

                    <td>
                      <span
                        className={`orders-status status-${order.status.toLowerCase()}`}
                      >
                        <span className="orders-status-dot" />
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="orders-track-button"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Track <span aria-hidden="true">›</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="orders-empty-state">
            <span className="orders-empty-icon" aria-hidden="true">
              ▣
            </span>
            <h2>No {activeStatus.toLowerCase()} orders</h2>
            <p>
              Orders matching this status will appear here when available.
            </p>
            <button
              type="button"
              onClick={() => setActiveStatus("All")}
            >
              View All Orders
            </button>
          </div>
        )}
      </section>

      {selectedOrder && (
        <div
          className="orders-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedOrder(null);
            }
          }}
        >
          <section
            className="orders-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
          >
            <button
              type="button"
              className="orders-modal-close"
              aria-label="Close order details"
              onClick={() => setSelectedOrder(null)}
            >
              ×
            </button>

            <span className="orders-modal-eyebrow">ORDER DETAILS</span>

            <h2 id="order-modal-title">Track Your Order</h2>

            <p className="orders-modal-id">{selectedOrder.id}</p>

            <div className="orders-modal-status">
              <span
                className={`orders-status status-${selectedOrder.status.toLowerCase()}`}
              >
                <span className="orders-status-dot" />
                {selectedOrder.status}
              </span>
            </div>

            <div className="orders-modal-section">
              <h3>Items Ordered</h3>
              {selectedOrder.items.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            <div className="orders-modal-section">
              <h3>Delivery Information</h3>
              <p>
                <strong>Agri Shop:</strong> {selectedOrder.shop}
              </p>
              <p>
                <strong>Order Date:</strong> {selectedOrder.date}
              </p>
              <p>
                <strong>Delivery Type:</strong> {selectedOrder.deliveryType}
              </p>
              <p>
                <strong>Order Amount:</strong>{" "}
                {formatPrice(selectedOrder.amount)}
              </p>
            </div>

            <p className="orders-tracking-note">
              This page currently displays sample order information. Live
              dispatch updates will be available after connecting the orders
              API.
            </p>

            <button
              type="button"
              className="orders-modal-done"
              onClick={() => setSelectedOrder(null)}
            >
              Close Details
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;