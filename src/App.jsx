import { Routes, Route  } from "react-router-dom"
import Landing from "./pages/Landing"
import Home from "./pages/Home"
import StudentsAuth from "./pages/StudentsAuth";
import StudentsTest from "./pages/StudentsTest";

import TeachersHome from "./pages/teachersHome";
import TeachersAuth from "./pages/teachersAuth";
import TeachersProfile from "./pages/teachersProfile";
import DoubtArena from "./pages/doubtArena";
import VideoSession from "./pages/VideoSession";
import Test from "./pages/Test";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/students-auth" element={<StudentsAuth />} />
        <Route path="/students-test" element={<StudentsTest />} />
        <Route path="/home" element={<Home />} />

        <Route path="/teachers-auth" element={<TeachersAuth />}/>
        <Route path="/teachers-home" element={<TeachersHome />} />
        <Route path="/teachers-profile/:id" element={<TeachersProfile userRole="student" />} />
        <Route path="/ask-doubt" element={<DoubtArena />} />

        <Route path="/test" element={<Test />} />

        <Route path="/video-session" element={<VideoSession userType="teacher" otherUserUID="student_1" />} />
      </Routes>
    </div>
  )
};

export default App

