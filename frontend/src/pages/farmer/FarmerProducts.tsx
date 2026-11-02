import { useMemo, useState } from "react";
import "./FarmerProducts.css";

type ProductCategory =
  | "Seeds"
  | "Fertilizers"
  | "Pesticides"
  | "Agricultural Equipment"
  | "Other Agricultural Products";

type Availability = "In Stock" | "Low Stock" | "Out of Stock";

interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  unit: string;
  rating: number;
  stock: number;
  availability: Availability;
  shop: string;
  suitableFor: string[];
  image: string;
  brand: string;
}

const categories = [
  "All Products",
  "Seeds",
  "Fertilizers",
  "Pesticides",
  "Agricultural Equipment",
  "Other Agricultural Products",
] as const;

const products: Product[] = [
  {
    id: 1,
    name: "Soybean Seeds (JS-335 Certified)",
    category: "Seeds",
    description:
      "High germination rate (>=85%) certified seeds with enhanced resistance to yellow mosaic virus. Specially selected for productive soybean cultivation.",
    price: 2850,
    unit: "bag (30kg)",
    rating: 4.8,
    stock: 140,
    availability: "In Stock",
    shop: "Kisan Krishi Seva Kendra",
    suitableFor: ["Soybean"],
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    brand: "Mahabeej",
  },
  {
    id: 2,
    name: "IFFCO Neem Coated Urea",
    category: "Fertilizers",
    description:
      "Government-subsidized 46% nitrogen fertilizer coated with neem oil to reduce leaching and prolong nitrogen availability.",
    price: 266,
    unit: "bag (45kg)",
    rating: 4.9,
    stock: 28,
    availability: "Low Stock",
    shop: "Kisan Krishi Seva Kendra",
    suitableFor: ["Soybean", "Cotton", "Wheat", "Rice", "Maize", "Sugarcane"],
    image:
      "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=900&q=80",
    brand: "IFFCO",
  },
  {
    id: 3,
    name: "DAP 18:46:0 Fertilizer (IFFCO)",
    category: "Fertilizers",
    description:
      "Essential basal application fertilizer providing 18% nitrogen and 46% water-soluble phosphate for strong root system development.",
    price: 1350,
    unit: "bag (50kg)",
    rating: 4.7,
    stock: 95,
    availability: "In Stock",
    shop: "Kisan Krishi Seva Kendra",
    suitableFor: ["Soybean", "Cotton", "Wheat", "Maize"],
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    brand: "IFFCO",
  },
  {
    id: 4,
    name: "Hybrid Bt Cotton Seeds",
    category: "Seeds",
    description:
      "Hybrid cotton seeds selected for vigorous crop growth and good yield potential under suitable growing conditions.",
    price: 950,
    unit: "packet",
    rating: 4.6,
    stock: 65,
    availability: "In Stock",
    shop: "Green Field Agro Center",
    suitableFor: ["Cotton"],
    image:
      "https://images.unsplash.com/photo-1595872018818-97555653a011?auto=format&fit=crop&w=900&q=80",
    brand: "Bayer",
  },
  {
    id: 5,
    name: "Neem-Based Crop Protection Spray",
    category: "Pesticides",
    description:
      "Neem-based crop protection product intended to help manage selected agricultural pests when used according to its label.",
    price: 420,
    unit: "bottle (1L)",
    rating: 4.5,
    stock: 42,
    availability: "In Stock",
    shop: "Green Field Agro Center",
    suitableFor: ["Soybean", "Cotton", "Vegetables"],
    image:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=900&q=80",
    brand: "NeemCare",
  },
  {
    id: 6,
    name: "Water-Soluble NPK Fertilizer",
    category: "Fertilizers",
    description:
      "Water-soluble plant nutrient formulation for appropriate crop growth stages and fertilizer management programs.",
    price: 780,
    unit: "bag (5kg)",
    rating: 4.6,
    stock: 0,
    availability: "Out of Stock",
    shop: "Kisan Krishi Seva Kendra",
    suitableFor: ["Vegetables", "Cotton", "Fruits"],
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
    brand: "IFFCO",
  },
  {
    id: 7,
    name: "Manual Agricultural Sprayer",
    category: "Agricultural Equipment",
    description:
      "Portable agricultural sprayer for applying suitable crop treatment solutions according to product instructions.",
    price: 1250,
    unit: "piece",
    rating: 4.4,
    stock: 19,
    availability: "Low Stock",
    shop: "Shivneri Agro Traders",
    suitableFor: ["All Crops"],
    image:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=80",
    brand: "AgroTools",
  },
  {
    id: 8,
    name: "Organic Soil Conditioner",
    category: "Other Agricultural Products",
    description:
      "Organic soil amendment for supporting soil structure and nutrient management as part of an appropriate farm plan.",
    price: 550,
    unit: "bag (25kg)",
    rating: 4.3,
    stock: 58,
    availability: "In Stock",
    shop: "Shivneri Agro Traders",
    suitableFor: ["Soybean", "Wheat", "Vegetables"],
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    brand: "SoilPlus",
  },
  {
    id: 9,
    name: "Wheat Seeds (GW-322)",
    category: "Seeds",
    description:
      "Wheat seed variety for suitable growing regions. Confirm local suitability and sowing recommendations before purchasing.",
    price: 1800,
    unit: "bag (40kg)",
    rating: 4.7,
    stock: 75,
    availability: "In Stock",
    shop: "Green Field Agro Center",
    suitableFor: ["Wheat"],
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
    brand: "Mahabeej",
  },
];

