import ShopOwnerLayout from "../../components/shopowner/ShopOwnerLayout";
import "./ShopOwnerDashboard.css";

const stats = [
  {
    title: "TOTAL PRODUCTS",
    value: "9",
    subtitle: "Active catalog SKUs",
    icon: "▱",
    color: "blue",
  },
  {
    title: "STOCK VALUE",
    value: "₹8.0L",
    subtitle: "Warehouse & counter inventory",
    icon: "⬡",
    color: "green",
  },
  {
    title: "LOW STOCK ITEMS",
    value: "2",
    subtitle: "Action required",
    icon: "⚠",
    color: "red",
  },
  {
    title: "PENDING ORDERS",
    value: "2",
    subtitle: "Awaiting shop dispatch",
    icon: "⬡",
    color: "orange",
  },
  {
    title: "MONTHLY SALES",
    value: "₹4.9L",
    subtitle: "↗ +18.4%",
    icon: "↗",
    color: "teal",
  },
  {
    title: "DEMAND INDEX",
    value: "+42.5%",
    subtitle: "Early crop signal surge",
    icon: "✧",
    color: "purple",
  },
];

const historicalSales = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 65 },
  { month: "Mar", value: 90 },
  { month: "Apr", value: 140 },
  { month: "May", value: 220 },
  { month: "Jun (Actual)", value: 310 },
];

const forecastSales = [
  { month: "Jun (Actual)", value: 310 },
  { month: "Jul (ML)", value: 385 },
  { month: "Aug (ML)", value: 240 },
  { month: "Sep (ML)", value: 110 },
];

const categories = [
  { name: "Fertilizers (Urea / DAP / NPK)", amount: "₹2,45,000", width: 100, color: "green" },
  { name: "Certified Seeds (Soybean / Cotton)", amount: "₹1,68,000", width: 69, color: "teal" },
  { name: "Pesticides & Fungicides", amount: "₹58,000", width: 25, color: "blue" },
  { name: "Equipment & Sprayers", amount: "₹15,500", width: 6, color: "orange" },
];

const recommendations = [
  {
    badge: "High Early Demand Signal",
    accuracy: "93% Accuracy",
    title: "High Demand Surge Alert — Soybean Seeds",
    description:
      "184 farmers in Baramati taluka registered 820+ acres of soybean cultivation in the past 21 days. Seed searches in your 15km radius grew by +58%.",
    action: "Increase procurement order for soybean seeds.",
    type: "purple",
  },
  {
    badge: "Stock-out Risk within 6 Days",
    accuracy: "91% Accuracy",
    title: "Critical Restock Alert — Neem Coated Urea",
    description:
      "Current stock is only 28 bags against a minimum threshold of 50 bags. Active farmer growth-stage progression indicates increased nitrogen top-dressing demand.",
    action: "Place an indent with your local fertilizer supplier.",
    type: "red",
  },
  {
    badge: "Demand Leveling Off",
    accuracy: "84% Accuracy",
    title: "Seasonal Demand Moderation — Biozyme Growth Regulator",
    description:
      "Basal sowing bio-stimulant inquiries dropped by 22% as farmers shifted focus to early pest mitigation and weeding.",
    action: "Review the next procurement order before placing it.",
    type: "gray",
  },
];

