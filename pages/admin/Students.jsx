import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

function Students() {
  const [students, setStudents] = useState([
    {
      id: "STU001",
      name: "Arun Kumar",
      email: "arun@example.com",
      course: "Computer Science",
      status: "Active",
    },
    {
      id: "STU002",
      name: "Priya Sharma",
      email: "priya@example.com",
      course: "Information Technology",
      status: "Active",
    },
    {
      id: "STU003",
      name: "Rahul Singh",
      email: "rahul@example.com",
      course: "Data Science",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "Computer Science",
  });

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.id.toLowerCase().includes(searchText);

    const matchesCourse =
      course === "All" || student.course === course;

    return matchesSearch && matchesCourse;
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  }

  function addStudent(event) {
    event.preventDefault();

    if (!newStudent.name || !newStudent.email) {
      alert("Please enter student name and email.");
      return;
    }

    const student = {
      id: `STU${String(students.length + 1).padStart(3, "0")}`,
      name: newStudent.name,
      email: newStudent.email,
      course: newStudent.course,
      status: "Active",
    };

    setStudents([...students, student]);

    setNewStudent({
      name: "",
      email: "",
      course: "Computer Science",
    });

    setShowForm(false);
  }

  function deleteStudent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmed) {
      setStudents(
        students.filter((student) => student.id !== id)
      );
    }
  }

  return (
    <AdminLayout>

      <div className="students-page">

        {/* PAGE HEADER */}

        <div className="students-header">

          <div>
            <p className="dashboard-label">
              ADMIN PORTAL
            </p>

            <h1>Student Management</h1>

            <p>
              View and manage students enrolled in the portal.
            </p>
          </div>

          <button
            className="add-student-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "× Close" : "+ Add Student"}
          </button>

        </div>

        {/* ADD STUDENT FORM */}

        {showForm && (
          <div className="student-form-card">

            <div className="student-form-heading">
              <div>
                <h2>Add New Student</h2>
                <p>
                  Enter the student's information below.
                </p>
              </div>
            </div>

            <form onSubmit={addStudent}>

              <div className="student-form-grid">

                <div className="student-input-group">
                  <label htmlFor="student-name">
                    Student Name
                  </label>

                  <input
                    id="student-name"
                    type="text"
                    name="name"
                    placeholder="Enter student name"
                    value={newStudent.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="student-input-group">
                  <label htmlFor="student-email">
                    Email Address
                  </label>

                  <input
                    id="student-email"
                    type="email"
                    name="email"
                    placeholder="Enter student email"
                    value={newStudent.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="student-input-group">
                  <label htmlFor="student-course">
                    Course
                  </label>

                  <select
                    id="student-course"
                    name="course"
                    value={newStudent.course}
                    onChange={handleInputChange}
                  >
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Data Science</option>
                  </select>
                </div>

              </div>

              <div className="student-form-actions">

                <button
                  type="button"
                  className="secondary-student-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-student-button"
                >
                  Add Student
                </button>

              </div>

            </form>

          </div>
        )}

        {/* SEARCH */}

        <div className="student-toolbar">

          <div className="student-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by name, ID or email..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          <select
            value={course}
            onChange={(event) =>
              setCourse(event.target.value)
            }
          >
            <option value="All">
              All Courses
            </option>

            <option value="Computer Science">
              Computer Science
            </option>

            <option value="Information Technology">
              Information Technology
            </option>

            <option value="Data Science">
              Data Science
            </option>
          </select>

        </div>

        {/* TABLE */}

        <div className="students-table-card">

          <div className="table-header">

            <div>
              <h2>Students</h2>

              <p>
                Manage enrolled students and their courses.
              </p>
            </div>

            <span className="student-count">
              {filteredStudents.length} students
            </span>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="empty-students"
                    >
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>

                      <td>
                        <span className="student-id">
                          {student.id}
                        </span>
                      </td>

                      <td>
                        <div className="student-name-cell">

                          <div className="student-avatar">
                            {student.name.charAt(0)}
                          </div>

                          <strong>
                            {student.name}
                          </strong>

                        </div>
                      </td>

                      <td>
                        <span className="student-email">
                          {student.email}
                        </span>
                      </td>

                      <td>
                        {student.course}
                      </td>

                      <td>
                        <span className="status-active">
                          ● {student.status}
                        </span>
                      </td>

                      <td>

                        <div className="student-actions">

                          <button
                            className="action-button"
                            onClick={() =>
                              alert(
                                `Student: ${student.name}\nEmail: ${student.email}\nCourse: ${student.course}`
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            className="action-button delete-button"
                            onClick={() =>
                              deleteStudent(student.id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default Students;