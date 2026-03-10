import { apiClient } from "./apiClient";
import { ENDPOINTS } from "../api/endpoints";

export async function fetchRecommendations() {
  const { data } = await apiClient.get(ENDPOINTS.recommendations);
  return data;
}

export async function fetchJobs() {
  const { data } = await apiClient.get(ENDPOINTS.jobs);
  return data;
}

export async function fetchReports() {
  const { data } = await apiClient.get(ENDPOINTS.reports);
  return data;
}

export async function generateReport() {
  const { data } = await apiClient.post(ENDPOINTS.generateReport);
  return data;
}

export async function applyJob(jobId) {
  const { data } = await apiClient.post(`/jobs/${jobId}/apply`);
  return data;
}

export async function saveJob(jobId) {
  const { data } = await apiClient.post(`/jobs/${jobId}/save`);
  return data;
}

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("resume", file);
  const { data } = await apiClient.post(ENDPOINTS.uploadResume, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
}
