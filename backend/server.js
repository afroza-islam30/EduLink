const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// ===== Sample In-memory Data =====
let tutors = [
  {
    id: "t1",
    name: "Rahim Uddin",
    subjects: ["Math", "Physics"],
    classes: ["Class 8", "Class 9", "Class 10"],
    location: "Mirpur",
    expectedSalary: "6000-8000 BDT",
    rating: 4.8,
    bio: "BUET CSE student, 3 years experience.",
    gender: "Male"
  },
  {
    id: "t2",
    name: "Fahmida Akter",
    subjects: ["English", "Bangla"],
    classes: ["Class 5", "Class 6", "Class 7"],
    location: "Uttara",
    expectedSalary: "4000-6000 BDT",
    rating: 4.5,
    bio: "DU English Dept, 2 years experience.",
    gender: "Female"
  }
];

let tuitionRequests = [];
let applications = [];

const GUARDIAN_ID = "g1";

app.use(cors());
app.use(express.json());

// Serve frontend folder
app.use(express.static(path.join(__dirname, "..", "frontend")));

// ===== API ROUTES =====

// Get all tutors
app.get("/api/tutors", (req, res) => {
  const { subject, location } = req.query;

  let filtered = tutors;

  if (subject) filtered = filtered.filter(t => t.subjects.includes(subject));
  if (location) filtered = filtered.filter(t => t.location.includes(location));

  res.json(filtered);
});

// Create tuition request
app.post("/api/requests", (req, res) => {
  const {
    studentName,
    studentClass,
    subjects,
    location,
    salary,
    daysPerWeek,
    genderPreference,
    details
  } = req.body;

  const newReq = {
    id: "r" + (tuitionRequests.length + 1),
    guardianId: GUARDIAN_ID,
    studentName,
    studentClass,
    subjects,
    location,
    salary,
    daysPerWeek,
    genderPreference,
    details,
    postedAt: new Date().toISOString(),
  };

  tuitionRequests.push(newReq);
  res.status(201).json(newReq);
});

// Get requests posted by guardian
app.get("/api/requests/my", (req, res) => {
  res.json(tuitionRequests.filter(r => r.guardianId === GUARDIAN_ID));
});

// Fake applications
applications = [
  { id: "a1", requestId: "r1", tutorId: "t1", status: "pending" },
  { id: "a2", requestId: "r1", tutorId: "t2", status: "shortlisted" }
];

// Get applications for this guardian
app.get("/api/applications/my", (req, res) => {
  const myRequests = tuitionRequests.filter(r => r.guardianId === GUARDIAN_ID);
  const reqIDs = myRequests.map(r => r.id);

  const result = applications
    .filter(a => reqIDs.includes(a.requestId))
    .map(a => ({
      ...a,
      tutor: tutors.find(t => t.id === a.tutorId),
      request: tuitionRequests.find(r => r.id === a.requestId)
    }));

  res.json(result);
});

// Update application status
app.patch("/api/applications/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const idx = applications.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  applications[idx].status = status;
  res.json(applications[idx]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