const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

const FarmerProducts = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
  const normalizedSearch = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      !normalizedSearch ||
      [
        product.name,
        product.category,
        product.description,
        product.shop,
        product.brand,
        ...product.suitableFor,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category === selectedCategory;

    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });
}, [search, selectedCategory, maxPrice]);

  const openOrder = (product: Product) => {
    setQuantity(1);
    setOrderProduct(product);
    setNotice("");
  };

  const submitEnquiry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!enquiryProduct) return;

    setNotice(
      `Enquiry prepared for ${enquiryProduct.name}. Connect the enquiry API to submit it to the shop.`
    );

    setEnquiryProduct(null);
    setEnquiryMessage("");
  };

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!orderProduct) return;

    if (quantity < 1 || quantity > orderProduct.stock) {
      setNotice("Please enter a quantity available in stock.");
      return;
    }

    setNotice(
      `Order summary prepared: ${quantity} × ${orderProduct.name} — ${formatPrice(
        quantity * orderProduct.price
      )}. Connect the order API to place this order.`
    );

    setOrderProduct(null);
  };

  return (
    <div className="farmer-products-page">
      <header className="marketplace-heading">
        <h1>Agri Input Marketplace</h1>
        <p>
          Direct access to certified seeds, government subsidized fertilizers,
          and licensed crop protection inputs.
        </p>
      </header>

      {notice && (
        <div className="marketplace-notice" role="status">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <section className="marketplace-filters">
        <label className="marketplace-search">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search seeds, fertilizers, pesticides, sprayers, brands (e.g. Mahabeej, IFFCO, Bayer)..."
            aria-label="Search agricultural products"
          />
        </label>

        <div className="marketplace-categories" aria-label="Product categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`marketplace-category ${
                selectedCategory === category ? "selected" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {category === "All Products" && ` (${products.length})`}
            </button>
          ))}
        </div>

        <div className="marketplace-filter-bottom">
          {/* <label className="availability-filter">
            <span>Availability:</span>
            <select
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
            >
              <option>All Statuses</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </label> */}

          <div className="marketplace-filter-bottom">
  <label className="price-filter">
    <span>Max Price:</span>
    <strong>{formatPrice(maxPrice)}</strong>

    <input
      type="range"
      min="100"
      max="10000"
      step="50"
      value={maxPrice}
      onChange={(event) => setMaxPrice(Number(event.target.value))}
      aria-label="Maximum price"
    />
  </label>

  <p className="marketplace-results">
    Showing <strong>{filteredProducts.length}</strong> of{" "}
    {products.length} agricultural inputs
  </p>
