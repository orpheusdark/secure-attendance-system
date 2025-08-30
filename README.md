# 📌 Secure Attendance System (Geo-OTP + Reverse QR)

A **proxy-proof digital attendance system** that ensures students cannot fake or share attendance.  
It combines **Geo-fencing**, **Time-bound OTP/QR codes**, and **Reverse Teacher Confirmation** for maximum security.  

---

## 🚀 Problem
Traditional attendance systems (manual, biometric, RFID, or QR-only) are easily breached by:
- Proxy attendance (friends marking attendance).
- OTP sharing outside the classroom.
- Inefficient tracking for HOD/Admin.

---

## 💡 Our Solution
A **Geo-fenced OTP Attendance System with Teacher-side Confirmation**:
1. Teacher generates **time-bound OTP/QR** for students.
2. Students scan within **30 seconds** + must be inside the **classroom geofence**.
3. Attendance is marked as **Pending** until **Teacher confirms** via:
   - Reverse QR (student shows device QR, teacher scans).
   - Or BLE/Beacon auto-detection.
4. Backend updates final attendance → visible to Teacher, HOD, Admin.

---

## 🛠️ Tech Stack
### Frontend (Student + Teacher)
- React (PWA for mobile usability)
- Camera API (QR scan)
- Geolocation API (geofence check)
- Web Bluetooth API (optional for auto-confirm)

### Backend
- Node.js + Express (REST APIs)
- JWT (secure time-bound OTPs)
- MongoDB / Firebase Firestore (database)

### Dashboard (HOD + Admin)
- React + Tailwind + Recharts
- Role-based dashboards for analytics

---

## 👥 User Roles
### 1. Student
- Scan OTP/QR + share location.
- Show confirmation QR for teacher scan.
- View attendance history.

### 2. Teacher
- Start class → generate OTP/QR.
- Confirm attendance with reverse scan.
- View class attendance list.

### 3. HOD
- Access reports (class/subject/teacher-wise).
- Track proxy attempts.
- Export data to Excel/PDF.

### 4. Admin
- Manage users (students, teachers, HODs).
- Set policies (geofence radius, OTP expiry).
- Monitor system logs.

---

## 📊 System Workflow
1. Teacher → generates OTP/QR.
2. Student → scans + location validation → **Pending Attendance**.
3. Teacher → confirms via reverse scan → **Confirmed Attendance**.
4. HOD/Admin → monitor reports & analytics.

---

## 🔐 Key Features
- ✅ Proxy-proof attendance (Geo + OTP + Teacher confirmation).
- ✅ Role-based access control.
- ✅ Analytics dashboard for HOD/Admin.
- ✅ Secure logs and audit trail.


---

## 🚀 Future Enhancements
- Face recognition integration (optional).
- NFC-based confirmation.
- AI-driven proxy detection analytics.

---

## 📸 Screenshots & Diagrams
👉 Will be added as development progresses.  

---

## 👨‍💻 Contributors
- Nirant Chavda (Project Lead)  
- Open for collaboration 🚀  

---
