import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Courses from "./pages/Courses";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";

import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
import Profile from "./pages/student/Profile";
import StudentCourses from "./pages/student/Courses";
import Assignments from "./pages/student/Assignments";
import AssignmentDetail from "./pages/student/AssignmentDetail";
import Attendance from "./pages/student/Attendance";
import Exams from "./pages/student/Exams";
import ExamDetail from "./pages/student/ExamDetail";
import Grades from "./pages/student/Grades";
import ComingSoon from "./pages/ComingSoon";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC PAGES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />

        {/* ================= ADMIN PAGES ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/students" element={<Students />} />

        {/* ================= STUDENT PORTAL ================= */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="assignments/:id" element={<AssignmentDetail />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="exams" element={<Exams />} />
          <Route path="exams/:id" element={<ExamDetail />} />
          <Route path="grades" element={<Grades />} />
          <Route path="progress" element={<ComingSoon title="My Progress" />} />
          <Route path="recommendations" element={<ComingSoon title="AI Recommendations" />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;