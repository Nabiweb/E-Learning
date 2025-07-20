import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push, onValue } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

const TeachersHome = () => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherImage, setTeacherImage] = useState("");
  const [subjects, setSubjects] = useState("");
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [testId, setTestId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const postsRef = ref(db, "teacherPosts");
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setPosts(postArray);
      } else {
        setPosts([]);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacherName || !teacherImage || !subjects || !topicName || !description || !testId) {
      alert("Please fill all required fields.");
      return;
    }

    const postRef = ref(db, "teacherPosts");
    const newPostRef = await push(postRef, {
      teacherName,
      teacherImage,
      subjects: subjects.split(",").map((s) => s.trim()),
      topicName,
      description,
      testId,
    });

    const newPostId = newPostRef.key;

    // Clear the form
    setTeacherName("");
    setTeacherImage("");
    setSubjects("");
    setTopicName("");
    setDescription("");
    setTestId("");

    // Redirect to the teacher's profile
    navigate(`/teachers-profile/${newPostId}`);
  };

  const filteredPosts = posts.filter((post) =>
    post.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          onChange={(e) => setTestId(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 flex items-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg"
        >
          Submit
        </button>
      </form>
      <Link
        to="/test"
        className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg"
      >
        Make A Test
      </Link>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Search Other Teachers</h3>
        <input
          type="text"
          placeholder="Search by teacher name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-gray-100 p-4 rounded">
              <h4 className="font-semibold">{post.teacherName}</h4>
              <p>Topic: {post.topicName}</p>
              <Link to={`/teachers-profile/${post.id}`} className="text-blue-600 hover:underline">
                View Profile
              </Link>
            </div>
          ))}
          {filteredPosts.length === 0 && (
            <p className="text-gray-500">No teachers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeachersHome;


