# Excel Analytics Platform

A web-based Excel Analytics Platform that enables users to upload, process, and analyze Excel files with interactive dashboards and reporting. Features role-based authentication (user/admin/super_admin), automated data processing, statistical analysis, and visualization tools.

## Features

- **User Authentication & Authorization** - Multi-role system with approval workflow
- **Excel File Processing** - Upload and parse Excel/CSV files for analysis
- **Data Analytics** - Statistical analysis and insights
- **Interactive Dashboards** - Real-time charts and visualizations
- **Report Generation** - Automated reporting with export capabilities

## Tech Stack

- **Backend:** Node.js/Express
- **Frontend:** React/Vite
- **Database:** MongoDB
- **Authentication:** JWT-based

## Getting Started

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## User Roles

- **Users:** Upload files, view personal analytics
- **Admins:** Approve new users, manage platform content
- **Super Admins:** Full system administration