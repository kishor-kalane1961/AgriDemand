import { apiRequest } from "./api";

export interface Crop {
  id: string;
  name: string;
  variety: string;
  season: "Kharif" | "Rabi" | "Zaid";
  stage: "Sowing" | "Vegetative" | "Flowering" | "Harvesting";
  landArea: number;
  sowingDate: string;
  expectedHarvest: string;
  health: "Excellent" | "Good" | "Average" | "Poor";
}

export interface CropRequest {
  name: string;
  variety: string;
  season: Crop["season"];
  stage: Crop["stage"];
  landArea: number;
  sowingDate: string;
  expectedHarvest: string;
  health: Crop["health"];
}

interface CropApiResponse {
  id: number;
  name: string;
  variety: string;
  season: Crop["season"];
  stage: Crop["stage"];
  landArea: number;
  sowingDate: string;
  expectedHarvest: string;
  health: Crop["health"];
}

function getToken(): string | undefined {
  return (
    localStorage.getItem("token") ??
    sessionStorage.getItem("token") ??
    undefined
  );
}

function mapCrop(crop: CropApiResponse): Crop {
  return {
    ...crop,
    id: String(crop.id),
  };
}

export async function getMyCrops(): Promise<Crop[]> {
  const crops = await apiRequest<CropApiResponse[]>(
    "/api/farmer/crops",
    { method: "GET" },
    getToken()
  );

  return crops.map(mapCrop);
}

export async function addCrop(
  crop: CropRequest
): Promise<Crop> {
  const saved = await apiRequest<CropApiResponse>(
    "/api/farmer/crops",
    {
      method: "POST",
      body: JSON.stringify(crop),
    },
    getToken()
  );

  return mapCrop(saved);
}

export async function updateCrop(
  id: string,
  crop: CropRequest
): Promise<Crop> {
  const saved = await apiRequest<CropApiResponse>(
    `/api/farmer/crops/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(crop),
    },
    getToken()
  );

  return mapCrop(saved);
}

export async function deleteCrop(id: string): Promise<void> {
  await apiRequest<void>(
    `/api/farmer/crops/${id}`,
    { method: "DELETE" },
    getToken()
  );
}