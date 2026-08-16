/**
 * Mock data for the student dashboard.
 *
 * IMPORTANT: this is shaped the way we EXPECT AK's real API response
 * to look. That's intentional — when the backend is ready, we should
 * only need to change how this data is fetched (in services/api.js),
 * not how every component uses it. If AK's actual shape differs,
 * update this file to match and the rest of the app keeps working.
 */
export const mockDashboardData = {
  student: {
    name: "Aditi Sharma",
    course: "B.Tech CSE",
    semester: 5,
  },

  todaysClasses: [
    { time: "9:00 AM", subject: "Database Management Systems", room: "Room 204", status: "upcoming" },
    { time: "11:00 AM", subject: "Java Programming", room: "Lab 2", status: "upcoming" },
    { time: "2:00 PM", subject: "Computer Networks", room: "Room 108", status: "upcoming" },
  ],

  assignmentsDue: [
    { id: "a1", title: "Normalization Practice Set", course: "DBMS", dueIn: "Due tomorrow" },
    { id: "a2", title: "Inheritance & Polymorphism Exercise", course: "Java", dueIn: "Due in 3 days" },
    { id: "a3", title: "Subnetting Worksheet", course: "Computer Networks", dueIn: "Due in 5 days" },
  ],

  attendance: {
    overall: 82,
    trend: "improved", // "improved" | "declined" | "steady"
    note: "Your attendance has improved this month.",
  },

  courseHighlight: {
    course: "Java Programming",
    message: "You're doing well in Java — your last two test scores were above class average.",
  },

  insights: [
    {
      subject: "DBMS",
      tone: "warning",
      message: "Recent scores have dropped a little compared to last month.",
      actions: ["Review Unit 3 — Normalization", "Complete the pending assignment", "Practice SQL questions"],
    },
  ],
};
