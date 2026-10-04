import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
   fetch("https://mern-student-management-system-1e3q.onrender.com/api/students")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="app">

      <div className="noise"></div>

      <header className="header">
        <div className="brand">
          <div className="brand-box">S</div>
          <span>STUDENTHUB</span>
        </div>

        <div className="live">
          <span className="live-dot"></span>
          DATABASE LIVE
        </div>
      </header>

      <main>

        <section className="hero">
          <div className="hero-number">01</div>

          <div className="hero-content">
            <p className="label">ADMINISTRATION / DIRECTORY</p>

            <h1>
              Student
              <br />
              <span>Management</span>
            </h1>

            <p className="description">
              A live student directory powered by
              MongoDB Atlas and the MERN stack.
            </p>
          </div>
        </section>

        <section className="overview">

          <div className="overview-title">
            <span>OVERVIEW</span>
            <span>2026</span>
          </div>

          <div className="stats">

            <div className="stat primary">
              <div className="stat-label">
                TOTAL STUDENTS
                <span>01</span>
              </div>

              <div className="stat-value">
                {String(students.length).padStart(2, "0")}
              </div>

              <div className="stat-footer">
                Active records
              </div>
            </div>

            <div className="stat">
              <div className="stat-label">
                DATABASE
                <span>02</span>
              </div>

              <div className="database-name">
                MongoDB
                <br />
                <span>Atlas</span>
              </div>

              <div className="stat-footer">
                ● Connected
              </div>
            </div>

            <div className="stat">
              <div className="stat-label">
                API STATUS
                <span>03</span>
              </div>

              <div className="api-status">
                <span></span>
                ONLINE
              </div>

              <div className="stat-footer">
                Express · Port 5001
              </div>
            </div>

          </div>
        </section>

        <section className="directory">

          <div className="directory-header">
            <div>
              <p className="label">LIVE DIRECTORY</p>
              <h2>Students</h2>
            </div>

            <div className="directory-count">
              {String(students.length).padStart(2, "0")} RECORDS
            </div>
          </div>

          <div className="student-list">

            {students.map((student, index) => (

              <div className="student-row" key={student._id}>

                <div className="row-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="avatar">
                  {student.name.charAt(0).toUpperCase()}
                </div>

                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p>{student.email}</p>
                </div>

                <div className="course-info">
                  <span>COURSE</span>
                  <strong>{student.course}</strong>
                </div>

                <div className="student-id">
                  <span>ID</span>
                  #{student._id.slice(-6).toUpperCase()}
                </div>

                <div className="arrow">
                  ↗
                </div>

              </div>

            ))}

          </div>

          {students.length === 0 && (
            <div className="empty">
              No students found in the database.
            </div>
          )}

        </section>

      </main>

      <footer>
        <span>STUDENTHUB</span>
        <span>BUILD 01</span>
        <span>MERN / MONGODB / EXPRESS / REACT / NODE</span>
      </footer>

    </div>
  );
}

export default App;