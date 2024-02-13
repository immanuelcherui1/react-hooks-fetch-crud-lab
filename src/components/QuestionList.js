import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, handleDeleteItem, handleAnsChange}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      <ul>{questions.map((question=>{
          return (
          <QuestionItem
          key={question.id}
          question={question}
          handleDeleteItem={handleDeleteItem}
          handleAnsChange={handleAnsChange}
        />
        )
      }))}</ul>
      </ul>
    </section>
  );
}

export default QuestionList;
