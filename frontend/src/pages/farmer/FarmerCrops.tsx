import { useCallback, useEffect, useState } from "react";
import "./FarmerCrops.css";

import {
  getMyCrops,
  addCrop,
  updateCrop,
  deleteCrop as deleteCropFromApi,
} from "../../services/farmerCropService";

import type {
  Crop,
  CropRequest,
} from "../../services/farmerCropService";

type CropFormData = Omit<Crop, "id">;

const emptyCrop: CropFormData = {
  name: "",
  variety: "",
  season: "Kharif",
  stage: "Sowing",
  landArea: 1,
  sowingDate: "",
  expectedHarvest: "",
  health: "Good",
};

const FarmerCrops = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingCropId, setDeletingCropId] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCropId, setEditingCropId] = useState<string | null>(null);

  const [formData, setFormData] = useState<CropFormData>(emptyCrop);
  const [error, setError] = useState("");
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const totalAcres = crops.reduce(
    (total, crop) => total + crop.landArea,
    0
  );

  // Load crops from the backend.
  const loadCrops = useCallback(async () => {
    setIsLoading(true);
    setPageError("");

    try {
      const data = await getMyCrops();
      setCrops(data);
    } catch (err) {
      setPageError(
        err instanceof Error
          ? err.message
          : "Unable to load your crops. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCrops();
  }, [loadCrops]);

  // Update a single form field.
  const updateField = <K extends keyof CropFormData>(
    field: K,
    value: CropFormData[K]
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Open the form for adding a new crop.
  const openAddForm = () => {
    setEditingCropId(null);
    setFormData({ ...emptyCrop });
    setError("");
    setSuccessMessage("");
    setIsFormOpen(true);
  };

  // Open the form for editing an existing crop.
  const openEditForm = (crop: Crop) => {
    const {
      id,
      ...cropData
    } = crop;

    setEditingCropId(id);
    setFormData(cropData);
    setError("");
    setSuccessMessage("");
    setIsFormOpen(true);
  };

  // Close and reset the form.
  const closeForm = () => {
    if (isSaving) return;

    setIsFormOpen(false);
    setEditingCropId(null);
    setFormData({ ...emptyCrop });
    setError("");
  };

  // Validate and save a crop through the backend.
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setPageError("");
    setSuccessMessage("");

    if (!formData.name.trim()) {
      setError("Please enter the crop name.");
      return;
    }

    if (!formData.variety.trim()) {
      setError("Please enter the crop variety.");
      return;
    }

    if (!Number.isFinite(formData.landArea) || formData.landArea <= 0) {
      setError("Land area must be greater than zero.");
      return;
    }

    if (!formData.sowingDate || !formData.expectedHarvest) {
      setError("Please enter both the sowing and expected harvest dates.");
      return;
    }

    if (formData.expectedHarvest < formData.sowingDate) {
      setError("Expected harvest date cannot be before the sowing date.");
      return;
    }

    const request: CropRequest = {
      name: formData.name.trim(),
      variety: formData.variety.trim(),
      season: formData.season,
      stage: formData.stage,
      landArea: formData.landArea,
      sowingDate: formData.sowingDate,
      expectedHarvest: formData.expectedHarvest,
      health: formData.health,
    };

    try {
      setIsSaving(true);

      if (editingCropId !== null) {
        const updatedCrop = await updateCrop(
          editingCropId,
          request
        );

        setCrops((previous) =>
          previous.map((crop) =>
            crop.id === editingCropId ? updatedCrop : crop
          )
        );

        setSuccessMessage("Crop updated successfully.");
      } else {
        const savedCrop = await addCrop(request);

        setCrops((previous) => [
          ...previous,
          savedCrop,
        ]);

        setSuccessMessage("Crop registered successfully.");
      }

      setIsFormOpen(false);
      setEditingCropId(null);
      setFormData({ ...emptyCrop });
      setError("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save the crop. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Delete a crop through the backend.
  const handleDeleteCrop = async (crop: Crop) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${crop.name}?`
    );

    if (!confirmed) return;

    setPageError("");
    setSuccessMessage("");
    setDeletingCropId(crop.id);

    try {
      await deleteCropFromApi(crop.id);

      setCrops((previous) =>
        previous.filter((item) => item.id !== crop.id)
      );

      setSuccessMessage(`${crop.name} deleted successfully.`);
    } catch (err) {
      setPageError(
        err instanceof Error
          ? err.message
          : "Unable to delete the crop. Please try again."
      );
    } finally {
      setDeletingCropId(null);
    }
  };

  return (
    <div className="farmer-crops-page">
      {/* Breadcrumb */}
      <div className="crops-breadcrumb">
        <span>Home</span>
        <span className="crops-breadcrumb-separator">›</span>
        <span>Farmer</span>
        <span className="crops-breadcrumb-separator">›</span>
        <strong>Crops</strong>
      </div>

      {/* Page heading */}
      <div className="crops-page-heading">
        <div>
          <h1>My Farm Crops</h1>
          <p>
            Registered crops signal early input requirements to local
            agricultural supply chains.
          </p>
        </div>

        <button
          type="button"
          className="add-crop-button"
          onClick={openAddForm}
          disabled={isLoading}
        >
          <span className="add-crop-plus">＋</span>
          Add Crop
        </button>
      </div>

      {/* Page messages */}
      {pageError && (
        <div className="crop-form-error" role="alert">
          {pageError}

          <button
            type="button"
            onClick={() => void loadCrops()}
            disabled={isLoading}
          >
            Retry
          </button>
        </div>
      )}

      {successMessage && (
        <p role="status" aria-live="polite">
          {successMessage}
        </p>
      )}

      {/* Crop summary */}
      <div className="crop-summary-row">
        <div className="crop-summary-item">
          <span>Registered Crops</span>
          <strong>
            {isLoading ? "…" : crops.length}
          </strong>
        </div>

        <div className="crop-summary-item">
          <span>Total Land Used</span>
          <strong>
            {isLoading
              ? "…"
              : `${Number(totalAcres.toFixed(2)).toLocaleString()} ${
                  totalAcres === 1 ? "Acre" : "Acres"
                }`}
          </strong>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="crops-empty-state" role="status">
          <h2>Loading your crops...</h2>
          <p>Please wait while we retrieve your farm records.</p>
        </div>
      )}

      {/* Crop cards */}
      {!isLoading && crops.length > 0 && (
        <div className="crops-grid">
          {crops.map((crop, index) => (
            <article
              className={`crop-card ${
                index === 0 ? "crop-card-highlighted" : ""
              }`}
              key={crop.id}
            >
              <div className="crop-card-top">
                <span
                  className={`crop-season-badge season-${crop.season.toLowerCase()}`}
                >
                  {crop.season.toUpperCase()} SEASON
                </span>

                <span
                  className={`crop-stage-badge stage-${crop.stage.toLowerCase()}`}
                >
                  <span className="stage-dot" />
                  {crop.stage}
                </span>
              </div>

              <div className="crop-title-section">
                <h2>{crop.name}</h2>
                <p>{crop.variety}</p>
              </div>

              <div className="crop-details">
                <div className="crop-detail-row">
                  <span>Land Area:</span>
                  <strong>
                    {crop.landArea.toLocaleString()}{" "}
                    {crop.landArea === 1 ? "Acre" : "Acres"}
                  </strong>
                </div>

                <div className="crop-detail-row">
                  <span>Sowing Date:</span>
                  <strong>{crop.sowingDate}</strong>
                </div>

                <div className="crop-detail-row">
                  <span>Expected Harvest:</span>
                  <strong className="crop-harvest-date">
                    {crop.expectedHarvest}
                  </strong>
                </div>

                <div className="crop-detail-row">
                  <span>Crop Health:</span>
                  <strong
                    className={`crop-health health-${crop.health.toLowerCase()}`}
                  >
                    {crop.health}
                  </strong>
                </div>
              </div>

              <div className="crop-card-footer">
                <span className="crop-id">
                  ID: {crop.id}
                </span>

                <div className="crop-actions">
                  <button
                    type="button"
                    className="crop-action-button"
                    onClick={() => openEditForm(crop)}
                    aria-label={`Edit ${crop.name}`}
                    title="Edit crop"
                    disabled={deletingCropId === crop.id}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="19"
                      height="19"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="crop-action-button crop-delete-button"
                    onClick={() => void handleDeleteCrop(crop)}
                    aria-label={`Delete ${crop.name}`}
                    title={
                      deletingCropId === crop.id
                        ? "Deleting crop"
                        : "Delete crop"
                    }
                    disabled={deletingCropId === crop.id}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="19"
                      height="19"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4h8v2" />
                      <path d="m19 6-1 14H6L5 6" />
                      <path d="M10 11v5M14 11v5" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && crops.length === 0 && !pageError && (
        <div className="crops-empty-state">
          <div className="crops-empty-icon">♧</div>
          <h2>No crops registered yet</h2>
          <p>Add your first crop to start managing your farm.</p>

          <button
            type="button"
            className="add-crop-button"
            onClick={openAddForm}
          >
            ＋ Add Your First Crop
          </button>
        </div>
      )}

      {/* Add/Edit modal */}
      {isFormOpen && (
        <div
          className="crop-modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !isSaving
            ) {
              closeForm();
            }
          }}
        >
          <section
            className="crop-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="crop-modal-title"
          >
            <div className="crop-modal-header">
              <div>
                <h2 id="crop-modal-title">
                  {editingCropId ? "Edit Crop" : "Add New Crop"}
                </h2>

                <p>
                  Enter the crop details for your farm.
                </p>
              </div>

              <button
                type="button"
                className="crop-modal-close"
                onClick={closeForm}
                aria-label="Close form"
                disabled={isSaving}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="crop-form-grid">
                <div className="crop-form-field">
                  <label htmlFor="crop-name">
                    Crop Name *
                  </label>

                  <input
                    id="crop-name"
                    value={formData.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="e.g. Soybean"
                    required
                  />
                </div>

                <div className="crop-form-field">
                  <label htmlFor="crop-variety">
                    Crop Variety *
                  </label>

                  <input
                    id="crop-variety"
                    value={formData.variety}
                    onChange={(event) =>
                      updateField("variety", event.target.value)
                    }
                    placeholder="e.g. JS-335"
                    required
                  />
                </div>

                <div className="crop-form-field">
                  <label htmlFor="crop-season">
                    Growing Season
                  </label>

                  <select
                    id="crop-season"
                    value={formData.season}
                    onChange={(event) =>
                      updateField(
                        "season",
                        event.target.value as Crop["season"]
                      )
                    }
                  >
                    <option value="Kharif">Kharif</option>
                    <option value="Rabi">Rabi</option>
                    <option value="Zaid">Zaid</option>
                  </select>
                </div>

                <div className="crop-form-field">
                  <label htmlFor="crop-stage">
                    Growth Stage
                  </label>

                  <select
                    id="crop-stage"
                    value={formData.stage}
                    onChange={(event) =>
                      updateField(
                        "stage",
                        event.target.value as Crop["stage"]
                      )
                    }
                  >
                    <option value="Sowing">Sowing</option>
                    <option value="Vegetative">Vegetative</option>
                    <option value="Flowering">Flowering</option>
                    <option value="Harvesting">Harvesting</option>
                  </select>
                </div>

                <div className="crop-form-field">
                  <label htmlFor="crop-area">
                    Land Area (Acres) *
                  </label>

                  <input
                    id="crop-area"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={formData.landArea}
                    onChange={(event) =>
                      updateField(
                        "landArea",
                        Number(event.target.value)
                      )
                    }
                    required
                  />
                </div>

                <div className="crop-form-field">
                  <label htmlFor="crop-health">
                    Crop Health
                  </label>

                  <select
                    id="crop-health"
                    value={formData.health}
                    onChange={(event) =>
                      updateField(
                        "health",
                        event.target.value as Crop["health"]
                      )
                    }
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                <div className="crop-form-field">
                  <label htmlFor="crop-sowing-date">
                    Sowing Date *
                  </label>

                  <input
                    id="crop-sowing-date"
                    type="date"
                    value={formData.sowingDate}
                    onChange={(event) =>
                      updateField("sowingDate", event.target.value)
                    }
                    required
                  />
                </div>

                <div className="crop-form-field">
                  <label htmlFor="crop-harvest-date">
                    Expected Harvest *
                  </label>

                  <input
                    id="crop-harvest-date"
                    type="date"
                    min={formData.sowingDate || undefined}
                    value={formData.expectedHarvest}
                    onChange={(event) =>
                      updateField(
                        "expectedHarvest",
                        event.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>

              {error && (
                <p
                  className="crop-form-error"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <div className="crop-modal-actions">
                <button
                  type="button"
                  className="crop-cancel-button"
                  onClick={closeForm}
                  disabled={isSaving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-crop-button"
                  disabled={isSaving}
                >
                  {isSaving
                    ? "Saving..."
                    : editingCropId
                      ? "Save Changes"
                      : "Add Crop"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default FarmerCrops;