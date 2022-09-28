import './App.css';
import {useState} from 'react';

const numbers=[[0,"zero"],[1,"one"], [2,"two"],[3,"three"],[4,"four"],[5,"five"],[6,"six"],[7,'seven'],[8,"eight"],[9,"nine"]]
const operators=[["+","add", "+"],["-","subtract","-"],['X',"multiply","*"],['/', "divide","/"]]
function calcule(a,operation, b){
  if(operation === "+")
    return a + b;
  if(operation === "-")
    return a - b;
  if(operation === "*")
    return a * b;
  if(operation === "/")
    return a/b;
}
function testPeriod(text){
  if(text.indexOf(".")){
    return true;
  }else{
    return false
  }
}

function App() {
  const initialState = {value1:"0",operation:"",value2:""}
  const [state, setState] = useState(initialState)
  function clearState (){
    setState(initialState);
  }
  function insertDot(){
    state.operation?(testPeriod(state.value1)?setState({...state}):setState({...state, value1:state.value1 += '.'})):(testPeriod(state.value2)?setState({...state}):setState({...state,value2:state.value2 += '.'}))
  }
  function setNumber(input){
    console.log(input)
    !state.operation?(state.value1 ==="0"? (input === "0"?setState({...initialState}):setState({...state,value1:input})):setState({...state,value1:state.value1 + `${input}` })):setState({...state, value2:state.value2 + `${input}`});
    //console.log(state)
  }
  function result(){
    let resultado = calcule(parseFloat(state.value1), state.operation, parseFloat(state.value2)); 
    setState({...initialState,value1:resultado} )
  }
  const setOperator = (op)=>{
      if(state.operation){
        result()
      }
        setState({...state, operation:op})
      
  }

  return (
    <div className="App">
      <div id="display">{`${state.value1} ${state.operation} ${state.value2}`}</div>
      <div id="numbers">
      { numbers.map(element => {
        return <div id={element[1]} onClick={()=>setNumber(element[0])}>{element[0]}</div>
      })}<div id="decimal" onClick={()=>insertDot}>.</div>
      <div id="equals" onClick={()=>result()}>=</div>
      </div>
      <div id="operations">
        {operators.map(operator=> <div id={operator[1]} onClick={()=>setOperator(operator[2])}>{operator[0]}</div>)}
        <div id='clear'onClick={()=>clearState()}>AC</div>
      </div>
      </div>
  );
}

export default App;
