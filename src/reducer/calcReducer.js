import { ACTION } from './calcActions';

const INITIAL_STATE = { prevInput: '', operation: '', currentInput: '', override: false};

const performAddInput = (state, payload_data) => {
    const {currentInput, override} = state;
    let new_state =  {...state, override: false};
    if(override){
        new_state['currentInput'] = `${payload_data === '.' ? '0': ''}${payload_data}`;    
        new_state['prevInput'] = '';    
        new_state['operation'] = '';    
    } else {
        if(payload_data === '.') {
            if(currentInput.includes('.')) return new_state;
            new_state['currentInput'] = `${currentInput ? currentInput : 0}${payload_data}`;
        } else {
            new_state['currentInput'] = `${currentInput}${payload_data}`;
        }
        
    }

    return new_state;
}

const performAddOperationEvent = (state, payload_data) => {
    const {prevInput, currentInput} = state;
    let new_state = {
        ...state,
        operation: payload_data,
        override: false
    };

    if(prevInput && currentInput){
        new_state['prevInput'] = `${calcResult(state)}`;
        new_state['currentInput'] = '';
    } 
    
    if(!prevInput && currentInput){
        new_state['prevInput'] = currentInput;
        new_state['currentInput'] = '';
    }

    return new_state;
}

const calcResult = state => {
    let result = '';
    const {prevInput, currentInput, operation} = state;
    if(!prevInput || !currentInput || !operation) return result;
    const prevInputNum = Number(prevInput);
    const currentInputNum = Number(currentInput);

    switch(operation){
        case '+':
            result = prevInputNum + currentInputNum;
            break;
        case '-':
            result = prevInputNum - currentInputNum;
            break;
        case '*':
            result = prevInputNum * currentInputNum;
            break;
        case '/':
            if(currentInputNum === 0){
                alert('Divide by zero error');
                result = '';
            } else {
                result = prevInputNum / currentInputNum;
            }
            break;
        default:
            result = '';
    }

    return result;
}

const calcReducer = (state = INITIAL_STATE, {type, payload}) => {
    let new_state = {};
    const {currentInput} = state;

    switch(type){
        case ACTION.ADD_INPUT:
            new_state = performAddInput(state, payload.data);
            break;

        case ACTION.ADD_OPERATION:
            new_state = performAddOperationEvent(state, payload.data);
            break;

        case ACTION.RESET:
            new_state = { prevInput: '', operation: '', currentInput: '', override: false }
            break;

        case ACTION.CLEAR_INPUT:
            new_state = { ...state, currentInput: currentInput ? currentInput.slice(0,-1): '', override: false }
            break;

        case ACTION.SHOW_RESULT:
            new_state = { ...state, prevInput: '', operation: '', currentInput: `${calcResult(state)}`, override: true }
            break;

        default:
            new_state = {...state};
    }

    return new_state;
}

export {INITIAL_STATE}
export default calcReducer;