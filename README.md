# 🚀 Google Drive Clone (MERN + AWS S3)

A full-stack cloud storage application built with **MERN stack** and **AWS S3**, inspired by Google Drive.  
This project focuses on implementing **industry-standard practices** like presigned URL uploads, thumbnail generation, file previews, sharing, and trash management.

---

## ✨ Features Implemented

### 📂 File & Folder Management
- Create files with name and upload using **AWS S3 presigned URLs**.
- Create folders and upload files inside them.
- Support for **nested folders** and files (hierarchical structure).
- Move and copy files/folders using **drag & drop** or action buttons.
- Trash bin: **Move to Trash, Restore, Delete Permanently**.

### 🖼️ Preview & Thumbnails
- Preview files directly in the app:
  - Images (viewable inline)
  - Videos (playable in-app)
  - PDF & Docs (open in iframe)
- Generate **thumbnails** for:
  - Images
  - Videos
  - PDFs
  - Word documents

### 🔍 Search & Filters
- Search by **file name** and **file type**.

### 🤝 Sharing
- Share files and folders with others via **email**.
- Shared items appear in a dedicated **Shared section**.
- File details include:
  - Shared with info
  - File size
  - File type
  - Folder location

### ⚡ User Experience
- Upload queue system with progress tracking.
- File upload status: pending → uploading → processing → success/error.
- Real-time progress updates with toast notifications.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Redux, TailwindCSS, ShadCN/UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Storage**: AWS S3 (presigned URL uploads)
- **Other**: React Query, Axios, Lucide Icons, Toast Notifications


## 📸 Screenshots
_(Add screenshots or GIFs of your app UI here)_

---

## ⚡ How to Run Locally

```bash
# Clone repo
git clone https://github.com/Ketan-Mane/G_Drive_Clone.git
cd google-drive-clone

# -------------------------------
# Backend Setup
# -------------------------------
cd backend
npm install

# Setup environment variables
# (e.g., MONGODB_URI, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, etc.)

# Run backend
npm run dev
# (or npm start if you have a start script)

# -------------------------------
# Frontend Setup
# -------------------------------
cd ../frontend
npm install

# Setup environment variables
# (e.g., REACT_APP_API_URL pointing to your backend)

# Run frontend
npm run dev