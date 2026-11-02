import { useState } from "react";
import ShopOwnerLayout from "../../components/shopowner/ShopOwnerLayout";
import "./ShopOwnerProfile.css";

export default function ShopOwnerProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    shopName: "Kisan Krishi Seva Kendra",
    proprietor: "Kishan Rao",
    dealerLicense: "MH/PUN/AGR/2021/8849",
    gstin: "27AABCK1234F1Z8",
    mobile: "+91 94230 11223",
    email: "shop@agridemand.ai",
    address: "Shop No. 14-16, APMC Mandi, Market Yard",
    city: "Baramati",
    district: "Pune",
    state: "Maharashtra",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(false);
    alert("Shop profile updated successfully!");
  };

  return (
    <ShopOwnerLayout>
      <div className="shop-profile-page">
        {/* Breadcrumb */}
        <div className="profile-breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-arrow">›</span>
          <span>Shop</span>
          <span className="breadcrumb-arrow">›</span>
          <strong>Profile</strong>
        </div>

        <div className="profile-container">
          {/* Shop Header */}
          <section className="shop-profile-header">
            <div className="shop-profile-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 10h18" />
                <path d="M5 10v10h14V10" />
                <path d="M3 10l2-6h14l2 6" />
                <path d="M9 20v-6h6v6" />
                <path d="M3 10a3 3 0 0 0 6 0" />
                <path d="M9 10a3 3 0 0 0 6 0" />
                <path d="M15 10a3 3 0 0 0 6 0" />
              </svg>
            </div>

            <div className="shop-profile-heading">
              <div className="shop-name-row">
                <h1>{profile.shopName}</h1>

                <span className="verified-badge">
                  <span className="verified-dot" />
                  VERIFIED
                </span>
              </div>

              <p>
                <span className="location-symbol">⌖</span>
                {profile.address}, {profile.city}, {profile.district}
              </p>
            </div>

            <button
              type="button"
              className="edit-profile-button"
              onClick={() => setIsEditing((previous) => !previous)}
            >
              {isEditing ? "Cancel Editing" : "✎ Edit Profile"}
            </button>
          </section>

          <form onSubmit={handleSubmit}>
            {/* Dealer Details */}
            <section className="profile-card">
              <div className="profile-section-title">
                <span className="section-icon">♧</span>
                <h2>DEALER ENTERPRISE DETAILS</h2>
              </div>

              <div className="profile-form-grid">
                <ProfileField
                  label="Official Shop Name"
                  value={profile.shopName}
                  editing={isEditing}
                  onChange={(value) => handleChange("shopName", value)}
                />

                <ProfileField
                  label="Proprietor / Managing Partner"
                  value={profile.proprietor}
                  editing={isEditing}
                  onChange={(value) => handleChange("proprietor", value)}
                />

                <ProfileField
                  label="Agri Dealer License Number"
                  value={profile.dealerLicense}
                  editing={isEditing}
                  onChange={(value) => handleChange("dealerLicense", value)}
                />

                <ProfileField
                  label="GSTIN Registration"
                  value={profile.gstin}
                  editing={isEditing}
                  onChange={(value) => handleChange("gstin", value)}
                />

                <ProfileField
                  label="Business Mobile"
                  value={profile.mobile}
                  editing={isEditing}
                  onChange={(value) => handleChange("mobile", value)}
                />

                <ProfileField
                  label="Registered Email"
                  value={profile.email}
                  editing={isEditing}
                  onChange={(value) => handleChange("email", value)}
                />
              </div>
            </section>

            {/* Shop Address */}
            <section className="profile-card">
              <div className="profile-section-title">
                <span className="section-icon">⌖</span>
                <h2>SHOP ADDRESS &amp; MARKET LOCATION</h2>
              </div>

              <div className="profile-form-grid">
                <div className="profile-field full-width">
                  <label htmlFor="shopAddress">Shop Address / Mandi Stall</label>
                  <input
                    id="shopAddress"
                    type="text"
                    value={profile.address}
                    readOnly={!isEditing}
                    onChange={(event) =>
                      handleChange("address", event.target.value)
                    }
                  />
                </div>

                <ProfileField
                  label="City / Taluka"
                  value={profile.city}
                  editing={isEditing}
                  onChange={(value) => handleChange("city", value)}
                />

                <ProfileField
                  label="District"
                  value={profile.district}
                  editing={isEditing}
                  onChange={(value) => handleChange("district", value)}
                />

                <ProfileField
                  label="State"
                  value={profile.state}
                  editing={isEditing}
                  onChange={(value) => handleChange("state", value)}
                />
              </div>
            </section>

            {isEditing && (
              <div className="profile-save-container">
                <button
                  type="submit"
                  className="save-profile-button"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </ShopOwnerLayout>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
}

function ProfileField({
  label,
  value,
  editing,
  onChange,
}: ProfileFieldProps) {
  const inputId = `profile-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="profile-field">
      <label htmlFor={inputId}>{label}</label>

      <input
        id={inputId}
        type="text"
        value={value}
        readOnly={!editing}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}