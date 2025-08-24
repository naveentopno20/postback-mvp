# 🚀 Affiliate Dashboard (MVP)

> **S2S Postback Tracking with PostgreSQL, Express, and Next.js**  
> Full-stack assignment implementation for tracking affiliate clicks, postbacks, and reporting metrics via a dashboard.

---

## 📦 Tech Stack
- **Backend:** Node.js, Express, PostgreSQL (`pg` library)  
- **Frontend:** Next.js (React, TypeScript, TailwindCSS)  
- **Database:** PostgreSQL (with seed + reset scripts)  

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/naveentopno20/postback-mvp.git
cd postback-mvp
```
### 2. Setup PostgreSQL
```bash
Make sure PostgreSQL is running. Then create a database:
CREATE DATABASE postback_mvp;
```
### 3. Configure Environment
```bash
Copy .env.example to .env.local in both backend and frontend folders and set your PostgreSQL credentials:
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/postback_mvp
```
### 4. Install Dependencies
```bash
Backend:
cd backend
npm install

Frontend:
cd ../frontend
npm install
```
### 5. Reset & Seed Database
```bash
Run in backend folder:
npm run db:reset
This will drop, recreate, and seed the database with:
- **Affiliate** #1
- **Campaign Summer Sale** (#1)
```
### 6. Run Servers
```bash
Start the backend (port 4000):
npm run dev

Start the frontend (port 3000):
npm run dev
```
## 🔗 API Endpoints
### ➤ Track Click
```bash
curl "http://localhost:4000/click?affiliate_id=1&campaign_id=1&click_id=abc123"
```
### ➤ Postback (Conversion)
```bash
curl "http://localhost:4000/postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD"
```

## 📊 Dashboard
```bash
1. Open http://localhost:3000 → view affiliates.

2. Click “Open Dashboard” → go to /dashboard/1.

3. Dashboard displays:
- ✅ Total Clicks
- ✅ Total Conversions
- ✅ Total Revenue
- ✅ Detailed Click & Conversion tables
```
## 🖼 Screenshots
### ➤ Affiliate List
This page shows all affiliates with options to view their dashboard or copy their unique Postback URL.

![Affiliate List](./screenshots/affiliate-list.png)

### ➤ Dashboard Example
Displays clicks, conversions, and revenue metrics for each affiliate.

![Affiliate Dashboard](./screenshots/dashboard.png)


## 🛠 Error Handling
```bash
- Invalid or missing query params → returns JSON error.
- Unknown affiliate or click → returns 404.
- Dashboard gracefully handles empty states.
```

## ✅ Completed Features (per assignment PDF)
```bash
- Click endpoint & tracking
- Postback endpoint & conversion tracking
- PostgreSQL schema with seed data
- Affiliate list + individual dashboards
- Frontend dashboard with metrics & tables
- Error handling for invalid/missing data
```

## 🚀 How to Demo
```bash
1. Start backend + frontend.
2. Trigger test click & postback using curl commands.
3. Refresh dashboard to see updated metrics.
```
