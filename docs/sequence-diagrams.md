
# 📑 Sequence Diagrams – Secure Attendance System

This document provides **textual UML-style sequence diagrams** for each role (Student, Teacher, HOD, Admin).  
It describes how components interact in the system for secure, proxy-proof attendance.

---

## 👨‍🎓 Student Attendance Flow

**Actors**: Student → Mobile App → Backend → Teacher App

```

Student → Mobile App: Open attendance feature
Mobile App → Backend: Request OTP/QR scan validation
Backend → Backend: Validate OTP expiry + session status
Backend → Geolocation Service: Validate GPS inside geofence
Geolocation Service → Backend: Return validation result
Backend → Mobile App: If valid → Mark status = Pending
Mobile App → Student: Show "Pending" + Generate Reverse QR
Student → Teacher: Shows Reverse QR for confirmation
Teacher App → Backend: Confirm attendance via scan
Backend → Database: Update status → Confirmed
Backend → Mobile App: Show "Attendance Confirmed"

```

---

## 👨‍🏫 Teacher Attendance Flow

**Actors**: Teacher → Teacher App → Backend → Database → Student Apps

```

Teacher → Teacher App: Start attendance session
Teacher App → Backend: Generate OTP/QR (with timestamp + expiry)
Backend → Database: Create new attendance session
Backend → Teacher App: Return OTP/QR
Teacher App → Classroom Display: Show OTP/QR

\--- Students Scanning ---
Student Apps → Backend: Scan OTP/QR
Backend → Database: Store "Pending Attendance"

\--- Confirmation Phase ---
Teacher → Teacher App: Initiate Confirmation
Teacher App → Student: Scan Reverse QR (or detect via Beacon)
Teacher App → Backend: Confirm student attendance
Backend → Database: Update "Pending → Confirmed"
Teacher App → Teacher: Show confirmed list

```

---

## 👨‍💼 HOD Workflow

**Actors**: HOD → Dashboard → Backend → Database

```

HOD → Dashboard: Login with HOD credentials
Dashboard → Backend: Request class/subject reports
Backend → Database: Fetch attendance records
Database → Backend: Return records + flagged proxy attempts
Backend → Dashboard: Show analytics (attendance %, proxy logs)
HOD → Dashboard: Export to Excel/PDF

```

---

## 🛠️ Admin Workflow

**Actors**: Admin → Dashboard → Backend → Database

```

Admin → Dashboard: Login with Admin credentials
Dashboard → Backend: Request user management panel
Backend → Database: Fetch user list + roles
Admin → Dashboard: Add/Remove/Update user
Dashboard → Backend: Send changes
Backend → Database: Update records

\--- Global Settings ---
Admin → Dashboard: Update geofence radius, OTP expiry, beacon config
Dashboard → Backend: Push new system settings
Backend → Database: Save settings + apply globally

```

---

## 🔄 Status Transition (All Roles)

```

\[Student Scan] → Attendance = Pending
\[Teacher Confirmation] → Attendance = Confirmed
\[Invalid OTP/Outside Geofence/Not Confirmed] → Attendance = Rejected

```

---

✅ These sequence diagrams show **step-by-step system interactions** for each user role.  
They can later be converted into **PlantUML / Mermaid diagrams** if needed for visuals.
```

