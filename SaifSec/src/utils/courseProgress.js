const PREFIX = "saifsec-course-progress-";

const empty = () => ({
  started: false,
  completedLessons: [],
  lastLessonId: null,
});

export function getProgress(courseId) {
  try {
    const raw = localStorage.getItem(PREFIX + courseId);
    if (!raw) return empty();
    const parsed = JSON.parse(raw);
    return {
      started: Boolean(parsed.started),
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      lastLessonId: parsed.lastLessonId ?? null,
    };
  } catch {
    return empty();
  }
}

export function saveProgress(courseId, progress) {
  try {
    localStorage.setItem(PREFIX + courseId, JSON.stringify(progress));
  } catch {}
}

export function resetProgress(courseId) {
  localStorage.removeItem(PREFIX + courseId);
}

export function getAllLessons(course) {
  if (!course || !Array.isArray(course.modules)) return [];
  return course.modules.flatMap((mod) =>
    (mod.lessons || []).map((lesson) => ({
      ...lesson,
      moduleId: mod.id,
      moduleTitle: mod.title,
    }))
  );
}

export function getCourseStatus(course) {
  const id = course.slug || course.id;
  const progress = getProgress(id);
  const total = getAllLessons(course).length;
  const done = progress.completedLessons.length;
  if (total > 0 && done >= total) return "completed";
  if (progress.started) return "in-progress";
  return "not-started";
}