function ForecastChart() {
  const chartWidth = 1000;
  const chartHeight = 300;
  const left = 55;
  const right = 25;
  const top = 20;
  const bottom = 42;

  const plotWidth = chartWidth - left - right;
  const plotHeight = chartHeight - top - bottom;
  const maxValue = 400;

  const x = (index: number) =>
    left + (index / 8) * plotWidth;

  const y = (value: number) =>
    top + plotHeight - (value / maxValue) * plotHeight;

  const actualPoints = historicalSales
    .map((point, index) => `${x(index)},${y(point.value)}`)
    .join(" ");

  const forecastPoints = forecastSales
    .map((point, index) => `${x(index + 5)},${y(point.value)}`)
    .join(" ");

  const actualArea = [
    `${x(0)},${y(0)}`,
    ...historicalSales.map(
      (point, index) => `${x(index)},${y(point.value)}`
    ),
    `${x(5)},${y(0)}`,
  ].join(" ");

  const forecastArea = [
    `${x(5)},${y(0)}`,
    ...forecastSales.map(
      (point, index) => `${x(index + 5)},${y(point.value)}`
    ),
    `${x(8)},${y(0)}`,
  ].join(" ");

  return (
    <div className="forecast-chart">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="forecast-svg"
        role="img"
        aria-label="Historical soybean seed sales and illustrative machine learning demand forecast"
      >
        <defs>
          <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.01" />
          </linearGradient>

          <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {[0, 100, 200, 300, 400].map((value) => (
          <g key={value}>
            <line
              x1={left}
              y1={y(value)}
              x2={chartWidth - right}
              y2={y(value)}
              stroke="#dbe5f1"
              strokeDasharray="5 5"
              strokeWidth="1.5"
            />

            <text
              x={left - 14}
              y={y(value) + 5}
              fill="#94a3b8"
              textAnchor="end"
              fontSize="15"
            >
              {value}
            </text>
          </g>
        ))}

        <polygon points={actualArea} fill="url(#actualFill)" />
        <polygon points={forecastArea} fill="url(#forecastFill)" />

        <line
          x1={x(5)}
          y1={top}
          x2={x(5)}
          y2={chartHeight - bottom}
          stroke="#94a3b8"
          strokeDasharray="4 4"
          strokeWidth="2"
        />

        <text
          x={x(5)}
          y={top - 2}
          textAnchor="middle"
          fill="#64748b"
          fontSize="15"
        >
          Today
        </text>

        <polyline
          points={actualPoints}
          fill="none"
          stroke="#16a34a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <polyline
          points={forecastPoints}
          fill="none"
          stroke="#9333ea"
          strokeWidth="4"
          strokeDasharray="9 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {historicalSales.map((point, index) => (
          <circle
            key={point.month}
            cx={x(index)}
            cy={y(point.value)}
            r="7"
            fill="#16a34a"
            stroke="#ffffff"
            strokeWidth="3"
          />
        ))}

        {forecastSales.slice(1).map((point, index) => (
          <circle
            key={point.month}
            cx={x(index + 6)}
            cy={y(point.value)}
            r="7"
            fill="#9333ea"
            stroke="#ffffff"
            strokeWidth="3"
          />
        ))}

        {[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun (Actual)",
          "Jul (ML)",
          "Aug (ML)",
          "Sep (ML)",
        ].map((month, index) => (
          <text
            key={month}
            x={x(index)}
            y={chartHeight - 12}
            fill={index > 5 ? "#9333ea" : "#475569"}
            textAnchor="middle"
            fontSize="14"
            fontWeight={index > 5 ? "600" : "400"}
          >
            {month}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function ShopOwnerDashboard() {
  return (
    <ShopOwnerLayout>
      <div className="shop-dashboard">
        <div className="shop-breadcrumb">
          <span>Home</span>
          <span>›</span>
          <span>Shop</span>
          <span>›</span>
          <strong>Dashboard</strong>
        </div>

        <section className="shop-hero">
          <div className="shop-hero-content">
            <div className="shop-hero-badges">
              <span className="dealer-id">
                Dealer ID: MH/PUN/AGR/2021/8849
              </span>

              <span className="verified-badge">
                <span className="verified-dot" />
                VERIFIED
              </span>
            </div>

            <h1>Kishan Krishi Seva Kendra</h1>

            <p>
              Proprietor: Kishan Rao · APMC Market Yard, Baramati
            </p>
          </div>

          <div className="shop-hero-actions">
            <button className="shop-button shop-button-primary">
              <span>＋</span> Add New Product
            </button>

            <button className="shop-button shop-button-purple">
              <span>▥</span> ML Demand Forecast
            </button>
          </div>
        </section>

        <section className="shop-stats-grid">
          {stats.map((stat) => (
            <article className="shop-stat-card" key={stat.title}>
              <div className="shop-stat-top">
                <span className="shop-stat-title">{stat.title}</span>

                <span className={`shop-stat-icon ${stat.color}`}>
                  {stat.icon}
                </span>
              </div>

              <h2>{stat.value}</h2>

              <p
                className={
                  stat.color === "red" || stat.color === "teal"
                    ? stat.color
                    : ""
                }
              >
                {stat.subtitle}
              </p>
            </article>
          ))}
        </section>

        <section className="forecast-section">
          <div className="forecast-heading">
            <div>
              <span className="forecast-eyebrow">
                ✧ FLAGSHIP MACHINE LEARNING INTELLIGENCE
              </span>

              <h2>
                Soybean Seed (JS-335) Demand Forecast vs Historical Sales
              </h2>
            </div>

            <button className="forecast-studio-button">
              Open Multi-Product Forecast Studio →
            </button>
          </div>

          <article className="dashboard-panel forecast-panel">
            <div className="forecast-panel-heading">
              <div>
                <h3>
                  Soybean Seeds JS-335 Certified — Demand Trajectory Analysis
                </h3>

                <p>
                  Solid line: Actual counter sales. Dashed line: AI forecast
                  driven by registered farmer crop acreage.
                </p>
              </div>

              <div className="forecast-legend">
                <span>
                  <i className="legend-line actual" />
                  Historical Sales
                </span>

                <span>
                  <i className="legend-line predicted" />
                  ML Forecast
                </span>
              </div>
            </div>

            <ForecastChart />

            <div className="forecast-footer">
              <span>
                ↗ Predicted July peak: <strong>385 units (+24.1% vs June)</strong>
              </span>

              <span>Model: AgriDemand-RF-v2.4 · Illustrative confidence: 93%</span>
            </div>
          </article>
        </section>

        <section className="dashboard-bottom-grid">
          <div className="recommendations-section">
            <div className="section-heading">
              <div>
                <h2>AI Inventory Recommendations</h2>
                <p>Early signals from 184 registered farmers in 15km radius</p>
              </div>

              <button className="text-action">View All Alerts (4) →</button>
            </div>

            {recommendations.map((item) => (
              <article className="dashboard-panel recommendation-card" key={item.title}>
                <div className="recommendation-top">
                  <span className={`recommendation-badge ${item.type}`}>
                    {item.badge}
                  </span>

                  <span className="accuracy-badge">{item.accuracy}</span>
                </div>

                <h3>{item.title}</h3>

                <p className="recommendation-description">
                  {item.description}
                </p>

                <div className="recommendation-footer">
                  <span>
                    <strong>Action:</strong> {item.action}
                  </span>

                  <button className="update-inventory-button">
                    Update Inventory
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="dashboard-right-column">
            <article className="dashboard-panel category-panel">
              <h2>Category Sales Breakdown</h2>

              {categories.map((category) => (
                <div className="category-item" key={category.name}>
                  <div className="category-label">
                    <span>{category.name}</span>
                    <strong>{category.amount}</strong>
                  </div>

                  <div className="category-track">
                    <div
                      className={`category-bar ${category.color}`}
                      style={{ width: `${category.width}%` }}
                    />
                  </div>
                </div>
              ))}
            </article>

            <article className="dashboard-panel restock-panel">
              <div className="restock-heading">
                <h2>Immediate Restock Queue</h2>
                <button className="restock-link">View Low Stock →</button>
              </div>

              <div className="restock-item">
                <div>
                  <strong>IFFCO Neem Coated Urea</strong>
                  <p>
                    Current: <span>28 bags (45kg)</span> (Min: 50)
                  </p>
                </div>

                <button className="restock-button">Restock</button>
              </div>

              <div className="restock-item">
                <div>
                  <strong>Coromandel Gromor 28-28-0 Complex</strong>
                  <p>
                    Current: <span>12 bags (50kg)</span> (Min: 30)
                  </p>
                </div>

                <button className="restock-button">Restock</button>
              </div>
            </article>
          </div>
        </section>
      </div>
    </ShopOwnerLayout>
  );
}