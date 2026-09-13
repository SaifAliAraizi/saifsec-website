import "./Courses.css";
import { Link } from "react-router-dom";
import useApiData from "../../hooks/useApiData";

function Courses() {
  const { data, loading, error, refetch } = useApiData("/courses/");

  if (loading) {
    return (
      <section className="courses-section">
        <div className="courses-container">
          Loading courses...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="courses-section">
        <div className="courses-container">
          <div>
            <p>Error loading courses.</p>
            <button type="button" onClick={refetch}>
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  const courses = Array.isArray(data) ? data : [];

  return (
    <section className="courses-section" id="courses">
      <div className="courses-container">
        {courses.map((course) => (
          <Link
            to={`/courses/${course.slug}`}
            key={course.id}
            className="course-card-link"
            target="_blank"
            rel="noreferrer"
          >
            <article className="course-card">
              <div className="course-image-wrapper">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-image"
                  />
                ) : (
                  <div className="course-image-placeholder">
                    No course image
                  </div>
                )}
              </div>

              <div className="course-content">
                <h2 className="course-title">
                  {course.title}
                </h2>

                <p className="course-description">
                  {course.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Courses;