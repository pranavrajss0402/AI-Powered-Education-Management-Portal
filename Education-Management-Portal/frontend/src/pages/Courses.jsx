import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Computer Science",
    category: "Technology",
    teacher: "Dr. Kumar",
    duration: "6 Months",
  },
  {
    id: 2,
    title: "Data Science",
    category: "Technology",
    teacher: "Dr. Priya",
    duration: "6 Months",
  },
  {
    id: 3,
    title: "Business Management",
    category: "Management",
    teacher: "Prof. Arun",
    duration: "4 Months",
  },
  {
    id: 4,
    title: "Mathematics",
    category: "Science",
    teacher: "Dr. Ravi",
    duration: "5 Months",
  },
  {
    id: 5,
    title: "Physics",
    category: "Science",
    teacher: "Dr. Meena",
    duration: "5 Months",
  },
  {
    id: 6,
    title: "English Literature",
    category: "Arts",
    teacher: "Prof. Anitha",
    duration: "4 Months",
  },
];

function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || course.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="courses-page">
      <header className="courses-header">
        <h1>Courses</h1>
        <p>Explore our academic programs.</p>
      </header>

      <section className="course-controls">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Science">Science</option>
          <option value="Management">Management</option>
          <option value="Arts">Arts</option>
        </select>
      </section>

      <section className="course-grid">
        {filteredCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <span className="course-category">
              {course.category}
            </span>

            <h2>{course.title}</h2>

            <p>
              <strong>Teacher:</strong> {course.teacher}
            </p>

            <p>
              <strong>Duration:</strong> {course.duration}
            </p>

            <button>View Course</button>
          </div>
        ))}
      </section>

      {filteredCourses.length === 0 && (
        <p className="no-courses">No courses found.</p>
      )}
    </div>
  );
}

export default Courses;