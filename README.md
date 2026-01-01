# 🍽️ ZeroPlate — Food Waste Redistribution Platform (Full-Stack)

ZeroPlate is a **production-grade, full-stack platform** designed to reduce food waste by connecting **food donors (restaurants)**, **receivers (NGOs)**, **volunteers**, and **admins** using **secure authentication, intelligent matching, logistics optimization, analytics, and background processing**.

The project is built with a **strong backend-first approach**, combined with a modern **Angular frontend** for real-world usability.

---

## 🚀 Key Features

### 🔐 Authentication & Authorization
- OAuth2 (Google) login using Passport.js
- JWT-based stateless authentication
- Role-Based Access Control (RBAC):
  - `donor`
  - `receiver`
  - `volunteer`
  - `admin`

---

### 🍲 Food Donation System
- Donors can:
  - Create, update, and delete surplus food listings
- Receivers can:
  - View available food
  - Claim donations
- Food lifecycle:
  -available -> claimed -> picked_up


---

### 🧠 Smart Matching Engine
- Automatically recommends **nearest NGOs** for each donation
- Matching criteria:
- Location proximity (Google Maps Distance Matrix)
- Expiry urgency
- Food type compatibility
- Returns ranked NGO recommendations

---

### ⏱️ Background Jobs & Scheduling
- Redis + Bull.js queues
- Background workers handle:
- Pickup reminders
- Expiry alerts
- Periodic re-matching
- node-cron used for scheduled jobs

---

### 🚚 Volunteer Logistics Module
- Volunteer role for delivery coordination
- Admin assigns **multiple pickups** to volunteers
- Google Maps Directions API used for:
- Route optimization
- ETA calculation
- Distance calculation

---

### 📊 Analytics Dashboard (Admin)
- Aggregation-based analytics APIs:
- Total donations
- Total claims
- Total meals saved
- Active donors & receivers
- CO₂ emissions reduction estimation
- Top donors ranking
- Rule-based fraud detection:
- Duplicate claims
- Rapid multi-claims
- Suspicious donors

---

### 🔒 Security & Hardening
- Helmet security headers
- Global & route-specific rate limiting
- NoSQL injection protection
- XSS sanitization
- Centralized error handling
- Audit logs for critical actions (who did what & when)

---

## 🏗️ Tech Stack

| Layer | Technology |
|------|-----------|
| Language | TypeScript |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | OAuth2 (Passport.js) + JWT |
| Validation | Zod |
| Background Jobs | Redis + Bull.js |
| Scheduling | node-cron |
| Maps & Routing | Google Maps API |
| Security | Helmet, Rate Limiting, Sanitization |
| Architecture | Service-layer, Worker-based |

---

## 📁 Project Structure

src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── queues/
├── routes/
├── services/
├── utils/
├── cronJobs.ts
├── worker.ts
├── app.ts
└── server.ts


---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/zeroplat

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GOOGLE_MAPS_API_KEY=your_google_maps_api_key

CO2_PER_MEAL_KG=2.5
NODE_ENV=development
```


▶️ Running the Project
1️⃣ Install dependencies
npm install

2️⃣ Start Redis
redis-server

3️⃣ Start backend server
npm run dev

3️⃣ Start frontend
npm run start

4️⃣ Start background worker (separate terminal)
npm run worker


🛣️ Roadmap (Next Steps)
Monitoring & logging (Winston, Sentry)
Multi-city & multi-tenant support
Dockerization & cloud deployment
API documentation (Swagger)
Load testing & performance tuning

Give it a ⭐ and feel free to fork or contribute!

