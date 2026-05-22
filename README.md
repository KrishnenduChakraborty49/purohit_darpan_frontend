# 🪔 Purohit Darpan (Comprehensive Digital Vedic Mentor)

![React](https://img.shields.io/badge/Frontend-React-blue)
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-green)
![Spring AI](https://img.shields.io/badge/AI-Spring_AI-orange)
![MySQL](https://img.shields.io/badge/Database-MySQL-lightgrey)

**Purohit Darpan** is a full-stack, AI-powered web application designed to help newcomer Brahmins and spiritual enthusiasts learn and perform Hindu Vedic rituals (Pujas) from scratch. It acts as a comprehensive digital mentor, offering step-by-step guides, astrological (Panjika) tracking, automated festival reminders, and an AI-powered spiritual assistant.

### 🌐 Live Demo
* **Frontend:** [https://purohit-darpan-frontend.vercel.app](https://purohit-darpan-frontend.vercel.app)
* *Note: The backend is hosted on a free Render tier and may take ~60 seconds to wake up from sleep on the first load.*

---

## 📸 Screenshots

### 1. Dashboard Overview
<img width="1912" height="961" alt="Screenshot 2026-05-22 203710" src="https://github.com/user-attachments/assets/e6c83e6f-0c5c-4454-9b14-fed711b2af56" />


### 2. Puja Learning Library
<img width="1914" height="964" alt="Screenshot 2026-05-22 203739" src="https://github.com/user-attachments/assets/48389959-8f26-4df8-8feb-7ab47356b453" />


### 3. Advanced Panjika (Hindu Calendar)
<img width="1916" height="963" alt="Screenshot 2026-05-22 203817" src="https://github.com/user-attachments/assets/21cf6eec-5b94-42e1-8b6e-68dac637f671" />


### 4. AI-Powered "Ask Guru" Assistant
<img width="1915" height="959" alt="Screenshot 2026-05-22 203845" src="https://github.com/user-attachments/assets/9bd62070-e6d0-4012-ac74-8b10a72ca7e9" />


---

## ✨ Key Features

* **📖 Comprehensive Puja Learning Module:** 
  An interactive, reader-friendly platform featuring step-by-step ritual guides from start to finish. Includes embedded instructional videos for each step and downloadable PDF documentation for offline learning.
* **📅 Advanced Panjika (Hindu Calendar) Services:** 
  Real-time astrological tracking providing daily Tithi, Nakshatra, Sunrise/Sunset, Rahu/Ketu timings, and auspicious/inauspicious windows for accurate ritual planning.
* **🤖 AI-Powered "Ask Guru":** 
  An intelligent conversational assistant powered by **Spring AI** and the **Llama 3** model (via Groq API). It instantly answers complex, domain-specific questions related to Vedic rituals, mantras, and traditions.
* **🔔 Automated Festival Notifications:** 
  A custom cron-based scheduling engine that tracks the Hindu calendar and proactively alerts users of upcoming rituals (e.g., "Durga Puja is tomorrow"), ensuring timely preparations.
* **🔐 Secure Authentication & RBAC:** 
  Stateless, secure user onboarding and Role-Based Access Control (Admin, Mentor, Student) managed via **Spring Security** and **JWT (JSON Web Tokens)**.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js (Vite)
* **Styling:** TailwindCSS (Glassmorphism & Dark Mode Aesthetics)
* **State Management:** Zustand
* **API Client:** Axios
* **Deployment:** Vercel

### Backend
* **Framework:** Java Spring Boot 3
* **Security:** Spring Security & JWT
* **Database:** MySQL (Hosted on Neon)
* **ORM:** Spring Data JPA / Hibernate
* **AI Integration:** Spring AI (Groq Provider / Llama 3)
* **Deployment:** Render

---

## 🚀 Installation & Local Setup

To run this project locally, you will need Node.js and Java 17+ installed on your machine.

### 1. Clone the Repositories
```bash
# Frontend
git clone https://github.com/KrishnenduChakraborty49/purohit_darpan_frontend.git

# Backend
git clone https://github.com/KrishnenduChakraborty49/Purohit_Darpan_Backend.git
```

### 2. Backend Setup (Spring Boot)
1. Navigate to the backend directory.
2. Update the `application.yml` or `.env` file with your database credentials and API keys:
   ```env
   DB_URL=jdbc:mysql://localhost:3306/purohit_darpan
   DB_USERNAME=root
   DB_PASSWORD=your_password
   JWT_SECRET=your_super_secret_key
   OPENAI_API_KEY=your_groq_api_key
   ```
3. Run the application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will start on `http://localhost:8080`.*

### 3. Frontend Setup (React)
1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the backend API URL:
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:5173`.*

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/KrishnenduChakraborty49/purohit_darpan_frontend/issues).

## 📝 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
