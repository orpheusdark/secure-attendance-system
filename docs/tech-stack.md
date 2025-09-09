# ⚙️ Tech Stack – Secure Attendance System



## 🌐 Frontend

### **Mobile App (Students + Teachers)**
- **Framework**: React Native  
  ✅ Cross-platform (Android + iOS).  
  ✅ Fast development with reusable components.  
  ✅ Easy integration with device APIs (GPS, Camera, BLE).  

- **UI Toolkit**: TailwindCSS (via NativeWind)  
  ✅ Consistent, responsive styling.  
  ✅ Reduces design complexity.  

- **Camera Access**: Expo Camera / react-native-camera  
  ✅ For scanning QR codes (teacher OTP & student Reverse QR).  

- **Location Services**: react-native-geolocation-service  
  ✅ Accurate GPS + Geofence validation.  

- **BLE/Beacon**: react-native-ble-plx  
  ✅ To support teacher-side beacon confirmation in classrooms.  

---

### **Web Dashboard (HOD + Admin)**
- **Framework**: React.js  
  ✅ Rich UI, fast rendering.  
  ✅ Component-based, easy to scale.  

- **Charts & Reports**: Recharts / Chart.js  
  ✅ Visualize attendance analytics.  

- **Export Options**: jsPDF / SheetJS  
  ✅ Generate PDF/Excel reports for HODs/Admins.  

---

## ⚙️ Backend

- **Runtime**: Node.js (Express.js)  
  ✅ Asynchronous, fast, and lightweight.  
  ✅ Handles real-time APIs efficiently.  

- **API Security**: JWT Authentication  
  ✅ Role-based access (Student, Teacher, HOD, Admin).  
  ✅ Secure API calls.  

- **Database**: MongoDB (NoSQL)  
  ✅ Flexible schema for attendance records.  
  ✅ Stores logs (OTP sessions, location validations, confirmations).  

- **Geofencing**: Custom middleware using **Google Maps API**  
  ✅ Verifies if student is inside classroom radius.  

- **Realtime Updates**: Socket.IO  
  ✅ For teacher-student instant confirmations.  

---

## 🛠️ Core System Components

- **OTP/QR Generation**:  
  - Library: `qrcode` (Node.js)  
  - Time-based expiry using `otplib`  
  ✅ Secure, short-lived OTPs to prevent sharing.  

- **Reverse QR for Student Confirmation**:  
  - Each student generates session-based QR with encrypted token.  
  ✅ Teacher verifies authenticity instantly.  

- **Beacon Integration**:  
  - BLE-based presence detection via `react-native-ble-plx`  
  ✅ Auto-confirms students physically inside classroom.  

- **Analytics Dashboard**:  
  - Aggregates data with MongoDB Aggregation Pipeline.  
  ✅ Attendance %, flagged proxy attempts, teacher activity logs.  

---

## 🔒 Security

- **Encryption**: AES-256 for tokens & QR payloads.  
- **API Access**: HTTPS only.  
- **Role Management**: RBAC (Role-Based Access Control).  
- **Logs**: Proxy attempts and failed OTP scans are logged for audit.  

---

## 🧪 DevOps & Deployment

- **Version Control**: Git + GitHub  
- **CI/CD**: GitHub Actions → Deploy to staging/production.  
- **Hosting**:  
  - Backend: Heroku / Render / AWS Lambda  
  - Frontend (Web): Vercel / Netlify  
  - Mobile: Distributed via APK/TestFlight.  
- **Database Hosting**: MongoDB Atlas (Cloud DB).  

---

## 📊 Role–Tech Mapping

| Role    | Access Medium       | Features Powered By                        |
|---------|---------------------|--------------------------------------------|
| Student | Mobile App          | QR/OTP scan, GPS validation, Reverse QR    |
| Teacher | Mobile App + Web    | OTP generation, student confirmation       |
| HOD     | Web Dashboard       | Reports, analytics, proxy detection logs   |
| Admin   | Web Dashboard       | User management, system settings, logs     |

---

