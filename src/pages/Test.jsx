import React, { useState } from "react";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

const Test = () => {
  const [testId, setTestId] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [questions, setQuestions] = useState(
    Array.from({ length: 5 }, () => ({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    }))
  );

  // Adjust question list when numberOfQuestions changes
  const handleNumberChange = (e) => {
    const newCount = parseInt(e.target.value);
    setNumberOfQuestions(newCount);
    setQuestions(
      Array.from({ length: newCount }, (_, idx) => questions[idx] || {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      })
    );
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "question" || field === "correctAnswer") {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!testId) {
      alert("Please enter a Test ID.");
      return;
    }

    for (let q of questions) {
      if (!q.question || q.options.some(opt => !opt) || !q.correctAnswer) {
        alert("Please fill all fields for each question.");
        return;
      }
    }

    const testRef = ref(db, `tests/${testId}`);
    await set(testRef, { questions });

    alert("Test submitted successfully!");

    setTestId("");
    setNumberOfQuestions(5);
    setQuestions(
      Array.from({ length: 5 }, () => ({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      }))
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow mt-10 rounded">
      <h2 className="text-3xl font-bold mb-6 text-center">Create MCQ Test</h2>

      <input
        type="text"
        placeholder="Test ID"
        className="w-full border px-3 py-2 rounded mb-4"
        value={testId}
        onChange={(e) => setTestId(e.target.value)}
      />

      <input
        type="number"
        min={1}
        placeholder="Number of Questions"
        className="w-full border px-3 py-2 rounded mb-6"
        value={numberOfQuestions}
        onChange={handleNumberChange}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, idx) => (
          <div key={idx} className="border p-4 rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Question {idx + 1}</h3>
            <input
              type="text"
              placeholder="Enter question"
              className="w-full mb-2 border px-3 py-2 rounded"
              value={q.question}
              onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
            />
            {["A", "B", "C", "D"].map((optLabel, optIdx) => (
              <input
                key={optIdx}
                type="text"
                placeholder={`Option ${optLabel}`}
                className="w-full mb-2 border px-3 py-2 rounded"
                value={q.options[optIdx]}
                onChange={(e) => handleQuestionChange(idx, optIdx, e.target.value)}
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer (A/B/C/D)"
              className="w-full border px-3 py-2 rounded"
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(idx, "correctAnswer", e.target.value.toUpperCase())
              }
            />
          </div>
        ))}

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded w-full">
          Submit Test
        </button>
      </form>
    </div>
  );
};

export default Test;





