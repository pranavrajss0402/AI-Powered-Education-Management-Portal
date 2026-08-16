/**
 * Mock data for the Assignments module.
 *
 * Shaped like we expect AK's real "/student/assignments" response
 * to look. Unlike the other mock files, this one is exported as a
 * `let` (not `const`) — the submission flow actually needs to
 * change an assignment's status in place, so this acts as a tiny
 * in-memory stand-in for a database table during development.
 *
 * `dueIn`: a short, already-human-friendly phrase for the list view
 *   ("Due tomorrow", "Overdue by 2 days") — kept as plain text
 *   instead of a raw date so the UI never has to do date math.
 * `dueSoon`: true if this pending assignment is due today/tomorrow —
 *   drives the "Due soon" summary count.
 * `status`: "pending" | "submitted" | "graded" | "overdue"
 */
export let mockStudentAssignments = [
  {
    id: "asn1",
    title: "Normalization Practice Set",
    subject: "Database Management Systems",
    teacher: "Dr. Meera Nair",
    dueDate: "18 Aug 2026, 11:59 PM",
    dueIn: "Due tomorrow",
    dueSoon: true,
    maxMarks: 20,
    marksObtained: null,
    status: "pending",
    description:
      "Apply normalization rules to the sample college database schema provided in class and identify the correct normal form for each table.",
    instructions: [
      "Use the schema shared in the DBMS Unit 3 slides",
      "Show your working for each normal form, not just the final answer",
      "Submit as a single PDF",
    ],
    submittedOn: null,
    submissionFileName: null,
  },
  {
    id: "asn2",
    title: "Inheritance & Polymorphism Exercise",
    subject: "Java Programming",
    teacher: "Prof. Arjun Verma",
    dueDate: "20 Aug 2026, 11:59 PM",
    dueIn: "Due in 3 days",
    dueSoon: false,
    maxMarks: 15,
    marksObtained: null,
    status: "pending",
    description:
      "Implement a small class hierarchy demonstrating inheritance and polymorphism, based on the vehicle example discussed in class.",
    instructions: [
      "Include at least one abstract class and two subclasses",
      "Override at least one method to show polymorphism in action",
      "Comment your code briefly explaining each override",
    ],
    submittedOn: null,
    submissionFileName: null,
  },
  {
    id: "asn3",
    title: "Subnetting Worksheet",
    subject: "Computer Networks",
    teacher: "Dr. Kavita Rao",
    dueDate: "15 Aug 2026, 11:59 PM",
    dueIn: "Submitted",
    dueSoon: false,
    maxMarks: 15,
    marksObtained: null,
    status: "submitted",
    description:
      "Solve the subnetting problems from the worksheet and show the subnet mask, network address, and broadcast address for each.",
    instructions: [
      "Show your calculation steps, not just final values",
      "Use CIDR notation throughout",
    ],
    submittedOn: "15 Aug 2026, 6:20 PM",
    submissionFileName: "subnetting_worksheet.pdf",
  },
  {
    id: "asn4",
    title: "Process Scheduling Report",
    subject: "Operating Systems",
    teacher: "Prof. Sandeep Kulkarni",
    dueDate: "10 Aug 2026, 11:59 PM",
    dueIn: "Graded",
    dueSoon: false,
    maxMarks: 20,
    marksObtained: 17,
    status: "graded",
    description:
      "Compare FCFS, SJF, and Round Robin scheduling algorithms using the sample process set provided, and report average waiting time for each.",
    instructions: [
      "Include a Gantt chart for each algorithm",
      "Clearly state your assumptions about time quantum for Round Robin",
    ],
    submittedOn: "9 Aug 2026, 8:05 PM",
    submissionFileName: "scheduling_report.pdf",
  },
  {
    id: "asn5",
    title: "Exception Handling Lab",
    subject: "Java Programming",
    teacher: "Prof. Arjun Verma",
    dueDate: "5 Aug 2026, 11:59 PM",
    dueIn: "Graded",
    dueSoon: false,
    maxMarks: 10,
    marksObtained: 9,
    status: "graded",
    description:
      "Write a small program that reads user input and handles at least three different exception types gracefully.",
    instructions: [
      "Use try-catch-finally correctly",
      "Include one custom exception class",
    ],
    submittedOn: "5 Aug 2026, 4:15 PM",
    submissionFileName: "exception_lab.java",
  },
  {
    id: "asn6",
    title: "ER Diagram Assignment",
    subject: "Database Management Systems",
    teacher: "Dr. Meera Nair",
    dueDate: "14 Aug 2026, 11:59 PM",
    dueIn: "Overdue by 2 days",
    dueSoon: false,
    maxMarks: 10,
    marksObtained: null,
    status: "overdue",
    description:
      "Design an ER diagram for a college library management system, covering books, members, and issue/return records.",
    instructions: [
      "Clearly mark primary keys and relationships",
      "Include cardinality for every relationship",
    ],
    submittedOn: null,
    submissionFileName: null,
  },
];
