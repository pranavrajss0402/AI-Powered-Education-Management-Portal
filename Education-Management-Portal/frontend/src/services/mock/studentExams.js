/**
 * Mock data for the Exams module.
 *
 * Shaped like we expect AK's real "/student/exams" response to look.
 * `status`: "upcoming" | "completed"
 * `date`: human-readable date for display (no date math in the UI)
 * `startTime`: when the exam begins
 * `duration`: how long the student has to complete it
 * `examType`: mid-term, unit test, practical, final, etc.
 */
export const mockStudentExams = [
  {
    id: "exm1",
    title: "Mid-term Examination",
    subject: "Java Programming",
    date: "22 Aug 2026",
    startTime: "10:00 AM",
    duration: "2 hours",
    examType: "Mid-term",
    status: "upcoming",
    instructions: [
      "Report to Lab 204 at least 15 minutes before the start time",
      "Bring your college ID card and a blue or black pen",
      "No mobile phones or smartwatches allowed inside the exam hall",
      "The exam covers Units 1–4: OOP basics, inheritance, collections, and exception handling",
    ],
  },
  {
    id: "exm2",
    title: "Unit Test 2",
    subject: "Database Management Systems",
    date: "25 Aug 2026",
    startTime: "2:00 PM",
    duration: "1 hour",
    examType: "Unit Test",
    status: "upcoming",
    instructions: [
      "Report to Room 301 by 1:45 PM",
      "Bring your college ID card",
      "Covers normalization, ER diagrams, and SQL queries from Unit 3",
      "Calculators are not permitted",
    ],
  },
  {
    id: "exm3",
    title: "Practical Examination",
    subject: "Operating Systems",
    date: "28 Aug 2026",
    startTime: "9:30 AM",
    duration: "2 hours 30 minutes",
    examType: "Practical",
    status: "upcoming",
    instructions: [
      "Report to the OS Lab (Block B, Ground Floor) at 9:15 AM",
      "You will be given a process scheduling problem to implement in C",
      "No internet access during the exam",
      "Submit your code and a short written explanation of your approach",
    ],
  },
  {
    id: "exm4",
    title: "Unit Test 1",
    subject: "Computer Networks",
    date: "28 Jul 2026",
    startTime: "11:00 AM",
    duration: "1 hour",
    examType: "Unit Test",
    status: "completed",
    instructions: [
      "Report to Room 205 by 10:45 AM",
      "Bring your college ID card",
      "Covers OSI model, TCP/IP basics, and subnetting from Unit 2",
    ],
  },
  {
    id: "exm5",
    title: "Unit Test 1",
    subject: "Java Programming",
    date: "15 Jul 2026",
    startTime: "10:00 AM",
    duration: "1 hour",
    examType: "Unit Test",
    status: "completed",
    instructions: [
      "Report to Lab 204 at least 10 minutes early",
      "Covers variables, control flow, methods, and basic OOP from Unit 1",
      "No reference material allowed",
    ],
  },
  {
    id: "exm6",
    title: "Practical Examination",
    subject: "Database Management Systems",
    date: "5 Aug 2026",
    startTime: "2:00 PM",
    duration: "2 hours",
    examType: "Practical",
    status: "completed",
    instructions: [
      "Report to the DBMS Lab by 1:45 PM",
      "Write SQL queries for the given schema and explain your normalization steps",
      "You may use the lab computers — no personal laptops",
    ],
  },
  {
    id: "exm7",
    title: "Internal Assessment",
    subject: "Operating Systems",
    date: "10 Aug 2026",
    startTime: "3:00 PM",
    duration: "1 hour 30 minutes",
    examType: "Internal Assessment",
    status: "completed",
    instructions: [
      "Report to Room 102 by 2:45 PM",
      "Short-answer and diagram-based questions on process management and memory allocation",
      "Bring a pencil for drawing Gantt charts",
    ],
  },
];
