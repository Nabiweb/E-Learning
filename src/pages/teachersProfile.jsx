import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { ref, onValue, update, get } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TeachersProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState("");
  const [teacherImage, setTeacherImage] = useState("");
  const [subjects, setSubjects] = useState("");
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [testId, setTestId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const userRole = localStorage.getItem("userRole"); // Retrieve user role (student or teacher)

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/teachers-auth");
      return;
    }

    const teacherRef = ref(db, `teacherPosts/${id}`);
    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setIsOwner(data.createdBy === auth.currentUser.uid);
        setTeacherName(data.teacherName);
        setTeacherImage(data.teacherImage);
        setSubjects(data.subjects.join(", "));
        setTopicName(data.topicName);
        setDescription(data.description);
        setTestId(data.testId);
        setLoading(false);
      } else {
        setError("Profile not found.");
        setLoading(false);
      }
    });
  }, [id, navigate]);

  const checkTestIdUnique = async (testIdToCheck, currentPostId) => {
    const postsRef = ref(db, "teacherPosts");
    const snapshot = await get(postsRef);
    const posts = snapshot.val();
    if (posts) {
      return !Object.entries(posts).some(
        ([postId, post]) => post.testId === testIdToCheck && postId !== currentPostId
      );
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacherName || !teacherImage || !subjects || !topicName || !description || !testId) {
      alert("Please fill all required fields.");
      return;
    }

    const isTestIdUnique = await checkTestIdUnique(testId, id);
    if (!isTestIdUnique) {
      setError("This Test ID is already in use by another teacher. Please choose a different one.");
      return;
    }

    try {
      const teacherRef = ref(db, `teacherPosts/${id}`);
      await update(teacherRef, {
        teacherName,
        teacherImage,
        subjects: subjects.split(",").map((s) => s.trim()),
        topicName,
        description,
        testId,
        createdBy: auth.currentUser.uid,
      });

      alert("Profile updated successfully!");
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow mt-10 rounded">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Teacher Profile</h2>
        {isOwner && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-600 text-white font-semibold rounded px-4 py-2"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
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
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 flex items-center justify-center text-white font-semibold rounded px-2 py-2 w-full text-lg"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 flex items-center justify-center text-white font-semibold rounded px-2 py-2 w-full text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-row gap-4 items-center">
            <div>
                <h3 className="font-semibold">Profile Image:</h3>
                <img src={teacherImage} alt={teacherName} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover flex-shrink-0" />
            </div>
            <div className="flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold mb-1">{teacherName}</h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                    Subjects: {subjects}
                </p>
            </div>
          </div>
          <div className="font-semibold text-base sm:text-lg text-blue-600 mb-2">
            <p>Topic: {topicName}</p>
          </div>
          <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
            <p>{description}</p>
          </div>
          <div className="text-gray-600 text-lg font-semibold sm:text-base mb-4">
            <p>testId: {testId}</p>
          </div>
          <Link className='bg-red-600 flex items-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg' to='/video-session'>
              1:1 Video Session
          </Link>
        </div>
      )}
      {userRole === "student" && (
          <div className="mt-6 flex flex-col justify-center my-5">
            <div className='bg-gray-900 flex flex-row items-center justify-center gap-5 text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg'>
              <Link to='/ask-doubt'>
                Ask Your Doubt
              </Link>
              <img className='h-6 w-6 mt-1' src="https://img.icons8.com/?size=100&id=eoxMN35Z6JKg&format=png&color=000000" alt="" />
            </div>
            <Link className='bg-blue-600 flex items-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg' to='/students-test'>
              Give a Test
            </Link>
          </div>
        )}
    </div>
  );
};

export default TeachersProfile;

