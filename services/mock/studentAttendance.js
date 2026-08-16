/**
 * Mock data for the Student Attendance page.
 *
 * Shaped like we expect AK's real "/student/attendance" response to
 * look: an overall summary, a subject-wise breakdown, recent records,
 * a weekly trend for the chart, and a humanized insight string.
 *
 * Subject `status` is derived from percentage:
 *   >= 75  → "good"
 *   60–74  → "needs-attention"
 *   < 60   → "critical"
 *
 * Recent record `status`: "present" | "absent" | "late"
 * Recent record `month`: used by the month filter (e.g. "Aug 2026")
 */

function subjectStatus(percentage) {
  if (percentage >= 75) return "good";
  if (percentage >= 60) return "needs-attention";
  return "critical";
}

export const mockStudentAttendance = {
  overall: {
    percentage: 78,
    totalClasses: 50,
    present: 34,
    absent: 11,
    late: 5,
    attended: 39,
    missed: 11,
  },

  insight:
    "Your attendance is 78%. You're doing well in Java, but DBMS attendance could use some attention.",

  subjects: [
    {
      id: "sub1",
      name: "Java",
      teacher: "Prof. Arjun Verma",
      totalClasses: 10,
      present: 8,
      absent: 1,
      late: 1,
      percentage: 90,
      status: subjectStatus(90),
    },
    {
      id: "sub2",
      name: "DBMS",
      teacher: "Dr. Meera Nair",
      totalClasses: 10,
      present: 5,
      absent: 2,
      late: 1,
      percentage: 68,
      status: subjectStatus(68),
    },
    {
      id: "sub3",
      name: "Computer Networks",
      teacher: "Dr. Kavita Rao",
      totalClasses: 10,
      present: 7,
      absent: 1,
      late: 1,
      percentage: 85,
      status: subjectStatus(85),
    },
    {
      id: "sub4",
      name: "Operating Systems",
      teacher: "Prof. Sandeep Kulkarni",
      totalClasses: 10,
      present: 6,
      absent: 2,
      late: 1,
      percentage: 72,
      status: subjectStatus(72),
    },
    {
      id: "sub5",
      name: "Software Engineering",
      teacher: "Prof. Ananya Desai",
      totalClasses: 10,
      present: 4,
      absent: 5,
      late: 1,
      percentage: 55,
      status: subjectStatus(55),
    },
  ],

  recent: [
    {
      date: "16 Aug 2026",
      month: "Aug 2026",
      subject: "Java",
      session: "Unit 4 — Exception Handling",
      status: "present",
    },
    {
      date: "15 Aug 2026",
      month: "Aug 2026",
      subject: "Computer Networks",
      session: "Subnetting Lab",
      status: "present",
    },
    {
      date: "15 Aug 2026",
      month: "Aug 2026",
      subject: "DBMS",
      session: "Normalization Workshop",
      status: "absent",
    },
    {
      date: "14 Aug 2026",
      month: "Aug 2026",
      subject: "Operating Systems",
      session: "Process Scheduling",
      status: "late",
    },
    {
      date: "14 Aug 2026",
      month: "Aug 2026",
      subject: "Software Engineering",
      session: "Requirements Gathering",
      status: "absent",
    },
    {
      date: "13 Aug 2026",
      month: "Aug 2026",
      subject: "Java",
      session: "Inheritance & Polymorphism",
      status: "present",
    },
    {
      date: "13 Aug 2026",
      month: "Aug 2026",
      subject: "DBMS",
      session: "SQL Joins",
      status: "present",
    },
    {
      date: "12 Aug 2026",
      month: "Aug 2026",
      subject: "Computer Networks",
      session: "TCP/IP Fundamentals",
      status: "late",
    },
    {
      date: "30 Jul 2026",
      month: "Jul 2026",
      subject: "Software Engineering",
      session: "SDLC Overview",
      status: "present",
    },
    {
      date: "28 Jul 2026",
      month: "Jul 2026",
      subject: "Operating Systems",
      session: "Memory Management",
      status: "absent",
    },
  ],

  weeklyTrend: [
    { label: "Wk 1", percentage: 68 },
    { label: "Wk 2", percentage: 71 },
    { label: "Wk 3", percentage: 70 },
    { label: "Wk 4", percentage: 75 },
    { label: "Wk 5", percentage: 74 },
    { label: "Wk 6", percentage: 78 },
  ],
};
