import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch('http://localhost:4000/questions')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setQuestions(data);
      })
  };

  function handleDeleteItem(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:'DELETE'
    })
    .then(res=>res.json())
    .then(()=>{
     const notDeleted=questions.filter((quiz)=>quiz.id !==id)
     setQuestions(notDeleted)
    })
  }
  function handleAnsChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({correctIndex}),
    })
    .then((r)=>r.json)
    .then((quizupdated)=>{
    const updatedQuiz= questions.map((quiz)=>{
    if(quiz.id===quizupdated.id) {return quizupdated}else
    {return quiz}
      })
    setQuestions(updatedQuiz)
    })
  }

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> :
       <QuestionList 
       questions={questions} 
       handleAnsChange={handleAnsChange}
       handleDeleteItem={handleDeleteItem}
       />}
    </main>
  );
}

export default App;
