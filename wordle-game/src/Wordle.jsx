import React, { useEffect, useState } from 'react'
import wordList from "../wordle_words_full.json"
import Line from './components/Line.jsx';
import confetti from 'canvas-confetti';
function Wordle() {

    const [answer, setAnswer] = useState("");
    const [guess,setGuess] = useState(Array(6).fill(null));
    const [currGuess, setCurrGuess] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [notGuessed, setNotGuessed] = useState(false);
    const currRow = guess.findIndex(val=>val==null);
    const [error, setError] = useState("");
    const[popup, setPopup] = useState(false);
    console.log(answer);



    useEffect(()=>{

        

        const character = (e)=>{
            

            
            if(e.key === "Backspace"){
                setCurrGuess(prev=>prev.slice(0,-1));
                return;
            }
            
            if(e.key ==="Enter"){
                // const isValid = wordList.includes(currGuess.toUpperCase());
                // if(!isValid){
                //     setError("This word is not in word list");
                //     setPopup(true);
                //     return;
                // }
                if(currGuess.length !== 5){
    
                    return;
                }
                const isSolution = currGuess === answer
                
                const newGuess = [...guess];
                newGuess[currRow] = currGuess;
                setGuess(newGuess);
                setCurrGuess("");
                const allRowsFilled = newGuess.every(g => g && g.length === 5);
                if(!isSolution && allRowsFilled){
                    setNotGuessed(true);
                    return;
                }
                if(isSolution){ 
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: {
                          y: 0.6
                        }
            
                    })
                   
    
                    setGameOver(true);
                    return;
                }
                    
    
    
    
    
            }

            

            
            if(currGuess.length >= 5){
                return;
            }
            if(/^[a-zA-Z]$/.test(e.key) && currGuess.length <5){
                setCurrGuess(prev => prev + e.key);
            }
            
        }
        
        window.addEventListener("keydown",character);
        return () => window.removeEventListener("keydown",character)
        

    },[currGuess, guess, gameOver, answer,notGuessed])

    useEffect(()=>{

        const fetchWords =  () =>{

            const word = wordList[Math.floor(Math.random() * wordList.length)];
            setAnswer(word.toLowerCase());


        }
        fetchWords();

    },[])
    
  return (
    <div className='min-h-screen bg-gray-800 '>
        <h1 className="text-purple-800 text-center text-6xl py-3 font-extrabold">Wordle</h1>
        <div className='flex flex-col gap-1 text-white mt-10'>
        {gameOver && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
              <p className="text-green-500 font-bold">You have won the game</p>
              <button 
                onClick={() => setGameOver(false)} 
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                OK
              </button>
            </div>
          </div>
        )}
        {notGuessed && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
              <p className="text-red-500 font-bold">You lost the game the the word is :<span className='text-black text-lg font-extrabold'>{answer}</span></p>
              <button 
                onClick={() => setNotGuessed(false)} 
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                OK
              </button>
            </div>
          </div>
        )}
        {

            guess.map((g,idx)=>{
                const isCurrGuess = idx === guess.findIndex(val => val == null);
                return (<Line key={idx} guess={isCurrGuess ? currGuess:  g ?? ""}
                isFinal={!isCurrGuess && g != null}
                answer={answer.toLowerCase()}
                
                />)
})
        }

        
        


      
    </div>

    </div>
    
    
  )
}

export default Wordle;
