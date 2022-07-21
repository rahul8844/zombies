import React, { useState } from 'react';
import './Inputs.css';

const humans = [0,1,2];

export  const Inputs = ({handleInput}) =>{
    const [grid, setGrid] = useState(0);
    const [zPos, setZPos] = useState([]);
    const [hPos, setHPos] = useState(humans.map(()=>([])));
    const [movements, setMovements] = useState('');

    const handleSumbitInput =()=>{
        handleInput({
            grid,
            zPos,
            hPos,
            movements
        });
    }

    const handleHumanPosition =(val, e, type)=>{
        const temp = [...hPos];
        if(type==='x'){
            temp[val][0] = Number(e.target.value);
        }
        if(type === 'y'){
            temp[val][1] = Number(e.target.value);
        }
        setHPos([...temp]);
    }

    return(
        <>
            <h2>Please provide following inputs correctly </h2>
            <div className='d-flex'>
                <label>Grid</label>
                <input type={'number'} value={grid} min={0} onChange={(e)=> setGrid(Number(e.target.value))}></input>
            </div>
            <div className='d-flex'>
                <label>{`Initial zombie position`}</label>
                <input type={'number'}  placeHolder={'x'} value={zPos[0]} className="mr-10" min={0} max={grid-1} onChange={(e)=> setZPos([Number(e.target.value), zPos[1]])}></input>
                <input type={'number'}  placeHolder={'y'} value={zPos[1]} min={0} max={grid-1} onChange={(e)=> setZPos([zPos[0], Number(e.target.value)])}></input>
            </div>
            <div className='d-flex'>
                <label>{`Humans' position: `}</label>
                <div></div>
            </div>
            {humans.map(val=>(
                <div className='d-flex' key={val}>
                    <label>{'-'}</label>
                    <div>
                        <input type={'number'}  placeHolder={'x'} value={hPos[val][0]} min={0} className="mr-10"  max={grid-1} onChange={(e)=> handleHumanPosition(val, e, 'x')}></input>
                        <input type={'number'}  placeHolder={'y'} value={hPos[val][1]} min={0} max={grid-1} onChange={(e)=> handleHumanPosition(val, e, 'y')}></input>
                    </div>
                </div>
            ))}
            <div className='d-flex'>
                <label>Movements</label>
                <input type={'text'} value={movements} onChange={(e)=> setMovements(e.target.value)}></input>
            </div>
            <div >
                <button onClick={handleSumbitInput}> Submit </button>
            </div>
        </>
    );
} 