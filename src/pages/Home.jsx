import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("Student");
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("studentName");
    if (storedName) setName(storedName);
  }, []);

  useEffect(() => {
    const postsRef = ref(db, "teacherPosts");
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cardArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setCards(cardArray);
      } else {
        setCards([]);
      }
    });
  }, []);

  const filteredCards = cards.filter(
    (card) =>
      card.topicName?.toLowerCase().includes(search.toLowerCase()) ||
      card.subjects?.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold">Welcome, {name}!</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search topic or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md rounded-lg p-5 flex items-start gap-4"
          >
            <img
              src={card.teacherImage || "https://via.placeholder.com/80"}
              alt="Teacher"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{card.teacherName}</h2>
              <p className="text-sm text-gray-500">
                Subjects: {card.subjects.join(", ")}
              </p>
              <p className="mt-1">
                Topic: <span className="font-medium">{card.topicName}</span>
              </p>
                {card.description && (
                <p className="mt-2 text-gray-700 text-sm">
                    {card.description.length > 50
                    ? card.description.slice(0, 20) + "..."
                    : card.description}
                </p>
              )}
              <p className="text-sm text-gray-500">
                testId: {card.testId || "Not provided"}
              </p>
                <Link
                    to={`/teachers-profile/${card.id}`}
                    className="text-blue-600 hover:underline mt-2 block">Visit Teacher's Profile  
                </Link>
            </div>
          </div>
        ))}
        {filteredCards.length === 0 && (
          <p className="text-center text-gray-500">No topics or teachers found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;


