import React, { useEffect, useState } from "react";
import { href, Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const TeachersProfile = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const teacherRef = ref(db, `teacherPosts/${id}`);
    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val();
      setTeacher(data);
    });
  }, [id]);

  if (!teacher) {
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div >
        <div className="flex flex-col sm:items-start gap-6">
          <div className="flex flex-row gap-4 items-center">
            <img
                src={teacher.teacherImage || "https://via.placeholder.com/120"}
                alt={teacher.teacherName}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold mb-1">{teacher.teacherName}</h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                    Subjects: {teacher.subjects.join(", ")}
                </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="mt-4">
              <p className="font-semibold text-base sm:text-lg text-blue-600 mb-2">
                Topic: {teacher.topicName}
              </p>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                {teacher.description}
              </p>
              {teacher.link && (
                <a
                  href={teacher.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm sm:text-base mt-3 block hover:text-blue-800"
                >
                  Visit Resource
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-center my-5">
          <Link
            className='bg-[#10b461] flex item-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder:text-base'
            to='/ask-doubt'
          >
            Ask Your Doubt
          </Link>

          <Link
            className='bg-blue-600 flex item-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder:text-base'
            to='/students-test'
          >
            Take a Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeachersProfile;

