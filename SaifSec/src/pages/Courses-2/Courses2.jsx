import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaBookOpen,
  FaCheckCircle,
  FaRegCircle,
  FaChevronDown,
  FaChevronRight,
  FaSun,
  FaMoon,
  FaDesktop,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import "./Courses2.css";
import useApiData from "../../hooks/useApiData";
import {
  getProgress,
  saveProgress,
  getAllLessons,
} from "../../utils/courseProgress";

function Courses2() {
  const { courseId } = useParams(); // this is the slug: cybersecurity-fundamentals
  const { data: course, loading, error } = useApiData(`/courses/${courseId}/`);
  const navigate = useNavigate();
  const mainRef = useRef(null);

  const allLessons = useMemo(() => {
    if (!course) return [];
    return getAllLessons(course);
  }, [course]);

  const totalLessons = allLessons.length;

  const [progress, setProgress] = useState(() => getProgress(courseId));
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [openModules, setOpenModules] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");

  // 1. Init current lesson AFTER api loads
  useEffect(() => {
    if (!course || allLessons.length === 0) return;
    if (currentLessonId) return;

    const saved = getProgress(courseId);
    const exists = allLessons.some(
      (l) => String(l.id) === String(saved.lastLessonId)
    );
    setCurrentLessonId(
      exists ? saved.lastLessonId : allLessons[0].id
    );
  }, [course, allLessons, courseId, currentLessonId]);

  const currentIndex = Math.max(
    0,
    allLessons.findIndex((l) => String(l.id) === String(currentLessonId))
  );
  const currentLesson = allLessons[currentIndex];

  // 2. Persist progress
  useEffect(() => {
    saveProgress(courseId, progress);
  }, [progress, courseId]);

  // 3. Mark started + open active module
  useEffect(() => {
    if (!currentLesson) return;
    setProgress((prev) => {
      if (
        prev.started &&
        String(prev.lastLessonId) === String(currentLesson.id)
      )
        return prev;
      return { ...prev, started: true, lastLessonId: currentLesson.id };
    });
    setOpenModules((prev) => ({ ...prev, [currentLesson.moduleId]: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLesson?.id]);

  if (loading) {
    return (
      <div className="course-player-page">
        <div className="player-not-found">
          <p style={{ color: "#9aa5b5" }}>Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-player-page">
        <div className="player-not-found">
          <h1>Failed to load course</h1>
          <Link to="/courses">← Back to Courses</Link>
        </div>
      </div>
    );
  }

  if (course && totalLessons === 0) {
    return (
      <div className="course-player-page">
        <div className="player-not-found">
          <h1>{course.title}</h1>
          <p style={{ color: "#9aa5b5", margin: "12px 0" }}>
            No lessons published yet. Add Modules + Lessons in Django Admin for
            slug: {course.slug}
          </p>
          <Link to={`/courses/${course.slug}`}>← Back to Detail</Link>
        </div>
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="course-player-page">
        <div className="player-not-found">
          <h1>Course not found</h1>
          <Link to="/courses">← Back to Courses</Link>
        </div>
      </div>
    );
  }

  const completedCount = progress.completedLessons.length;
  const percent = totalLessons
    ? Math.round((completedCount / totalLessons) * 100)
    : 0;
  const courseFinished = totalLessons > 0 && completedCount >= totalLessons;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalLessons - 1;

  const isLessonDone = (id) =>
    progress.completedLessons.some((cId) => String(cId) === String(id));

  const goToLesson = (id) => {
    setCurrentLessonId(id);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrevious = () =>
    !isFirst && goToLesson(allLessons[currentIndex - 1].id);
  const goNext = () =>
    !isLast && goToLesson(allLessons[currentIndex + 1].id);

  const handleSaveAndNext = () => {
    setProgress((prev) =>
      prev.completedLessons.some(
        (cId) => String(cId) === String(currentLesson.id)
      )
        ? prev
        : {
            ...prev,
            completedLessons: [
              ...prev.completedLessons,
              currentLesson.id,
            ],
          }
    );
    if (!isLast) goNext();
  };

  const toggleModule = (id) =>
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));

  const applySystemTheme = () =>
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

  const lessonDone = isLessonDone(currentLesson.id);
  const sections = Array.isArray(currentLesson.sections)
    ? currentLesson.sections
    : [];

  return (
    <div className="course-player-page">
      <div
        className={`course-player ${theme} ${
          sidebarOpen ? "" : "sidebar-collapsed"
        }`}
      >
        <nav className="player-rail" aria-label="Player navigation">
          <button
            type="button"
            className={`rail-btn ${sidebarOpen ? "active" : ""}`}
            onClick={() => setSidebarOpen((v) => !v)}
            title="Toggle chapters"
          >
            <FaBookOpen />
            <span>Chapters</span>
          </button>
        </nav>

        {sidebarOpen && (
          <aside className="player-sidebar">
            <div className="sidebar-title">Course Content</div>
            <div className="sidebar-modules">
              {course.modules.map((mod) => {
                const doneInModule = (mod.lessons || []).filter((l) =>
                  isLessonDone(l.id)
                ).length;
                const isOpen = !!openModules[mod.id];
                return (
                  <div key={mod.id} className="sidebar-module">
                    <button
                      type="button"
                      className="module-header"
                      onClick={() => toggleModule(mod.id)}
                    >
                      <span className="module-chevron">
                        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                      </span>
                      <span className="module-title">{mod.title}</span>
                      <span className="module-count">
                        {doneInModule}/{(mod.lessons || []).length}
                      </span>
                    </button>
                    {isOpen && (
                      <ul className="module-lessons">
                        {(mod.lessons || []).map((l) => (
                          <li key={l.id}>
                            <button
                              type="button"
                              className={`lesson-btn ${
                                String(l.id) === String(currentLesson.id)
                                  ? "active"
                                  : ""
                              } ${isLessonDone(l.id) ? "done" : ""}`}
                              onClick={() => goToLesson(l.id)}
                            >
                              <span className="lesson-label">{l.title}</span>
                              <span className="lesson-status">
                                {isLessonDone(l.id) ? (
                                  <FaCheckCircle />
                                ) : (
                                  <FaRegCircle />
                                )}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="sidebar-progress">
              <div className="progress-text">
                <span>
                  {completedCount}/{totalLessons} Lessons
                </span>
                <span>{percent}%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </aside>
        )}

        <main className="player-main" ref={mainRef}>
          <header className="player-header">
            <span className="player-breadcrumb">
              {course.title} — {currentLesson.title}
            </span>
            <div className="player-controls">
              <button
                type="button"
                className={theme === "light" ? "active" : ""}
                onClick={() => setTheme("light")}
                title="Light mode"
              >
                <FaSun />
              </button>
              <button
                type="button"
                className={theme === "dark" ? "active" : ""}
                onClick={() => setTheme("dark")}
                title="Dark mode"
              >
                <FaMoon />
              </button>
              <button type="button" onClick={applySystemTheme} title="System">
                <FaDesktop />
              </button>
              <button
                type="button"
                onClick={() => navigate(`/courses/${course.slug}`)}
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
          </header>

          {courseFinished && (
            <div className="course-finished-banner">
              🎉 Course completed! The course page button now shows{" "}
              <strong>Review</strong>.
            </div>
          )}

          <article className="lesson-article">
            <h1 className="lesson-title">{currentLesson.title}</h1>
            {sections.length === 0 && (
              <p style={{ color: "#8a96a3" }}>
                Content for this lesson is not added yet. Edit Lesson in admin
                → sections JSON.
              </p>
            )}
            {sections.map((section, idx) => (
              <section key={idx} className="lesson-section">
                <h2>{section.heading}</h2>
                {(section.paragraphs || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {(section.bullets || []) && (
                  <ul>
                    {(section.bullets || []).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          <footer className="lesson-nav">
            <button
              type="button"
              className="nav-btn"
              onClick={goPrevious}
              disabled={isFirst}
            >
              <FaArrowLeft /> Previous
            </button>
            <button
              type="button"
              className={`complete-btn ${lessonDone ? "done" : ""}`}
              onClick={handleSaveAndNext}
              disabled={isLast && lessonDone}
            >
              {lessonDone
                ? isLast
                  ? "Course Completed ✓"
                  : "Saved ✓ — Next"
                : isLast
                ? "Save & Finish"
                : "Save & Next"}
            </button>
            <button
              type="button"
              className="nav-btn"
              onClick={goNext}
              disabled={isLast}
            >
              Next <FaArrowRight />
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Courses2;