/**
 * Mock data for the Student Grades page.
 *
 * Shaped like we expect AK's real "/student/grades" response to look.
 * Marks are internally consistent: total = internal + assignment + examination.
 * Percentage and grade are derived from total / maxMarks.
 *
 * Subject `status` from percentage:
 *   >= 75  → "good"
 *   60–74  → "needs-attention"
 *   < 60   → "critical"
 *
 * Teachers match the Attendance module for consistency.
 */

function letterGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  return "F";
}

function subjectStatus(percentage) {
  if (percentage >= 75) return "good";
  if (percentage >= 60) return "needs-attention";
  return "critical";
}

function buildSubject({
  id,
  name,
  teacher,
  semester,
  internal,
  assignment,
  examination,
  maxInternal = 20,
  maxAssignment = 20,
  maxExamination = 60,
}) {
  const maxMarks = maxInternal + maxAssignment + maxExamination;
  const totalMarks = internal + assignment + examination;
  const percentage = Math.round((totalMarks / maxMarks) * 100);

  return {
    id,
    name,
    teacher,
    semester,
    internalMarks: internal,
    maxInternalMarks: maxInternal,
    assignmentMarks: assignment,
    maxAssignmentMarks: maxAssignment,
    examinationMarks: examination,
    maxExaminationMarks: maxExamination,
    totalMarks,
    maxMarks,
    percentage,
    grade: letterGrade(percentage),
    status: subjectStatus(percentage),
  };
}

const sem5Subjects = [
  buildSubject({
    id: "grd1",
    name: "Java",
    teacher: "Prof. Arjun Verma",
    semester: "sem5",
    internal: 18,
    assignment: 17,
    examination: 49,
  }),
  buildSubject({
    id: "grd2",
    name: "DBMS",
    teacher: "Dr. Meera Nair",
    semester: "sem5",
    internal: 14,
    assignment: 12,
    examination: 38,
  }),
  buildSubject({
    id: "grd3",
    name: "Computer Networks",
    teacher: "Dr. Kavita Rao",
    semester: "sem5",
    internal: 17,
    assignment: 16,
    examination: 47,
  }),
  buildSubject({
    id: "grd4",
    name: "Operating Systems",
    teacher: "Prof. Sandeep Kulkarni",
    semester: "sem5",
    internal: 16,
    assignment: 15,
    examination: 45,
  }),
  buildSubject({
    id: "grd5",
    name: "Software Engineering",
    teacher: "Prof. Ananya Desai",
    semester: "sem5",
    internal: 15,
    assignment: 14,
    examination: 47,
  }),
];

const sem4Subjects = [
  buildSubject({
    id: "grd6",
    name: "Java",
    teacher: "Prof. Arjun Verma",
    semester: "sem4",
    internal: 16,
    assignment: 15,
    examination: 44,
  }),
  buildSubject({
    id: "grd7",
    name: "DBMS",
    teacher: "Dr. Meera Nair",
    semester: "sem4",
    internal: 15,
    assignment: 13,
    examination: 40,
  }),
  buildSubject({
    id: "grd8",
    name: "Computer Networks",
    teacher: "Dr. Kavita Rao",
    semester: "sem4",
    internal: 14,
    assignment: 14,
    examination: 42,
  }),
  buildSubject({
    id: "grd9",
    name: "Operating Systems",
    teacher: "Prof. Sandeep Kulkarni",
    semester: "sem4",
    internal: 13,
    assignment: 12,
    examination: 41,
  }),
  buildSubject({
    id: "grd10",
    name: "Software Engineering",
    teacher: "Prof. Ananya Desai",
    semester: "sem4",
    internal: 12,
    assignment: 11,
    examination: 39,
  }),
];

