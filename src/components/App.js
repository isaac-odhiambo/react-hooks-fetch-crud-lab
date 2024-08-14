import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch all questions when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  // Function to add a new question to the state
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // Function to delete a question from the state
  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((question) => question.id !== id));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList 
          questions={questions} 
          onDeleteQuestion={handleDeleteQuestion} 
        />
      )}
    </main>
  );
}

export default App;
