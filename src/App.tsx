import { useState } from "react";
import AnswerInput from "./components/AnswerInput";
import AIResponse from "./components/AIResponse";
import NavBar from "./components/NavBar";
import { Analytics } from "@vercel/analytics/react";

const questions = [
  "Implement a function to reverse a string.",
  "Write a function to determine if a string is a palindrome.",
  "Find the maximum number in an array.",
  "Given two sorted arrays, merge them into one sorted array.",
  "Return the first non-repeating character in a string.",
  "Implement binary search on a sorted array.",
  "Write a function to calculate the factorial of a number.",
  "Given an array, return the two numbers that add up to a given target (Two Sum).",
  "Check if two strings are anagrams of each other.",
  "Find the length of the longest substring without repeating characters.",
  "Write a function to return the Fibonacci number at a given position.",
  "Implement depth-first search (DFS) on a graph.",
  "Implement breadth-first search (BFS) on a graph.",
  "Detect if a linked list has a cycle.",
  "Find the middle node of a linked list.",
  "Remove duplicates from a sorted linked list.",
  "Implement a queue using two stacks.",
  "Find the kth smallest element in a binary search tree.",
  "Write a function to validate a binary search tree.",
  "Perform in-order traversal of a binary tree.",
];

function App() {
  const [aiResponse, setAiResponse] = useState("");
  const [mode] = useState("drill");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = questions[currentQuestionIndex];

  const handleSubmitAnswer = async (answer: string) => {
    setIsSubmitting(true);

    const response = await fetch(
      "https://airoastback-production.up.railway.app/api/grade",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          answer: answer,
          mode: mode,
        }),
      }
    );

    let data;

    try {
      data = await response.json();
    } catch (error: any) {
      data = { detail: "Unknown error occurred." };
    }

    if (response.ok) {
      setAiResponse(data.response);
    } else {
      setAiResponse(`Error: ${data.detail || "Failed to get AI feedback."}`);
    }

    setIsSubmitting(false);
  };

  const handleNextQuestion = () => {
    setAiResponse("");
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  const containerStyle = {
    display: "flex",
    height: "calc(100vh - 47px)",
    width: "100%",
    backgroundColor: "#121212",
    color: "#d4d4d4",
  };

  const leftPanelStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: "0", // Important for proper flex shrinking
    overflow: "hidden", // Prevent content from spilling
    backgroundColor: "#1e1e1e",
    borderRight: "1px solid #333",
  };

  const panelStyle = {
    flex: 1,
    padding: "0.5rem",
    overflow: "auto",
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4",
  };

  const rightPanelStyle = {
    ...panelStyle,
    backgroundColor: "#121212",
  };

  return (
    <div className="app">
      <Analytics />
      <NavBar />
      <div style={containerStyle}>
        {/* @ts-expect-error aaa */}
        <div style={leftPanelStyle}>
          <AnswerInput
            onSubmitAnswer={handleSubmitAnswer}
            question={question}
            isSubmitting={isSubmitting} // Pass loading state
          />

          <button
            onClick={handleNextQuestion}
            style={{
              margin: "1rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#1976d2",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "35px",
            }}
          >
            Next Question
          </button>
        </div>

        <div style={rightPanelStyle}>
          <AIResponse text={aiResponse} isLoading={isSubmitting} />
        </div>
      </div>
    </div>
  );
}

export default App;
