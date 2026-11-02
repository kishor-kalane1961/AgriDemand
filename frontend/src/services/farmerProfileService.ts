import { apiRequest } from "./api";

export interface FarmerProfile {
  userId: number;
  fullName: string;
  email: string;
  mobileNumber: string | null;
  residentialAddress: string;
  village: string;
  district: string;
  state: string;
  landholdingAcres: number;
  soilClassification: string | null;
}

export interface FarmerProfileUpdateRequest {
  fullName: string;
  mobileNumber: string | null;
  residentialAddress: string;
  village: string;
  district: string;
  state: string;
  landholdingAcres: number;
  soilClassification: string | null;
}

/**
 * Fetch the authenticated farmer's profile.
 */
export function getMyFarmerProfile(
  token?: string
): Promise<FarmerProfile> {
  return apiRequest<FarmerProfile>(
    "/api/farmer/me",
    {
      method: "GET",
    },
    token
  );
}

/**
 * Update the authenticated farmer's profile.
 */
export function updateMyFarmerProfile(
  profile: FarmerProfileUpdateRequest,
  token?: string
): Promise<FarmerProfile> {
  return apiRequest<FarmerProfile>(
    "/api/farmer/me",
    {
      method: "PUT",
      body: JSON.stringify(profile),
    },
    token
  );
}