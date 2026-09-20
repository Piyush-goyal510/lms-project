import React, { useState, useEffect } from "react";
import { initialCourses, initialUsers, CURRENT_USER } from "./data.js";
import { Catalog, MyCourses } from "./components/Catalog.jsx";
import { CourseDetail } from "./components/CourseDetail.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { InstructorCourses, InstructorAnalytics } from "./components/Instructor.jsx";
import { AdminApprovals, AdminUsers, AdminRevenue } from "./components/Admin.jsx";

const NAV_BY_ROLE = {
  student: [
    { id: "catalog", label: "Course Catalogue" },
    { id: "my-courses", label: "My Courses" },
    { id: "dashboard", label: "Progress Dashboard" }
  ],
  instructor: [
    { id: "instructor-courses", label: "My Courses" },
    { id: "instructor-analytics", label: "Analytics" }
  ],
  admin: [
    { id: "admin-approvals", label: "Course Approvals" },
    { id: "admin-users", label: "User Management" },
    { id: "admin-revenue", label: "Revenue & Engagement" }
  ]
};

const TITLE_MAP = {
  catalog: ["Course Catalogue", "Browse and enrol in available courses"],
  "my-courses": ["My Courses", "Resume where you left off"],
  dashboard: ["Progress Dashboard", "Completion, streaks and certificates"],
  "instructor-courses": ["My Courses", "Build and edit your curriculum"],
  "instructor-analytics": ["Analytics", "How students move through your content"],
  "admin-approvals": ["Course Approvals", "Review courses submitted by instructors"],
  "admin-users": ["User Management", "Every account on the platform"],
  "admin-revenue": ["Revenue & Engagement", "Platform-wide numbers"]
};

export default function App() {
  const [role, setRole] = useState("student");
  const [view, setView] = useState("catalog");
  const [courses, setCourses] = useState(initialCourses);
  const [users, setUsers] = useState(initialUsers);
  const [enrollments, setEnrollments] = useState(["c1"]);
  // progress[courseId] = { lessonId: { watched: seconds, complete: bool, quizScore: n } }
  const [progress, setProgress] = useState({
    c1: { l1: { complete: true, watched: 480 } }
  });
  const [activeCourseId, setActiveCourseId] = useState(null);

  useEffect(() => {
    setView(NAV_BY_ROLE[role][0].id);
    setActiveCourseId(null);
  }, [role]);

  function enroll(courseId) {
    setEnrollments((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]));
  }

  function updateLessonProgress(courseId, lessonId, patch) {
    setProgress((prev) => ({
      ...prev,
      [courseId]: {
        ...(prev[courseId] || {}),
        [lessonId]: { ...(prev[courseId]?.[lessonId] || {}), ...patch }
      }
    }));
  }

  function updateCourse(courseId, updater) {
    setCourses((prev) => prev.map((c) => (c.id === courseId ? updater(c) : c)));
  }

  const [heading, sub] = TITLE_MAP[view] || ["", ""];

  return (
    <div className="shell">
      <div className="rail">
        <div className="rail-brand">
          Ridge<span>line</span>
        </div>
        <div className="rail-nav">
          {NAV_BY_ROLE[role].map((n) => (
            <button
              key={n.id}
              className={"rail-link" + (view === n.id ? " active" : "")}
              onClick={() => {
                setView(n.id);
                setActiveCourseId(null);
              }}
            >
              {n.label}
            </button>
          ))}
        </div>
        <div className="rail-foot">
          Frontend prototype · role-based views
          <br />
          Backend: Node + Express + MongoDB
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <div>
            <h1>{heading}</h1>
            <div className="topbar-sub">{sub}</div>
          </div>
          <div className="role-switch">
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Viewing as</span>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student — {CURRENT_USER.name}</option>
              <option value="instructor">Instructor — Ananya Rao</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="content">
          {role === "student" && view === "catalog" && (
            <Catalog
              courses={courses}
              enrollments={enrollments}
              onEnroll={enroll}
              onOpen={(id) => {
                setActiveCourseId(id);
                setView("course-detail");
              }}
            />
          )}
          {role === "student" && view === "my-courses" && (
            <MyCourses
              courses={courses.filter((c) => enrollments.includes(c.id))}
              progress={progress}
              onOpen={(id) => {
                setActiveCourseId(id);
                setView("course-detail");
              }}
            />
          )}
          {role === "student" && view === "course-detail" && activeCourseId && (
            <CourseDetail
              course={courses.find((c) => c.id === activeCourseId)}
              progress={progress[activeCourseId] || {}}
              onProgress={(lessonId, patch) => updateLessonProgress(activeCourseId, lessonId, patch)}
              onBack={() => setView(enrollments.includes(activeCourseId) ? "my-courses" : "catalog")}
            />
          )}
          {role === "student" && view === "dashboard" && (
            <Dashboard courses={courses.filter((c) => enrollments.includes(c.id))} progress={progress} />
          )}

          {role === "instructor" && view === "instructor-courses" && (
            <InstructorCourses courses={courses.filter((c) => c.instructor === "Ananya Rao")} onUpdate={updateCourse} />
          )}
          {role === "instructor" && view === "instructor-analytics" && (
            <InstructorAnalytics courses={courses.filter((c) => c.instructor === "Ananya Rao")} />
          )}

          {role === "admin" && view === "admin-approvals" && (
            <AdminApprovals courses={courses} onUpdate={updateCourse} />
          )}
          {role === "admin" && view === "admin-users" && <AdminUsers users={users} setUsers={setUsers} />}
          {role === "admin" && view === "admin-revenue" && <AdminRevenue courses={courses} />}
        </div>
      </div>
    </div>
  );
}
