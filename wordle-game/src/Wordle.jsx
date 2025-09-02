import React, { useEffect, useState } from 'react'
import wordList from "../wordle_words_full.json"
import Line from './assets/components/Line.jsx';
function Wordle() {

    const [answer, setAnswer] = useState("hello");
    const [guess,setGuess] = useState(Array(6).fill(null));
    const [currGuess, setCurrGuess] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const currRow = guess.findIndex(val=>val==null);
    const [error, setError] = useState("");
    const[popup, setPopup] = useState(false);
    console.log(answer);



    useEffect(()=>{

        

        const character = (e)=>{
            

            if(gameOver) {
                return;
            }
            if(e.key === "Backspace"){
                setCurrGuess(prev=>prev.slice(0,-1));
                return;
            }
            
            if(e.key ==="Enter"){
                const isValid = wordList.includes(currGuess.toUpperCase());
                if(!isValid){
                    setError("This word is not in word list");
                    setPopup(true);
                    return;
                }
                if(currGuess.length !== 5){
    
                    return;
                }
                const newGuess = [...guess];
                newGuess[currRow] = currGuess;
                setGuess(newGuess);
                setCurrGuess("");
                if(currGuess === answer){ 
    
                    setGameOver(true);
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
        

    },[currGuess, guess, gameOver, answer])

    useEffect(()=>{

        const fetchWords =  () =>{

            const word = wordList[Math.floor(Math.random() * wordList.length)];
            setAnswer(word);


        }
        fetchWords();

    },[])
    
  return (
    <div className='min-h-screen bg-gray-800 '>
        <h1 className="text-purple-800 text-center text-6xl py-3 font-extrabold">Wordle</h1>
        <div className='flex flex-col gap-1 text-white mt-10'>
        {popup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
              <p className="text-red-600 font-bold">{error}</p>
              <button 
                onClick={() => setPopup(false)} 
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
