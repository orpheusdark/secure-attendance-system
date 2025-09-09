# 📌 Secure Attendance System  
**A Proxy-Proof, Geo-Verified, QR/Beacon Based Attendance Platform**

---

## 🚀 Overview
Attendance in classrooms is often manipulated using **proxy attendance (friends marking attendance on behalf of others)**.  
Our solution ensures **secure, location-verified, and teacher-confirmed attendance** using a **Geo-fenced OTP + Reverse QR/Beacon** mechanism.  

This project is built to be:  
✅ **Scalable** – Works for classrooms, entire universities, or corporate trainings.  
✅ **Secure** – Multi-factor verification to prevent breaches.  
✅ **Cross-Platform** – Mobile apps + Web dashboards for all stakeholders.  

---

## 🎯 Problem Statement
Traditional attendance methods (manual, biometric, RFID) suffer from:  
- ❌ Proxy attendance  
- ❌ High cost of biometric hardware  
- ❌ Limited scalability in large institutions  
- ❌ Lack of real-time analytics  



---

## 💡 Proposed Solution
Our system combines **three verification layers**:

1. **Geo-Fenced OTP Attendance**  
   - Student requests OTP inside the classroom geofence.  
   - OTP expires within minutes to prevent sharing.  
 
2. **Reverse QR / Beacon Confirmation** (Time Consuming🚫) 
   - Teacher scans student’s reverse QR OR verifies via Bluetooth beacon.  
   - Ensures physical presence in class.  

3. **Role-Based Dashboard Access**  
   - Students → Mobile app for check-in.  
   - Teachers → OTP generation & student verification.  
   - HOD → Analytics & class-wise reports.  
   - Admin → System-wide management & logs.  

---

## 🏗️ System Workflow
<!-- diagram will be added later -->

🔗 Detailed docs:  
- [System Workflow](docs/system-workflow.md)  
- [Sequence Diagrams](docs/sequence-diagrams.md)  
- [Tech Stack](docs/tech-stack.md)  
- [Future Scope](docs/future-scope.md)  

---

## 🛠️ Tech Stack

**Frontend**  
- React Native (Mobile: Student + Teacher)  
- React.js (Web Dashboard: HOD + Admin)  
- TailwindCSS (NativeWind) for styling  

**Backend**  
- Node.js + Express.js  
- MongoDB (Atlas)  
- JWT Authentication  
- Socket.IO for real-time sync  
- Google Maps API for Geofencing  

**Core Features**  
- OTP/QR Code (qrcode + otplib)  
- Reverse QR Authentication  
- BLE Beacon Support  
- Attendance Analytics (Recharts, Mongo Aggregations)  

👉 Detailed breakdown: [Tech Stack Doc](docs/tech-stack.md)

---

## 👥 User Roles

| Role     | Platform        | Key Actions |
|----------|----------------|-------------|
| Student  | Mobile App      | Request OTP, Scan QR, GPS validation |
| Teacher  | Mobile App/Web  | Generate OTP, Verify Reverse QR/Beacon |
| HOD      | Web Dashboard   | View reports, track analytics |
| Admin    | Web Dashboard   | Manage users, system settings, logs |

---

## 🔮 Future Scope
- AI-powered **proxy detection** via unusual pattern analysis.  
- **Blockchain ledger** for tamper-proof attendance.  
- **Biometric layers** (facial recognition, voice authentication).  
- Integration with **LMS/ERP platforms**.  

👉 Full doc: [Future Scope](docs/future-scope.md)




---

## 🏆 Impact
 
- **No Proxy Attendance** (multi-factor verification).  
- **Low-cost deployment** (no hardware needed beyond smartphones).  
- **Real-time monitoring** for teachers & HODs.  
- **Scalable adoption** across schools, universities, and corporates.  

---

## 📜 License
MIT License – Free to use and modify.  



---

