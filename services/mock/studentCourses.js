/**
 * Mock data for the "My Courses" page.
 *
 * Shaped like we expect AK's real "/student/courses" response to
 * look: a flat list of course objects. Each course carries enough
 * for the card view (progress, attendance, next class) without any
 * extra fields the UI doesn't use.
 *
 * `status`: "in-progress" | "completed" — drives the filter tabs.
 * `needsAttention`: a plain boolean AK (or later PR) can compute
 *   however they like — the UI just reads it to decide what to
 *   surface in "Continue Learning" and doesn't need to know why.
 */
export const mockStudentCourses = [
  {
    id: "c1",
    subjectName: "Database Management Systems",
    code: "CS501",
    teacher: "Dr. Meera Nair",
    progress: 58,
    attendance: 74,
    nextClass: "Tomorrow, 9:00 AM",
    status: "in-progress",
    needsAttention: true,
  },
  {
    id: "c2",
    subjectName: "Java Programming",
    code: "CS503",
    teacher: "Prof. Arjun Verma",
    progress: 72,
    attendance: 90,
    nextClass: "Today, 11:00 AM",
    status: "in-progress",
    needsAttention: false,
  },
  {
    id: "c3",
    subjectName: "Computer Networks",
    code: "CS505",
    teacher: "Dr. Kavita Rao",
    progress: 64,
    attendance: 81,
    nextClass: "Today, 2:00 PM",
    status: "in-progress",
    needsAttention: false,
  },
  {
    id: "c4",
    subjectName: "Operating Systems",
    code: "CS502",
    teacher: "Prof. Sandeep Kulkarni",
    progress: 69,
    attendance: 88,
    nextClass: "Wed, 10:00 AM",
    status: "in-progress",
    needsAttention: false,
  },
  {
    id: "c5",
    subjectName: "Discrete Mathematics",
    code: "MA401",
    teacher: "Dr. Priya Menon",
    progress: 100,
    attendance: 92,
    nextClass: null,
    status: "completed",
    needsAttention: false,
  },
  {
    id: "c6",
    subjectName: "Data Structures & Algorithms",
    code: "CS401",
    teacher: "Prof. Arjun Verma",
    progress: 100,
    attendance: 95,
    nextClass: null,
    status: "completed",
    needsAttention: false,
  },
];
