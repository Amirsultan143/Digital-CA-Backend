# Digital CA Backend

A backend system for a Digital Chartered Accountant Platform, focused on digitizing CA functions like document handling, compliance reminders, invoicing, and client management.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Client Management](#client-management)
  - [Document Management](#document-management)
  - [Invoice Module](#invoice-module)
  - [Compliance Alerts](#compliance-alerts)
- [Usage Guide](#usage-guide)
- [Error Handling](#error-handling)
- [Notes](#notes)

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- MVC Architecture

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd digital-ca-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory:
     ```
     PORT=8080
     DB_URI=mongodb://127.0.0.1:27017/digital_ca_db
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:8080`

---

## Folder Structure

```
controllers/
middlewares/
models/
routes/
utils/
.env
server.js
```

---

## Environment Variables

| Name        | Description                  |
|-------------|-----------------------------|
| PORT        | Server port                 |
| DB_URI      | MongoDB connection string   |
| JWT_SECRET  | JWT secret key              |

---

## API Endpoints

### Auth

| Method | Endpoint                | Description           | Payload Example |
|--------|-------------------------|-----------------------|----------------|
| POST   | /api/v1/auth/signup     | Register user (CA/client) | `{ "name": "Amit Kumar", "email": "amit@example.com", "password": "Test@123", "role": "ca" }` |
| POST   | /api/v1/auth/login      | Login user            | `{ "email": "amit@example.com", "password": "Test@123" }` |

---

### Client Management (CA Only)

| Method | Endpoint                  | Description         | Payload Example |
|--------|---------------------------|---------------------|----------------|
| POST   | /api/v1/clients           | Create client       | `{ "name": "Rahul Sharma", "email": "rahul@example.com", "phone": "9876543210", "company": "ABC Pvt Ltd", "gstNumber": "22AAAAA0000A1Z5" }` |
| GET    | /api/v1/clients           | Get all clients     | -              |
| GET    | /api/v1/clients/:id       | Get client by ID    | -              |
| PUT    | /api/v1/clients/:id       | Update client       | `{ "phone": "9999999999" }` |
| DELETE | /api/v1/clients/:id       | Delete client       | -              |

---

### Document Management (CA Only)

| Method | Endpoint                        | Description         | Payload Example |
|--------|---------------------------------|---------------------|----------------|
| POST   | /api/v1/documents/upload        | Upload document     | `form-data: clientId, documentType, file` |
| GET    | /api/v1/documents               | Get documents       | -              |

---

### Invoice Module

| Method | Endpoint                  | Description         | Payload Example |
|--------|---------------------------|---------------------|----------------|
| POST   | /api/v1/invoices          | Create invoice      | `{ "client": "<client_id>", "amount": 5000, "issueDate": "2025-07-28", "dueDate": "2025-08-10", "status": "pending" }` |
| GET    | /api/v1/invoices          | Get all invoices    | -              |
| GET    | /api/v1/invoices/:id      | Get invoice by ID   | -              |
| PUT    | /api/v1/invoices/:id      | Update invoice      | `{ "status": "paid" }` |
| DELETE | /api/v1/invoices/:id      | Delete invoice      | -              |

---

### Compliance Alerts (Reminders)

| Method | Endpoint                  | Description         | Payload Example |
|--------|---------------------------|---------------------|----------------|
| POST   | /api/v1/reminders         | Create reminder (CA only) | `{ "clientId": "<client_id>", "title": "GST Filing Due", "description": "File GST return before due date.", "dueDate": "2025-08-05" }` |
| GET    | /api/v1/reminders         | Get reminders       | -              |
| DELETE | /api/v1/reminders/:id     | Delete reminder (CA only) | -              |

---

## Usage Guide

1. **Register/Login as CA or Client**
2. **Use the JWT token in `Authorization: Bearer <token>` header for all protected endpoints**
3. **CA can manage clients, upload documents, create invoices, and set reminders**
4. **Clients can view their invoices and reminders**

---

## Error Handling

- All endpoints return proper error messages and status codes.
- Common errors:
  - `401 Unauthorized` – No/invalid token
  - `403 Forbidden` – Role not allowed
  - `400 Bad Request` – Missing/invalid data
  - `404 Not Found` – Resource not found

---

## Notes

- Only CA users can create/update/delete clients, documents, invoices, and reminders.
- Clients can only view their own invoices and reminders.
- Document upload supports PDF, DOCX, JPG, PNG files.
- All IDs (`client_id`, `invoice_id`, `reminder_id`) are returned in response after creation.

---

**For any issues, check your `.env` file, MongoDB connection, and make sure to use correct JWT tokens for each
