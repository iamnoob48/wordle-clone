function Line({ guess, isFinal, answer }) {
    const tiles = [];
    const colors = Array(5).fill("");

    if(isFinal){
        const letterCount = {};
        for (let char of answer) {
          letterCount[char] = (letterCount[char] || 0) + 1;
        }
      
       
        for (let i = 0; i < 5; i++) {
          if (guess[i] === answer[i]) {
            colors[i] = "bg-green-400";
            letterCount[guess[i]]--; 
          }
        }
      
        for (let i = 0; i < 5; i++) {
          if (colors[i]) continue; 
          const char = guess[i];
          if (letterCount[char] > 0) {
            colors[i] = "bg-yellow-400";
            letterCount[char]--;
          } else {
            colors[i] = "bg-gray-300";
          }
        }

    }
    
   
  
    for (let i = 0; i < 5; i++) {
      tiles.push(
        <div
          key={i}
          className={`w-15 h-15 border border-gray-600 flex items-center justify-center font-bold text-2xl uppercase ${colors[i]} hover:translate-1 rounded`}
        >
          {guess[i]}
        </div>
      );
    }
  
    return (
      <div>
        
        <div className="flex gap-2 justify-center ">{tiles}</div>
      </div>
    );
  }
  
  export default Line;
  