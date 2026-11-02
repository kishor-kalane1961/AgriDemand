import { useNavigate } from "react-router-dom";
import "./FarmerAIInsights.css";

interface CropRecommendation {
  crop: string;
  confidence: number;
  title: string;
  stage: string;
  explanation: string;
  timing: string;
  demand: string;
  product: string;
  productPath: string;
}

const recommendations: CropRecommendation[] = [
  {
    crop: "SOYBEAN (JS-335)",
    confidence: 94,
    title: "Soybean (Vegetative Stage) — Foliar Micro-Nutrient Boost",
    stage: "Vegetative (Day 25–35)",
    explanation:
      "Based on the registered soybean crop and local soil profile, review crop nutrient requirements and soil conditions before selecting a suitable micronutrient product.",
    timing: "Review within the next 7 days",
    demand: "High Local Demand (+38%)",
    product: "Coromandel Gromor Micronutrient",
    productPath: "/farmer/products",
  },
  {
    crop: "BT COTTON",
    confidence: 91,
    title: "Bt Cotton — Sucking Pest Monitoring Advisory",
    stage: "Flowering & Square Formation",
    explanation:
      "Monitor cotton plants for sucking pests and assess field conditions regularly. Select any crop-protection treatment based on verified pest identification and locally approved recommendations.",
    timing: "Monitor during the flowering stage",
    demand: "Surging Inquiries (+52%)",
    product: "Bayer Crop Protection Products",
    productPath: "/farmer/products",
  },
  {
    crop: "WHEAT (GW-322 / LOKWAN)",
    confidence: 88,
    title: "Upcoming Rabi Wheat — Advance Seed Planning",
    stage: "Upcoming Rabi Sowing",
    explanation:
      "Plan certified wheat seed requirements before sowing. Compare suitable varieties, local availability, and expected sowing dates before placing an order.",
    timing: "Plan before the sowing season",
    demand: "Advance Planning Signal",
    product: "Certified Wheat Seeds",
    productPath: "/farmer/products",
  },
];

const districtSignals = [
  {
    title: "Crop Sowing Signals",
    description:
      "Registered soybean acreage can help estimate seasonal fertilizer requirements and district-level agricultural input demand.",
  },
  {
    title: "Search Velocity",
    description:
      "Marketplace searches and product enquiries can indicate rising demand for agricultural inputs.",
  },
  {
    title: "Timely Fulfilment",
    description:
      "Demand forecasts can help partner shops plan inventory and improve the availability of agricultural products.",
  },
];

const FarmerAIInsights = () => {
  const navigate = useNavigate();

  return (
    <div className="farmer-ai-page">
      {/* Breadcrumb */}
      <nav className="ai-breadcrumb" aria-label="Breadcrumb">
        <button type="button" onClick={() => navigate("/")}>
          Home
        </button>
        <span>›</span>
        <span>Farmer</span>
        <span>›</span>
        <strong>AI Insights</strong>
      </nav>

      {/* Page heading */}
      <header className="ai-page-header">
        <div className="ai-heading-icon" aria-hidden="true">
          ✧
        </div>

        <div>
          <h1>AI-Assisted Agricultural Insights</h1>
          <p>
            Predictive crop-stage advisories and input recommendations based on
            your registered farm profile.
          </p>
        </div>
      </header>

      {/* Advisory notice */}
      <section className="ai-advisory-notice">
        <div className="ai-notice-icon" aria-hidden="true">
          !
        </div>

        <div>
          <strong>Important Agronomic Advisory Notice:</strong>
          <p>
            These recommendations are intended to support agricultural
            planning and decision-making. Actual requirements depend on crop
            conditions, soil health, weather, and local demand. Outcomes are
            not guaranteed. Consult your local Krishi Vigyan Kendra (KVK) or
            qualified agricultural officer before applying crop-protection
            products.
          </p>
        </div>
      </section>

      {/* Recommendations heading */}
      <div className="ai-section-heading">
        <h2>Crop-Based Product Suggestions</h2>
        <span>Mapped to {recommendations.length} registered crops</span>
      </div>

      {/* Recommendation cards */}
      <section className="ai-recommendation-grid">
        {recommendations.map((item) => (
          <article className="ai-recommendation-card" key={item.crop}>
            <div className="ai-card-label-row">
              <span className="ai-crop-label">{item.crop}</span>

              <span className="ai-confidence-badge">
                <span aria-hidden="true">✧</span>
                {item.confidence}% Confidence
              </span>
            </div>

            <h3>{item.title}</h3>

            <p className="ai-crop-stage">
              Stage: {item.stage}
            </p>

            <div className="ai-explanation">
              {item.explanation}
            </div>

            <div className="ai-recommendation-metrics">
              <div className="ai-metric-row">
                <span>Timing:</span>
                <strong className="ai-timing-value">
                  {item.timing}
                </strong>
              </div>

              <div className="ai-metric-row">
                <span>Market Signal:</span>
                <strong className="ai-demand-value">
                  {item.demand}
                </strong>
              </div>
            </div>

            <div className="ai-card-footer">
              <span className="ai-product-name" title={item.product}>
                {item.product}
              </span>

              <button
                type="button"
                className="ai-view-product-button"
                onClick={() => navigate(item.productPath)}
              >
                View Products <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* District demand analysis */}
      <section className="ai-district-section">
        <div className="ai-district-heading">
          <span aria-hidden="true">♧</span>
          <h2>How AgriDemand AI Evaluates Your District</h2>
        </div>

        <p className="ai-district-description">
          By combining registered crop information, agricultural product
          searches, shop enquiries, historical sales, and seasonal patterns,
          AgriDemand aims to forecast input demand and help agricultural shops
          plan inventory in advance.
        </p>

        <div className="ai-district-grid">
          {districtSignals.map((signal) => (
            <article className="ai-district-card" key={signal.title}>
              <h3>{signal.title}</h3>
              <p>{signal.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="ai-page-disclaimer">
        <strong>Note:</strong> This page currently uses illustrative
        recommendations. Confidence percentages and market signals are
        demonstration values, not verified predictions from a trained machine
        learning model. Connect your backend prediction API to display
        calculated results.
      </footer>
    </div>
  );
};

export default FarmerAIInsights;