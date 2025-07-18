import React, { useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const StudentsTest = () => {
  const [testId, setTestId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const loadTest = () => {
    if (!testId) {
      alert("Please enter Test ID.");
      return;
    }

    const testRef = ref(db, `tests/${testId}`);
    onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.questions) {
        setQuestions(data.questions);
        setLoaded(true);
        setAnswers({});
        setSubmitted(false);
        setScore(0);
      } else {
        alert("No test found for this ID.");
        setLoaded(false);
        setQuestions([]);
      }
    });
  };

  const handleOptionChange = (qIndex, optionLetter) => {
    setAnswers({ ...answers, [qIndex]: optionLetter });
  };

  const handleSubmit = () => {
    let scoreCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] && answers[idx] === q.correctAnswer) {
        scoreCount++;
      }
    });
    setScore(scoreCount);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow mt-10 rounded">
      <h2 className="text-3xl font-bold mb-6 text-center">Student Test</h2>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Enter Test ID"
          className="w-full border px-3 py-2 rounded"
          value={testId}
          onChange={(e) => setTestId(e.target.value)}
        />
        <button
          onClick={loadTest}
          className="bg-blue-600 text-white px-6 py-2 rounded w-full"
        >
          Load Test
        </button>
      </div>

      {loaded && questions.length > 0 && (
        <form className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="border p-4 rounded bg-gray-50">
              <h3 className="font-semibold mb-2">
                {idx + 1}. {q.question}
              </h3>
              {["A", "B", "C", "D"].map((opt, optIdx) => {
                const selected = answers[idx] === opt;
                const correct = q.correctAnswer === opt;
                let optionClass = "px-3 py-2 border rounded w-full mb-2";

                if (submitted) {
                  if (selected && correct) {
                    optionClass += " bg-green-200 border-green-500";
                  } else if (selected && !correct) {
                    optionClass += " bg-red-200 border-red-500";
                  } else if (correct) {
                    optionClass += " bg-green-100";
                  }
                }

                return (
                  <label key={optIdx} className={optionClass + " block"}>
                    <input
                      type="radio"
                      name={`q-${idx}`}
                      value={opt}
                      disabled={submitted}
                      className="mr-2"
                      checked={answers[idx] === opt}
                      onChange={() => handleOptionChange(idx, opt)}
                    />
                    {opt}. {q.options[optIdx]}
                  </label>
                );
              })}
            </div>
          ))}

          {!submitted ? (
            <button
              type="button"
              className="bg-green-600 text-white px-6 py-2 rounded w-full"
              onClick={handleSubmit}
            >
              Submit Test
            </button>
          ) : (
            <div className="text-center text-xl font-semibold text-green-600">
              You scored {score} out of {questions.length}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default StudentsTest;


