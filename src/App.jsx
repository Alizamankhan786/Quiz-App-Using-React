import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [question , setQuestion] = useState([]);
  const [questionState , setQuestionState] = useState(0);

  const checkInput = useRef([]);

  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
    .then((res) => {
      console.log(res.data);
      setQuestion(res.data);

    }).catch((error) => {
      console.log(error);
      

    })
  } , []);


  // SHUFFLE FUNCTION

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
  }


  function nextQuestion(index){
    const checkedButton = checkInput.current.find(input => input.checked);
    if (checkedButton) {
      const selectedValue = checkedButton.value;
      console.log("Selected answer:", selectedValue);
  };


  questionState < question.length - 1 ? setQuestionState(questionState + 1) : alert("Question Ended");

  };





  return (
    <>
    <h1 className='quiz'>QUIZ APP!</h1>
    {question.length > 0 ? <div>
      <h1 className='question'>Q {questionState + 1}: {question[questionState].question.text}</h1>
      <ul>
        {shuffleArray([...question[questionState].incorrectAnswers , question[questionState].correctAnswer]).map((item , index) => {
          return <li className='list' key={index}>
            <input type="radio" name="choice" id={item} value={item} ref={el => (checkInput.current[index] = el )}  />
            <label htmlFor="{item}">{item}</label>
          </li>
        })}
      </ul>
      {/* <button className='btn' onClick={() => nextQuestion()}>Next {question.length}</button> */}
      <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={() => nextQuestion()}>Next {question.length}</button>

    </div>
    : <h1>LODAING...</h1>};


    </>
  );
};

export default App