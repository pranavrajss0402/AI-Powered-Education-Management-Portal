import axios from "axios";
import { mockDashboardData } from "./mock/studentDashboard.js";
import { mockStudentProfile } from "./mock/studentProfile.js";
import { mockStudentCourses } from "./mock/studentCourses.js";
import { mockStudentAssignments } from "./mock/studentAssignments.js";
import { mockStudentAttendance } from "./mock/studentAttendance.js";
import { mockStudentExams } from "./mock/studentExams.js";
import { mockStudentGrades } from "./mock/studentGrades.js";

// Toggle this once a real backend is live and reachable.
const USE_MOCK = true;

// ─── Axios client (for future real backend) ──────────────────────────────────
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// ─── Admin: plain fetch-based calls to http://127.0.0.1:8000 ─────────────────
const ADMIN_BASE_URL = "http://127.0.0.1:8000";

async function adminRequest(endpoint, options = {}) {
  const response = await fetch(`${ADMIN_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

export async function getStudents() { return adminRequest("/students"); }
export async function createStudent(student) {
  return adminRequest("/students", { method: "POST", body: JSON.stringify(student) });
}
export async function deleteStudent(id) {
  return adminRequest(`/students/${id}`, { method: "DELETE" });
}

// ─── Mock delay helper ────────────────────────────────────────────────────────
function mockDelay(data, ms = 500) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

// ─── Student portal API functions ────────────────────────────────────────────
export async function getStudentDashboard() {
  if (USE_MOCK) return mockDelay(mockDashboardData);
  const r = await apiClient.get("/student/dashboard"); return r.data;
}
export async function getStudentProfile() {
  if (USE_MOCK) return mockDelay(mockStudentProfile);
  const r = await apiClient.get("/student/profile"); return r.data;
}
export async function getStudentCourses() {
  if (USE_MOCK) return mockDelay(mockStudentCourses);
  const r = await apiClient.get("/student/courses"); return r.data;
}
export async function getStudentAssignments() {
  if (USE_MOCK) return mockDelay(mockStudentAssignments);
  const r = await apiClient.get("/student/assignments"); return r.data;
}
export async function getStudentAssignmentById(id) {
  if (USE_MOCK) {
    const found = mockStudentAssignments.find((a) => a.id === id);
    return mockDelay(found || null);
  }
  const r = await apiClient.get(`/student/assignments/${id}`); return r.data;
}
export async function submitAssignment(id, fileName) {
  if (USE_MOCK) {
    const assignment = mockStudentAssignments.find((a) => a.id === id);
    if (assignment) {
      assignment.status = "submitted";
      assignment.dueIn = "Submitted";
      assignment.submittedOn = new Date().toLocaleString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
        hour: "numeric", minute: "2-digit",
      });
      assignment.submissionFileName = fileName;
    }
    return mockDelay(assignment);
  }
  const r = await apiClient.post(`/student/assignments/${id}/submit`, { fileName });
  return r.data;
}
export async function getStudentAttendance() {
  if (USE_MOCK) return mockDelay(mockStudentAttendance);
  const r = await apiClient.get("/student/attendance"); return r.data;
}
export async function getStudentExams() {
  if (USE_MOCK) return mockDelay(mockStudentExams);
  const r = await apiClient.get("/student/exams"); return r.data;
}
export async function getStudentExamById(id) {
  if (USE_MOCK) {
    const found = mockStudentExams.find((e) => e.id === id);
    return mockDelay(found || null);
  }
  const r = await apiClient.get(`/student/exams/${id}`); return r.data;
}
export async function getStudentGrades() {
  if (USE_MOCK) return mockDelay(mockStudentGrades);
  const r = await apiClient.get("/student/grades"); return r.data;
}