

import './index.css'
import { useState } from 'react';

function App() {

  const [data, setData] = useState("0")
  const [lastResult, setLastResult] = useState(null);


  const operators = ['--','..',  '++', '**', '//', '-/', '-*', '+/', '+*', '+-', '/*', '/-', '/+', '*+', '*/']
  const cal = (nums) => {

    
  

    const regex = /\d+\.\d+\.\d+/
    const regex_2 = /\d\*\-\+\d$/


    const lastVal = data.slice(-1) + nums
    
    
    
    setData((prev) => {
      
      
      const totalStr = prev+nums
            
      if((prev.charAt(0) === '.'  || prev.charAt(0) === '*'  || prev.charAt(0) === '/' )) {
        return '0'
      }
      else if (regex.test(prev+nums)) {
        
        
        const updatedData = prev.replace(/\.\d+\./, '.' + nums + nums )
       
        return updatedData
      }
      else if(prev.charAt(0) === '0') {
        return nums
      }
 
      else if(regex_2.test(totalStr)) {
        return totalStr.replace(/\*\-/, "")
      }
      else if(operators.some(op => lastVal.includes(op))) {
        const newOps=  prev.slice(0, -1)
        
        return newOps+nums
      }

      

      else {
        return prev+nums
      }
      
    })
  }

  

  

  const result = (more) => {
    
    try {

      const newData = data

    
      
      if(more) {
        const evalResult = eval(more);
      setLastResult(evalResult); 
      setData(evalResult.toString());
      }
      const evalResult = eval(data);
      setLastResult(evalResult); 
      setData(evalResult.toString()); 
    } catch (error) {
      console.error("Invalid calculation", error);
      setData("Error");
    }
     
  };
  

  return (
    <div id="calculator">
    <input id="display" readOnly value={data} />
    <div id="keys">
        <button onClick={() => cal("+")} className="operator-btn" id='add'>+</button>
        <button onClick={() => cal("7")} id="seven">7</button>
        <button onClick={() => cal("8")}  id='eight'>8</button>
        <button onClick={() => cal("9")}  id='nine'>9</button>
        <button onClick={() => cal("-")}  id='subtract' className="operator-btn">-</button>
        <button onClick={() => cal("4")}  id="four">4</button>
        <button onClick={() => cal("5")}  id="five">5</button>
        <button onClick={() => cal("6")}  id="six">6</button>
        <button onClick={() => cal("*")}  id='multiply' className="operator-btn">*</button>
        <button onClick={() => cal("1")}  id="one">1</button>
        <button onClick={() => cal("2")}  id="two">2</button>
        <button onClick={() => cal("3")}  id="three">3</button>
        <button onClick={() => cal("/")}  id='divide' className="operator-btn">/</button>
        <button onClick={() => cal("0")}  id="zero">0</button>
        <button onClick={() => cal(".")}  id="decimal">.</button>
        <button onClick={result}   id='equals'>=</button>
        <button onClick={() => setData('0')} className="operator-btn" id="clear">C</button>
    </div>
    </div>
  )
}

export default App
