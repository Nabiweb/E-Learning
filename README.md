# 📚 AI-Powered Teacher-Student MCQ Testing Platform

Welcome to our **Teacher-Student MCQ Test System** built with **React.js** and **Firebase**. This platform connects students and teachers in a digital learning environment where teachers can create and post MCQ-based tests and topics, while students can search, take tests, and get instant feedback.

---

## 🌟 Features

### 👩‍🏫 For Teachers
- **Authentication**: Secure signup/login with Firebase Auth.
- **Profile Posting**: Submit name, image, subject expertise, topic details, and description.
- **Test Linking**: Associate a `testId` with each post to connect to a set of MCQs.
- **Test Creation (linked externally)**: Add multiple-choice questions per topic.

### 👨‍🎓 For Students
- **Authentication**: Simple sign-up/sign-in with real-time feedback.
- **Home Page**: Browse and search for topics or subjects posted by teachers.
- **Test Access**: Enter a `testId` to load a test.
- **Instant Evaluation**: Submit answers and see real-time feedback with color-coded correctness and total score.

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React.js** | Frontend UI Framework |
| **Firebase Realtime Database** | Test and post data storage |
| **Firebase Authentication** | User registration and login |
| **TailwindCSS / Custom CSS** | Responsive UI styling |
| **React Router DOM** | Page navigation between student/teacher areas |

---

## 📂 Folder Structure Overview

```plaintext
src/
├── components/
│   ├── Home.jsx             // Student home page with topic list
│   ├── StudentsAuth.jsx     // Student login/signup page
│   ├── StudentsTest.jsx     // Student test interface
│   ├── teachersAuth.jsx     // Teacher login/signup page
│   ├── teachersHome.jsx     // Teacher post creation page
│   └── firebase.js          // Firebase configuration (not shown here)
```

---

## 🧠 How It Works

1. **Teacher signs up**, fills out a form with profile details, topic, and associated testId.
2. The post appears on the **student home page**, where it can be filtered by topic/subject.
3. **Students sign in**, view the posts, and use the **testId** to access a test.
4. Once submitted, the **test is evaluated** automatically with colored feedback:
   - ✅ Green: Correct answers
   - ❌ Red: Incorrect answers
   - 🟢 Highlight: Correct option, if missed

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Firebase Project (with Authentication + Realtime Database enabled)

### Setup

```bash
git clone https://github.com/yourusername/teacher-student-mcq-platform.git
cd teacher-student-mcq-platform
npm install
```

### Firebase Configuration

Create a `firebase.js` file in `src/`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
```

### Run the App

```bash
npm run dev
```

---

## 📸 Screenshots

> _Add UI screenshots here for better visual context (teacher post, student home, test screen, etc.)_

---

## 💡 Future Enhancements

- Rich text support for questions and explanations
- Timer for tests
- Analytics dashboard for teacher performance tracking
- Admin panel for moderation

---

## 🤝 Contributors

- 👨‍💻 **Frontend & UI**: Nabi Mondal
- 🔥 **Firebase Integration**: Nabi Mondal
- 🤖 **MCQ Auto-generation (Planned)**: Gemini AI

---

## 📄 License

This project is open source and free to use under the [MIT License](LICENSE).
