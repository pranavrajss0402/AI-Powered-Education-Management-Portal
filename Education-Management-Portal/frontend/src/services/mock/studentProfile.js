/**
 * Mock data for the Student Profile page.
 *
 * Shaped the way we expect AK's real "/student/profile" response
 * to look: a personal info block, an academic info block, and a
 * small academic snapshot (attendance/CGPA) that's already being
 * computed elsewhere (attendance from AK, CGPA likely from AK too —
 * NOT from PR's AI model, this is just plain stored data).
 */
export const mockStudentProfile = {
  name: "Aditi Sharma",
  rollNumber: "21CSE1042",
  email: "aditi.sharma@college.edu",
  phone: "+91 98765 43210",
  dateOfBirth: "14 March 2003",
  bloodGroup: "O+",
  address: "Whitefield, Bengaluru, Karnataka",

  academic: {
    course: "B.Tech Computer Science & Engineering",
    semester: 5,
    batch: "2021 – 2025",
    section: "CSE-B",
    advisor: "Dr. Rangarajan Iyer",
  },

  snapshot: {
    cgpa: 8.3,
    attendance: 82,
  },
};
