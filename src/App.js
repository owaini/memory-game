
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
	{ src: "/img/lion-1.png" , matched: false},
	{ src: "/img/deer-1.png", matched: false },
	{ src: "/img/panda-1.png" , matched: false},
	{ src: "/img/cow-1.png" , matched: false},
	{ src: "/img/elephent-1.png" , matched: false},
	{ src: "/img/rhino-1.png" , matched: false}
];

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns ] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
  const [ disabled, setDisabled] = useState(false)

  // shuffle cards 
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
     .sort(() => Math.random() - 0.5)
     .map((card) => ({...card, id: Math.random()}))

     setChoiceOne(null)
     setChoiceTwo(null)
     setCards(shuffleCards)
     setTurns(0)
  }
  // handle choice 
   const handleChoice = (choice) => {
     choiceOne ? setChoiceTwo(choice) : setChoiceOne(choice)
   }

   // compore 2 selected cards
   useEffect(() => {
     if(choiceOne && choiceTwo) {
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCard => {
          return prevCard.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        
        setTimeout(() => resetTurn(), 600);
      }
    }
   }, [choiceOne, choiceTwo]);



   // reset choices & increase turn
   const resetTurn = () => {
     setChoiceOne(null)
     setChoiceTwo(null)
     setTurns(prevTurns => prevTurns + 1)
     setDisabled(false)
   }
   // start a new game
   useEffect(() => {
    shuffleCards()
   },[])
  return (
    <div className="App">
      <h1>تحدي الذاكرة</h1>
      <button onClick={shuffleCards}>تحدي جديد</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          card={card}
           key={card.id}
           handleChoice={handleChoice}
           flipped={card === choiceOne || card === choiceTwo || card.matched}
           disabled={disabled}
           />
        ))}
      </div>
      <p className="turns">{turns} : المحاولات </p>
    </div>
  );
}

export default App;
