import { useEffect, useReducer } from 'react';
import './App.css';
import Button from './components/Button';
import { ACTION } from './reducer/calcActions';
import calcReducer, {INITIAL_STATE} from './reducer/calcReducer';


function App() {

  const [state, dispatch] = useReducer(calcReducer, INITIAL_STATE);
  const {prevInput, currentInput, operation} = state;
  const buttonsList = [
    {id: 'ac', title: 'AC', classNames: 'span-two', dispatchType: ACTION.RESET},
    {id: 'del', title: 'DEL', classNames: '', dispatchType: ACTION.CLEAR_INPUT},
    {id: 'divide', title: '/', classNames: '', dispatchType: ACTION.ADD_OPERATION},
    {id: '7', title: '7', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: '8', title: '8', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: '9', title: '9', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: 'multiply', title: '*', classNames: '', dispatchType: ACTION.ADD_OPERATION},
    {id: '4', title: '4', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: '5', title: '5', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: '6', title: '6', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: 'minus', title: '-', classNames: '', dispatchType: ACTION.ADD_OPERATION},
    {id: '1', title: '1', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: '2', title: '2', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: '3', title: '3', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: 'plus', title: '+', classNames: '', dispatchType: ACTION.ADD_OPERATION},
    {id: 'decimal', title: '.', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: 'zero', title: '0', classNames: '', dispatchType: ACTION.ADD_INPUT},
    {id: 'result', title: '=', classNames: 'span-two', dispatchType: ACTION.SHOW_RESULT}
  ];

  
  useEffect(() => {
    console.log('useeffect called');
    const {prevInput, currentInput, operation} = state;
    
    const initKeyboardEvents = evt => {
      if(!evt.keyCode || !evt.code) return;
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
      const code = evt.code;
      const keyCode = evt.keyCode;
      // console.log(code, keyCode);
      // console.log(prevInput, currentInput, operation);
      let dispatchType, data;
      
      // Handle Digit, Numpad Number :: 1,2,3,4,5,6,7,8,9
      if((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106)){
        data = evt.key;
        dispatchType = ACTION.ADD_INPUT;
      }
  
      // Handle Decimal Key :: '.' button
      if(keyCode === 110 && !currentInput.includes('.')){
        dispatchType = ACTION.ADD_INPUT;
        data = '.';
      }
  
      // Handle Operation Number :: '+', '-' , '*', '/' buttons
      if([106,107,109,111].includes(keyCode)){
        data = evt.key;
        dispatchType = ACTION.ADD_OPERATION;
      }
  
      // Handle Delete, Backspace key :: 'DEL' button
      if(keyCode === 46 && code === 'Delete') dispatchType = ACTION.CLEAR_INPUT;
      if(keyCode === 8 && code === 'Backspace') dispatchType = ACTION.CLEAR_INPUT;
  
      // handle ESP key :: 'AC' button
      if(keyCode === 27 && code === 'Escape') dispatchType = ACTION.RESET;
  
      //Handle Ctrl + Enter key :: '=' button
      // if(currentInput && prevInput && operation && keyCode === 13 && code === 'Enter') dispatchType = ACTION.SHOW_RESULT;
      if(keyCode === 13 && code === 'Enter') dispatchType = ACTION.SHOW_RESULT;
  
      if(!dispatchType) return;
  
      dispatch({type: dispatchType, payload: {data}});
    }
    window.removeEventListener('keyup', initKeyboardEvents);
    window.addEventListener('keyup', initKeyboardEvents);

    return () => {
      window.removeEventListener('keyup', initKeyboardEvents);
    }
  }, []);

  return (
    <div className='calc'>
      <div className='calc-output'>
        <div className='calc-output-prev'>{prevInput || ''} {operation || ''}</div>
        <div className='calc-output-current'>{currentInput || ''}</div>
      </div>
      {buttonsList.map(({id, title, classNames, dispatchType}) => (
        <Button key={id} classNames={classNames} text={title} dispatchType={dispatchType} dispatch={dispatch} />  
      ))}
    </div>
  );
}

export default App;
