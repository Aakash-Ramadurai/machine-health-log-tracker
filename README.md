# Machine Health Log Tracker
### A Full-Stack AWS Project — Bridging Mechanical Engineering & Cloud Computing

**Author:** Aakash Ramadurai B  
**Background:** Mechanical Engineering  
**AWS Services Used:** S3 · EC2 · DynamoDB · IAM  
**Region:** Asia Pacific (Mumbai) — ap-south-1

---

## What This Project Does

A real-world web application that allows factory technicians to **log, view, and track the health status of industrial machines** — recording inspection details, machine location, status (Working / Faulty / Idle), and the technician who performed the inspection.

This project was built specifically to understand how three core AWS services interact with each other as a complete system.

---

## Architecture

```
User (Browser)
     │
     ▼
┌─────────────────┐
│   AWS S3        │  ← Static website hosting (HTML + JS frontend)
│   Frontend      │
└────────┬────────┘
         │ HTTP API calls
         ▼
┌─────────────────┐
│   AWS EC2       │  ← Node.js REST API server (port 3000)
│   Backend       │
└────────┬────────┘
         │ AWS SDK (via IAM Role — no hardcoded credentials)
         ▼
┌─────────────────┐
│  AWS DynamoDB   │  ← NoSQL database storing machine records
│  Database       │
└─────────────────┘
```

---

## Why This Matters (Mechanical Engineering Perspective)

In a manufacturing plant, machines need to be regularly inspected and their health logged. Traditionally this is done on paper or spreadsheets. This project digitises that workflow into a cloud-based system — the same kind of system used in real Industry 4.0 / IIoT deployments.

Each AWS service maps to a real-world concept:

| AWS Service | Real-World Equivalent |
|---|---|
| DynamoDB | The logbook / maintenance register |
| EC2 | The processing unit / control system |
| S3 | The display panel / HMI interface |
| IAM Role | The access card / permission system |

---

## Data Structure

Each machine log entry contains:

```json
{
  "machineId": "M001",
  "machineName": "Lathe Machine 1",
  "location": "Building 3",
  "status": "Working",
  "inspectedBy": "Aakash",
  "inspectionTime": "2026-04-10T09:30:00",
  "notes": "Bearings lubricated. No issues found."
}
```

**Status values:** `Working` · `Faulty` · `Idle`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | AWS DynamoDB (NoSQL) |
| Hosting | AWS S3 (Static Website), AWS EC2 (t2.micro) |
| Auth | AWS IAM Role (EC2 → DynamoDB) |
| SDK | AWS SDK for JavaScript v3 |

---

## Project Structure

```
machine-health-api/        ← Lives on EC2 server
├── index.js               ← Express REST API
├── package.json
└── node_modules/

index.html                 ← Uploaded to S3 bucket
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/machines` | Fetch all machine records |
| POST | `/machines` | Submit a new inspection log |

---

## Setup Guide

### Phase 1 — DynamoDB
1. Create table: `MachineHealthLog`
2. Partition key: `machineId` (String)
3. Add test items manually via AWS Console

### Phase 2 — EC2 + Backend
1. Launch `t2.micro` Amazon Linux 2023 instance
2. Configure security group: ports 22 (SSH), 3000 (API), 80 (HTTP)
3. SSH in via PuTTY (Windows) or terminal (Mac/Linux)
4. Install Node.js: `sudo dnf install -y nodejs`
5. Clone/create project, install dependencies, run `node index.js`

### Phase 3 — IAM Role
1. Create IAM Role: `EC2-DynamoDB-Role`
2. Attach policy: `AmazonDynamoDBFullAccess`
3. Assign role to EC2 instance via **Actions → Security → Modify IAM role**

### Phase 4 — S3 Frontend
1. Create S3 bucket, disable "Block all public access"
2. Enable Static Website Hosting, set index document to `index.html`
3. Add bucket policy for public read access
4. Upload `index.html` with your EC2 public IP set in the API variable

---

## Key Concepts Learned

- **S3 Static Hosting** — S3 is not just file storage; it can serve a live public website
- **EC2 as a server** — A real Linux machine you SSH into and run any code on
- **DynamoDB NoSQL** — Schema-less JSON records, each identified by a partition key
- **IAM Roles** — How AWS services communicate securely without any hardcoded credentials
- **CORS** — Why a browser on one domain needs explicit permission to call an API on another
- **REST API** — How a frontend and backend communicate via HTTP requests

---

## Cost

All services used are within the **AWS Free Tier**:
- S3: 5 GB storage, 20K GET requests/month free
- EC2: 750 hours/month of t2.micro free
- DynamoDB: 25 GB + 25 WCU/RCU free forever

> Remember to **stop your EC2 instance** when not in use to preserve free tier hours.

---

## Screenshots

*(Add screenshots of your running app here)*

---

## Author Note

This project was built as part of my journey into cloud computing, approaching AWS from a mechanical engineering background. The goal was to understand how S3, EC2, and DynamoDB function together as a complete system — not just individually — and to connect cloud concepts to real industrial use cases I'm already familiar with.

---

*Built on AWS Free Tier · April 2026*
