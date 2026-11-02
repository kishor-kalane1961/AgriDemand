import { useCallback, useEffect, useState } from "react";
import "./FarmerProfile.css";

import {
  getMyFarmerProfile,
  updateMyFarmerProfile,
  type FarmerProfile,
  type FarmerProfileUpdateRequest,
} from "../../services/farmerProfileService";

interface FarmerProfileData {
  fullName: string;
  mobileNumber: string;
  email: string;
  address: string;
  farmSize: string;
  soilType: string;
  irrigation: string;
  village: string;
  district: string;
  state: string;
}

const emptyProfile: FarmerProfileData = {
  fullName: "",
  mobileNumber: "",
  email: "",
  address: "",
  farmSize: "",
  soilType: "",
  irrigation: "",
  village: "",
  district: "",
  state: "",
};

const soilOptions = [
  "Black Soil (Regur)",
  "Black Soil",
  "Red Soil",
  "Alluvial Soil",
  "Laterite Soil",
  "Sandy Soil",
  "Clay Soil",
  "Loamy Soil",
];

const irrigationOptions = [
  "Drip Irrigation",
  "Sprinkler Irrigation",
  "Canal Irrigation",
  "Rainfed",
  "Borewell",
  "Other",
];

function mapApiProfileToForm(
  data: FarmerProfile
): FarmerProfileData {
  return {
    fullName: data.fullName ?? "",
    mobileNumber: data.mobileNumber ?? "",
    email: data.email ?? "",
    address: data.residentialAddress ?? "",
    farmSize:
      data.landholdingAcres != null
        ? String(data.landholdingAcres)
        : "",
    soilType: data.soilClassification ?? "",
    irrigation: "",
    village: data.village ?? "",
    district: data.district ?? "",
    state: data.state ?? "",
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

const FarmerProfile = () => {
  const [profile, setProfile] =
    useState<FarmerProfileData>(emptyProfile);

  const [originalProfile, setOriginalProfile] =
    useState<FarmerProfileData>(emptyProfile);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /*
   * Use the token key already established by your login implementation.
   *
   * Change "token" below if your existing application stores the
   * access token under a different key.
   */
  const getAuthToken = useCallback((): string | undefined => {
    return (
      localStorage.getItem("token") ??
      sessionStorage.getItem("token") ??
      undefined
    );
  }, []);

  /*
   * Load the current farmer's profile from Spring Boot.
   */
  const loadProfile = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = getAuthToken();
      const data = await getMyFarmerProfile(token);
      const formData = mapApiProfileToForm(data);

      setProfile(formData);
      setOriginalProfile(formData);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [getAuthToken]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const updateField = (
    field: keyof FarmerProfileData,
    value: string
  ) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * Save editable fields through the existing profile API service.
   */
  const handleSave = async () => {
    setSavedMessage("");
    setErrorMessage("");

    const fullName = profile.fullName.trim();
    const address = profile.address.trim();
    const village = profile.village.trim();
    const district = profile.district.trim();
    const state = profile.state.trim();

    const landholdingAcres = Number(profile.farmSize);

    if (
      !fullName ||
      !address ||
      !village ||
      !district ||
      !state ||
      profile.farmSize.trim() === ""
    ) {
      setErrorMessage(
        "Please complete all required profile fields."
      );
      return;
    }

    if (
      !Number.isFinite(landholdingAcres) ||
      landholdingAcres < 0
    ) {
      setErrorMessage(
        "Farm landholding must be a valid non-negative number."
      );
      return;
    }

    const request: FarmerProfileUpdateRequest = {
      fullName,
      mobileNumber: profile.mobileNumber.trim() || null,
      residentialAddress: address,
      village,
      district,
      state,
      landholdingAcres,
      soilClassification: profile.soilType.trim() || null,
    };

    setSaving(true);

    try {
      const token = getAuthToken();

      const updatedProfile = await updateMyFarmerProfile(
        request,
        token
      );

      /*
       * Use the server response as the source of truth.
       */
      const updatedForm = mapApiProfileToForm(updatedProfile);

      setProfile(updatedForm);
      setOriginalProfile(updatedForm);
      setEditMode(false);

      setSavedMessage("Your profile was updated successfully.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setEditMode(false);
    setSavedMessage("");
    setErrorMessage("");
  };

  const inputField = (
    label: string,
    field: keyof FarmerProfileData,
    options?: string[]
  ) => (
    <div className="profile-field" key={field}>
      <label htmlFor={field}>{label}</label>

      {options ? (
        <select
          id={field}
          value={profile[field]}
          disabled={!editMode || saving || loading}
          onChange={(event) =>
            updateField(field, event.target.value)
          }
        >
          <option value="">Select {label.toLowerCase()}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field}
          type={
            field === "email"
              ? "email"
              : field === "farmSize"
                ? "number"
                : "text"
          }
          min={field === "farmSize" ? "0" : undefined}
          step={field === "farmSize" ? "any" : undefined}
          value={profile[field]}
          disabled={
            !editMode ||
            saving ||
            loading ||
            field === "email"
          }
          onChange={(event) =>
            updateField(field, event.target.value)
          }
        />
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="farmer-profile-page">
        <div className="profile-save-message" role="status">
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div className="farmer-profile-page">
      {/* Breadcrumb */}
      <div className="profile-breadcrumb">
        <span>Home</span>
        <span className="breadcrumb-separator">›</span>
        <span>Farmer</span>
        <span className="breadcrumb-separator">›</span>
        <strong>Profile</strong>
      </div>

      {/* Profile heading card */}
      <section className="profile-header-card">
        <div className="profile-identity">
          <div className="profile-avatar">
            {profile.fullName
              .split(" ")
              .filter(Boolean)
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "F"}
          </div>

          <div className="profile-identity-details">
            <div className="profile-name-row">
              <h1>{profile.fullName || "Farmer Profile"}</h1>

              <span className="verified-badge">
                <span className="verified-dot" />
                Verified Farmer
              </span>
            </div>

            <p className="profile-location">
              <span aria-hidden="true">⌖</span>
              {[
                profile.village,
                profile.district,
                profile.state,
              ]
                .filter(Boolean)
                .join(", ") || "Location not provided"}
            </p>
          </div>
        </div>

        {!editMode ? (
          <button
            type="button"
            className="profile-primary-button"
            onClick={() => {
              setEditMode(true);
              setSavedMessage("");
              setErrorMessage("");
            }}
          >
            <span aria-hidden="true">✎</span>
            Edit Profile
          </button>
        ) : (
          <div className="profile-header-actions">
            <button
              type="button"
              className="profile-cancel-button"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="button"
              className="profile-primary-button"
              onClick={() => void handleSave()}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </section>

      {/* Success message */}
      {savedMessage && (
        <div className="profile-save-message" role="status">
          {savedMessage}
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="profile-error-message" role="alert">
          {errorMessage}

          {!editMode && (
            <button
              type="button"
              onClick={() => void loadProfile()}
              disabled={loading}
            >
              Retry
            </button>
          )}
        </div>
      )}

      {/* Personal information */}
      <section className="profile-section-card">
        <div className="profile-section-heading">
          <span
            className="section-heading-icon"
            aria-hidden="true"
          >
            ♙
          </span>
          <h2>PERSONAL INFORMATION</h2>
        </div>

        <div className="profile-fields-grid personal-fields-grid">
          {inputField("Full Name", "fullName")}
          {inputField("Mobile Number", "mobileNumber")}
          {inputField("Email Address", "email")}
          {inputField("Residential Address", "address")}
        </div>
      </section>

      {/* Farm and soil profile */}
      <section className="profile-section-card">
        <div className="profile-section-heading">
          <span
            className="section-heading-icon"
            aria-hidden="true"
          >
            ♧
          </span>
          <h2>FARM &amp; SOIL PROFILE</h2>
        </div>

        <div className="profile-fields-grid farm-fields-grid">
          {inputField(
            "Total Farm Landholding (Acres)",
            "farmSize"
          )}

          {inputField(
            "Primary Soil Type",
            "soilType",
            soilOptions
          )}

          {inputField(
            "Irrigation Setup",
            "irrigation",
            irrigationOptions
          )}

          {inputField("Village", "village")}
          {inputField("District", "district")}
          {inputField("State", "state")}
        </div>
      </section>

      <div className="profile-disclaimer">
        <span aria-hidden="true">ⓘ</span>
        Your profile information helps AgriDemand provide more
        relevant agricultural products and demand insights.
      </div>
    </div>
  );
};

export default FarmerProfile;