

export const initialCourses = [
  {
    id: "c1",
    title: "React for Interview-Ready Frontends",
    category: "Web Development",
    price: 0,
    rating: 4.7,
    instructor: "Ananya Rao",
    status: "approved",
    students: 312,
    description:
      "Component architecture, hooks, and state patterns asked about in every frontend interview loop.",
    sections: [
      {
        id: "s1",
        title: "Foundations",
        lessons: [
          { id: "l1", title: "Why component trees matter", duration: 480, type: "video" },
          { id: "l2", title: "State vs. props", duration: 600, type: "video" },
          {
            id: "l3",
            title: "Quiz: Core concepts",
            duration: 300,
            type: "quiz",
            questions: [
              {
                q: "What triggers a re-render in React?",
                options: ["Changing a state or prop value", "Refreshing the CSS file", "Restarting the browser"],
                answer: 0
              },
              {
                q: "Props are best described as:",
                options: ["Mutable internal data", "Read-only inputs passed to a component", "A styling API"],
                answer: 1
              }
            ]
          }
        ]
      },
      {
        id: "s2",
        title: "Data & Side Effects",
        lessons: [
          { id: "l4", title: "useEffect and cleanup", duration: 540, type: "video" },
          { id: "l5", title: "Fetching and caching data", duration: 660, type: "video" }
        ]
      }
    ]
  },
  {
    id: "c2",
    title: "Node & Express: Production APIs",
    category: "Backend",
    price: 1499,
    rating: 4.5,
    instructor: "Vikram Shah",
    status: "approved",
    students: 158,
    description: "Build role-protected REST APIs with JWT middleware, the backend half of this LMS.",
    sections: [
      {
        id: "s1",
        title: "Auth & Roles",
        lessons: [
          { id: "l1", title: "JWT middleware end to end", duration: 720, type: "video" },
          {
            id: "l2",
            title: "Quiz: Auth basics",
            duration: 240,
            type: "quiz",
            questions: [
              {
                q: "Where should role checks be enforced?",
                options: ["Only in the UI", "On the server, for every protected route", "Nowhere, roles are just cosmetic"],
                answer: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "c3",
    title: "MongoDB Schema Design for SaaS",
    category: "Backend",
    price: 999,
    rating: 4.3,
    instructor: "Priya Menon",
    status: "pending",
    students: 0,
    description: "Modelling relationships, indexes, and aggregation pipelines for real products.",
    sections: [
      {
        id: "s1",
        title: "Getting started",
        lessons: [{ id: "l1", title: "Documents vs. collections", duration: 420, type: "video" }]
      }
    ]
  }
];

export const initialUsers = [
  { id: "u1", name: "Rhea Kapoor", role: "student", status: "active" },
  { id: "u2", name: "Dev Malhotra", role: "student", status: "active" },
  { id: "u3", name: "Ananya Rao", role: "instructor", status: "active" },
  { id: "u4", name: "Vikram Shah", role: "instructor", status: "active" },
  { id: "u5", name: "Sana Iqbal", role: "student", status: "suspended" }
];

export const CURRENT_USER = { name: "Rhea Kapoor", id: "u1" };

export function flattenLessons(course) {
  const out = [];
  course.sections.forEach((sec) =>
    sec.lessons.forEach((l) => out.push({ ...l, sectionId: sec.id, sectionTitle: sec.title }))
  );
  return out;
}

export function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function fmtMoney(n) {
  return n === 0 ? "Free" : `₹${n.toLocaleString("en-IN")}`;
}
