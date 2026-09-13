import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Courses1.css";

import useApiData from "../../hooks/useApiData";

import {
  getProgress,
  getAllLessons,
  getCourseStatus,
  resetProgress,
} from "../../utils/courseProgress";

const BUTTON_LABELS = {
  "not-started": "Start Course",
  "in-progress": "Resume Course",
  completed: "Review",
};

function Courses1() {
  const { courseId } = useParams();

  const {
    data: course,
    loading,
    error,
    refetch,
  } = useApiData(`/courses/${courseId}/`);

  const [status, setStatus] = useState("not-started");

  const [completedCount, setCompletedCount] =
    useState(0);

  const [openModules, setOpenModules] =
    useState({ 0: true });

  useEffect(() => {
    if (!course) return;

    const progressCourse = {
      ...course,
      id: course.slug,
    };

    setStatus(
      getCourseStatus(progressCourse)
    );

    setCompletedCount(
      getProgress(course.slug).completedLessons.length
    );
  }, [course]);

  if (loading) {
    return (
      <div className="course-detail-page standalone">
        <div className="course-detail-container">
          <p style={{ color: "#9aa5b5" }}>
            Loading course...
          </p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-detail-page standalone">
        <div className="course-not-found">
          <h1>Course not found</h1>

          <button type="button" onClick={refetch}>
            Retry
          </button>

          <br />

          <Link to="/courses" className="back-link">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const totalLessons = getAllLessons({
    ...course,
    id: course.slug,
    modules: course.modules || [],
  }).length;

  const percent = totalLessons
    ? Math.round(
        (completedCount / totalLessons) * 100
      )
    : 0;

  const toggleModule = (index) => {
    setOpenModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleReset = () => {
    resetProgress(course.slug);
    setStatus("not-started");
    setCompletedCount(0);
  };

  return (
    <div className="course-detail-page standalone">
      <div className="course-detail-container">
        <Link
          to="/courses"
          className="back-link"
        >
          ← Back to Courses
        </Link>

        <div className="course-detail-grid">

          {/* LEFT SIDE */}
          <div className="course-detail-left">

            <div className="course-badge-wrapper">
              {course.badge_image ? (
                <img
                  src={course.badge_image}
                  alt={course.title}
                  className="course-badge"
                />
              ) : (
                <div className="course-badge-placeholder">
                  Course Image
                </div>
              )}
            </div>

            <section className="detail-block">
              <h3 className="block-heading">
                Course Overview
              </h3>

              {(course.overview || []).map(
                (paragraph, index) => (
                  <p
                    key={index}
                    className="block-paragraph"
                  >
                    {paragraph}
                  </p>
                )
              )}
            </section>

            <hr className="detail-divider" />

            <section className="detail-block">
              <h3 className="block-heading">
                Prerequisites
              </h3>

              <ul className="bullet-list">
                {(course.prerequisites || []).map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </section>

            <hr className="detail-divider" />

            <section className="detail-block">
              <h3 className="block-heading">
                Recommended Reading
              </h3>

              <ul className="reading-list">
                {(
                  course.recommended_reading || []
                ).map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div className="course-detail-right">

            <header className="course-header">
              <h1 className="course-main-title">
                {course.title}
              </h1>

              <p className="course-subtitle">
                {course.subtitle}
              </p>

              <div className="course-progress-row">
                <Link
                  to={`/courses/${course.slug}/learn`}
                  className={`btn-start-course ${status}`}
                >
                  {BUTTON_LABELS[status]}
                </Link>

                {status !== "not-started" && (
                  <p className="course-progress-note">
                    <strong>{percent}%</strong>
                    {" · "}
                    {completedCount}/{totalLessons} lessons
                  </p>
                )}
              </div>

              {status !== "not-started" && (
                <button
                  type="button"
                  className="course-reset-btn"
                  onClick={handleReset}
                >
                  Reset progress
                </button>
              )}
            </header>

            <section className="contents-section">
              <h3 className="contents-heading">
                Contents
              </h3>

              <div className="modules-accordion">
                {(course.modules || []).map(
                  (module, index) => {
                    const isOpen =
                      !!openModules[index];

                    return (
                      <div
                        key={module.id}
                        className="module-group"
                      >
                        <button
                          type="button"
                          className="module-toggle-btn"
                          onClick={() =>
                            toggleModule(index)
                          }
                        >
                          <span className="toggle-symbol">
                            {isOpen ? "−" : "›"}
                          </span>

                          <span className="module-name">
                            {module.title}
                          </span>
                        </button>

                        {isOpen && (
                          <ul className="lesson-list">
                            {(module.lessons || []).map(
                              (lesson) => (
                                <li
                                  key={lesson.id}
                                  className="lesson-item"
                                >
                                  {lesson.title}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses1;