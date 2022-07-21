import { useState } from 'react';
import './App.css';
import { formatResult } from './Helper';
import input from './input.json';
import { Inputs } from './Inputs';

function App() {

  const [inputValues, setInputValues] = useState({grid: 0, zPos: [], hPos:[[]], movements: ''});

  const computeZombies = () => {
    // Taking Inputs from json files
    const {grid, zPos, hPos, movements } = inputValues;

    // Intializing zombiesStack with initial zombie position
    // Later we'll use it for finding all the created newly zombie positions
    const zStack =[zPos];

    // humans position mutable and converting position into string which will make comparison easier
    let humans = [...hPos];
    let hPosLocation = humans.map(pos=> pos.join(" "));

    // storage for zombies final position
    const result =[];

    while(zStack.length !== 0){

      // taking one zombie position at a time to traverse into directions
      let pos = [...zStack.pop()];

      // this loop for traversing zombie into each direction based on input
      for(let i=0; i<movements.length; i++){
        let move = movements[i]
        switch(move){
          case 'R':
            pos[0] = (pos[0]+1) % grid;
            break;
          case 'L':
            if(pos[0] === 0){
              pos[0] = 3
            }else{
              pos[0] = (pos[0]-1);
            }
            break;
          case 'U':
            if(pos[1] === 0){
              pos[1] = 3
            }else{
              pos[1] = (pos[1]-1);
            }
            break;
          case 'D':
            pos[1] = (pos[1]+1)%grid
            break;
          default: 
            break;
        }

        // checking moved zombie position with humans
        const idx = hPosLocation.indexOf([...pos].join(" "));
        if(idx !== -1){
          /** if moved zombie is in Human position
           *  Push human position to zombieStack (converting human to zombie)
           *  remove humans position from humans position storage
           */ 
          zStack.push(humans[idx]);
          hPosLocation = hPosLocation.filter((_val,index) => index!==idx);
          humans = humans.filter((_val,index) => index!==idx);
        }
      }
      result.push([...pos]);
    };
    return {zombies: formatResult(result), humans: formatResult(humans)}
  }

  return (
    <div className="App">
      <Inputs handleInput={setInputValues}/>
      <div className='bottom-wrapper'>
        <div style={{width: '50%', borderRight: '2px solid grey'}}>
          <h3>Inputs</h3>
          <div>{`Zombies' positions:`}</div>
          <div>{formatResult([inputValues.zPos])}</div>
          <div>{`Creatures' positions:`}</div>
          <div>{formatResult(inputValues.hPos)}</div>
        </div>
        <div style={{width: '50%'}}>
          <h3>Outputs</h3>
          <div>{`Zombies' positions:`}</div>
          <div>{computeZombies().zombies}</div>
          <div>{`Creatures' positions:`}</div>
          <div>{computeZombies().humans}</div>
        </div>
      </div>
      <h2>
        
      </h2>
    </div>
  );
}

export default App;
