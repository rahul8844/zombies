export const formatResult = (result) =>{
    return result.length ? result.map((pos)=>(`(${pos.join(",")}) `)) : 'None';
}