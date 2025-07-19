function QuestionDisplay({ question }: any) {
  return (
    <div className="question">
      <h2>Question:</h2>
      <p>{question}</p>
    </div>
  );
}

export default QuestionDisplay;