</div>

          <p className="marketplace-results">
            Showing <strong>{filteredProducts.length}</strong> of{" "}
            {products.length} agricultural inputs
          </p>
        </div>
      </section>

      {filteredProducts.length > 0 ? (
        <section className="marketplace-product-grid">
          {filteredProducts.map((product) => (
            <article className="marketplace-product-card" key={product.id}>
              <div className="product-image-container">
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />

                <span className="product-category-label">
                  {product.category}
                </span>

                {/* <span
                  className={`product-stock-badge stock-${product.availability
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  <span className="stock-dot" />
                  {product.availability}
                  {product.availability !== "Out of Stock" &&
                    ` (${product.stock})`}
                </span> */}
              </div>

              <div className="product-card-content">
                <h2>{product.name}</h2>

                <p className="product-description">
                  {product.description}
                </p>

                <div className="product-price-row">
                  <div className="product-price">
                    <strong>{formatPrice(product.price)}</strong>
                    <span>/ {product.unit}</span>
                  </div>

                  <span className="product-rating">
                    <span aria-hidden="true">★</span>
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                <div className="product-shop-information">
                  <div className="product-shop-name">
                    <span aria-hidden="true">♙</span>
                    {product.shop}
                  </div>

                  <p>
                    Ideal for: {product.suitableFor.join(", ")}
                  </p>
                </div>
              </div>

              <div className="product-card-actions">
                <button
                  type="button"
                  className="product-details-button"
                  onClick={() => setSelectedProduct(product)}
                >
                  Details
                </button>

                <button
                  type="button"
                  className="product-enquire-button"
                  onClick={() => {
                    setEnquiryProduct(product);
                    setNotice("");
                  }}
                >
                  Enquire
                </button>

                <button
                  type="button"
                  className="product-order-button"
                  disabled={product.availability === "Out of Stock"}
                  onClick={() => openOrder(product)}
                >
                  Order Now
                </button>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="marketplace-empty-state">
          <span aria-hidden="true">⌕</span>
          <h2>No products found</h2>
          <p>Try changing your search, category or price.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All Products");
              setMaxPrice(10000);
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Product details dialog */}
      {selectedProduct && (
        <div
          className="marketplace-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProduct(null);
            }
          }}
        >
          <section
            className="marketplace-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-details-title"
          >
            <button
              type="button"
              className="marketplace-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <span className="marketplace-modal-eyebrow">
              {selectedProduct.category}
            </span>

            <h2 id="product-details-title">{selectedProduct.name}</h2>

            <p>{selectedProduct.description}</p>

            <div className="product-modal-information">
              <span>Brand</span>
              <strong>{selectedProduct.brand}</strong>

              <span>Price</span>
              <strong>{formatPrice(selectedProduct.price)}</strong>

              <span>Pack size</span>
              <strong>{selectedProduct.unit}</strong>

              <span>Availability</span>
              <strong>{selectedProduct.availability}</strong>

              <span>Rating</span>
              <strong>★ {selectedProduct.rating.toFixed(1)}</strong>

              <span>Supplier</span>
              <strong>{selectedProduct.shop}</strong>

              <span>Suitable for</span>
              <strong>{selectedProduct.suitableFor.join(", ")}</strong>
            </div>

            <div className="marketplace-modal-actions">
              <button
                type="button"
                className="product-details-button"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="product-order-button"
                disabled={selectedProduct.availability === "Out of Stock"}
                onClick={() => {
                  const product = selectedProduct;
                  setSelectedProduct(null);
                  openOrder(product);
                }}
              >
                Order Now
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Enquiry dialog */}
      {enquiryProduct && (
        <div className="marketplace-modal-backdrop">
          <section
            className="marketplace-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-enquiry-title"
          >
            <button
              type="button"
              className="marketplace-modal-close"
              onClick={() => setEnquiryProduct(null)}
              aria-label="Close enquiry"
            >
              ×
            </button>

            <span className="marketplace-modal-eyebrow">SHOP ENQUIRY</span>

            <h2 id="product-enquiry-title">Enquire About Product</h2>

            <p>
              <strong>{enquiryProduct.name}</strong>
              <br />
              Supplier: {enquiryProduct.shop}
            </p>

            <form onSubmit={submitEnquiry}>
              <label className="marketplace-form-field">
                Your message
                <textarea
                  value={enquiryMessage}
                  onChange={(event) => setEnquiryMessage(event.target.value)}
                  placeholder="Ask about availability, delivery, or product specifications..."
                  rows={4}
                  required
                />
              </label>

              <div className="marketplace-modal-actions">
                <button
                  type="button"
                  className="product-details-button"
                  onClick={() => setEnquiryProduct(null)}
                >
                  Cancel
                </button>

                <button type="submit" className="product-order-button">
                  Submit Enquiry
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* Order dialog */}
      {orderProduct && (
        <div className="marketplace-modal-backdrop">
          <section
            className="marketplace-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-order-title"
          >
            <button
              type="button"
              className="marketplace-modal-close"
              onClick={() => setOrderProduct(null)}
              aria-label="Close order"
            >
              ×
            </button>

            <span className="marketplace-modal-eyebrow">ORDER SUMMARY</span>

            <h2 id="product-order-title">Order Agricultural Input</h2>

            <p>
              <strong>{orderProduct.name}</strong>
              <br />
              {formatPrice(orderProduct.price)} / {orderProduct.unit}
              <br />
              Available stock: {orderProduct.stock}
            </p>

            <form onSubmit={submitOrder}>
              <label className="marketplace-form-field">
                Quantity
                <input
                  type="number"
                  min={1}
                  max={orderProduct.stock}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Number(event.target.value))
                  }
                  required
                />
              </label>

              <div className="marketplace-order-total">
                <span>Estimated total</span>
                <strong>
                  {formatPrice(quantity * orderProduct.price)}
                </strong>
              </div>

              <p className="marketplace-disclaimer">
                This is an order preview. The order will not be submitted
                until the backend ordering API is connected.
              </p>

              <div className="marketplace-modal-actions">
                <button
                  type="button"
                  className="product-details-button"
                  onClick={() => setOrderProduct(null)}
                >
                  Cancel
                </button>

                <button type="submit" className="product-order-button">
                  Confirm Preview
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default FarmerProducts;