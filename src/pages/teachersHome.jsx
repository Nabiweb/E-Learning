import React, { useState } from "react";
import { db } from "../firebase";
import { ref, push } from "firebase/database";
import { Link } from "react-router-dom";

const TeachersHome = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherImage, setTeacherImage] = useState("");
  const [subjects, setSubjects] = useState("");
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [testId, settestId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacherName || !teacherImage || !subjects || !topicName || !description || !testId) {
      alert("Please fill all required fields.");
      return;
    }

    const postRef = ref(db, "teacherPosts");

    await push(postRef, {
      teacherName,
      teacherImage,
      subjects: subjects.split(",").map((s) => s.trim()),
      topicName,
      description,
      testId,
    });

    alert("Post added!");
    setTeacherName("");
    setTeacherImage("");
    setSubjects("");
    setTopicName("");
    setDescription("");
    settestId("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow mt-10 rounded">
      <h2 className="text-2xl font-bold mb-6">Teacher Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4 py-5">
        <input
          type="text"
          placeholder="Teacher Name"
          className="w-full border px-3 py-2 rounded"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Pic URL"
          className="w-full border px-3 py-2 rounded"
          value={teacherImage}
          onChange={(e) => setTeacherImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subjects (e.g. Math, Physics)"
          className="w-full border px-3 py-2 rounded"
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
        />
        <input
          type="text"
          placeholder="Topic Name"
          className="w-full border px-3 py-2 rounded"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
        <textarea
          placeholder="Description of the Topic"
          className="w-full border px-3 py-2 rounded"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="testId"
          className="w-full border px-3 py-2 rounded"
          value={testId}
          onChange={(e) => settestId(e.target.value)}
        />
        <Link type="submit" className='bg-blue-600 flex item-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder:text-base'>
          Submit
        </Link>
      </form>
      <Link to='/test' type="submit" className='bg-[#10b461] flex item-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder:text-base'>
          Make A Test
      </Link>
    </div>
  );
};

export default TeachersHome;