function computeOverall(subjects) {
  const totalSubjects = subjects.length;
  const percentage = Math.round(
    subjects.reduce((sum, s) => sum + s.percentage, 0) / totalSubjects,
  );
  const passedSubjects = subjects.filter((s) => s.percentage >= 50).length;
  const needsAttentionCount = subjects.filter(
    (s) => s.status === "needs-attention" || s.status === "critical",
  ).length;
  const strongest = [...subjects].sort((a, b) => b.percentage - a.percentage)[0];
  const weakest = [...subjects].sort((a, b) => a.percentage - b.percentage)[0];

  return {
    percentage,
    termGpa: Number((percentage / 10).toFixed(1)),
    cgpa: 8.3,
    totalSubjects,
    passedSubjects,
    needsAttentionCount,
    recentPerformance: "improved",
    strongest: { name: strongest.name, percentage: strongest.percentage },
    weakest: { name: weakest.name, percentage: weakest.percentage },
  };
}

const sem5Overall = computeOverall(sem5Subjects);
const sem4Overall = computeOverall(sem4Subjects);

export const mockStudentGrades = {
  semesters: [
    { key: "sem5", label: "Semester 5 (Current)" },
    { key: "sem4", label: "Semester 4" },
  ],

  defaultSemester: "sem5",

  overall: {
    ...sem5Overall,
    insight: `You're currently averaging ${sem5Overall.percentage}% this term. ${sem5Overall.strongest.name} is your strongest subject, while ${sem5Overall.weakest.name} has the most room for improvement.`,
  },

  subjects: [...sem5Subjects, ...sem4Subjects],

  recentResults: [
    {
      id: "res1",
      name: "Java Midterm",
      subject: "Java",
      semester: "sem5",
      date: "28 Jul 2026",
      marksObtained: 49,
      maxMarks: 60,
      percentage: 82,
      grade: "A",
    },
    {
      id: "res2",
      name: "DBMS Unit Test 2",
      subject: "DBMS",
      semester: "sem5",
      date: "5 Aug 2026",
      marksObtained: 38,
      maxMarks: 60,
      percentage: 63,
      grade: "B",
    },
    {
      id: "res3",
      name: "Computer Networks Internal",
      subject: "Computer Networks",
      semester: "sem5",
      date: "8 Aug 2026",
      marksObtained: 47,
      maxMarks: 60,
      percentage: 78,
      grade: "B+",
    },
    {
      id: "res4",
      name: "OS Practical Assessment",
      subject: "Operating Systems",
      semester: "sem5",
      date: "10 Aug 2026",
      marksObtained: 45,
      maxMarks: 60,
      percentage: 75,
      grade: "B+",
    },
    {
      id: "res5",
      name: "Software Engineering Assignment Review",
      subject: "Software Engineering",
      semester: "sem5",
      date: "12 Aug 2026",
      marksObtained: 14,
      maxMarks: 20,
      percentage: 70,
      grade: "B+",
    },
    {
      id: "res6",
      name: "Java End-Semester",
      subject: "Java",
      semester: "sem4",
      date: "15 May 2026",
      marksObtained: 44,
      maxMarks: 60,
      percentage: 73,
      grade: "B+",
    },
    {
      id: "res7",
      name: "DBMS Final Exam",
      subject: "DBMS",
      semester: "sem4",
      date: "18 May 2026",
      marksObtained: 40,
      maxMarks: 60,
      percentage: 67,
      grade: "B",
    },
  ],

  // Subject comparison for the bar chart (current semester)
  subjectComparison: sem5Subjects.map((s) => ({
    label: s.name.length > 10 ? s.name.split(" ")[0] : s.name,
    value: s.percentage,
  })),

  // Recent assessment trend — most recent last
  performanceTrend: [
    { label: "Assess 1", value: 68 },
    { label: "Assess 2", value: 71 },
    { label: "Assess 3", value: 70 },
    { label: "Assess 4", value: 74 },
    { label: "Assess 5", value: 76 },
  ],

  insights: [
    "Your performance has improved compared with your previous assessment.",
    "You're performing consistently in Computer Networks.",
    "DBMS is the subject where improving your next assessment score would have the biggest impact.",
  ],

  // Per-semester overall snapshots for the term filter
  semesterOverall: {
    sem5: sem5Overall,
    sem4: sem4Overall,
  },
};
