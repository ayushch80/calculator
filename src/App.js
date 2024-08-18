import './App.css';
import {
	PiBackspaceBold,
	PiPercentBold,
	PiPlusBold,
	PiMinusBold,
	PiXBold,
	PiDivideBold,
	PiEqualsBold
} from "react-icons/pi";

import { useState, useEffect } from 'react';

function App() {

	const [current, setCurrent] = useState('');
	const [result, setResult] = useState('');

	// save current state of equals click
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		resultEval();
	}, [current])

	function click(button) {
		// change clicked to true
		setClicked(false);
		if (button === 'AC') {
			// ALL CLEAR
			setCurrent('');
			setResult('');
		} else if (button === 'B') {
			// BACKSPACE
			let temp_current = current.slice(0, -1);
			setCurrent(temp_current);
		} else if (['00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(button)) {
			// NUMBERS
			let temp_current = `${current}${button}`
			setCurrent(temp_current);
		} else if (button === 'P') {
			// PERCENT
			let temp_current = `${current}%`
			setCurrent(temp_current);
		} else if (['D', 'X', 'M', 'A'].includes(button)) {
			// OPERATOR
			if (['÷', '×', '-', '+'].includes(current[current.length - 1])) {
				console.log("O");

			} else {
				let temp_current = current;

				if (button === 'D') {
					temp_current += '÷'
				} else if (button === 'X') {
					temp_current += '×'
				} else if (button === 'M') {
					temp_current += '-'
				} else if (button === 'A') {
					temp_current += '+'
				}

				setCurrent(temp_current);
			}

		} else if (button === 'E') {
			// EQUALS CLICK

			// change clicked to true
			setClicked(true);
		}
	}

	function currentDisplay() {
		return current
	}

	function resultDisplay() {
		return result;
	}

	function currentParser () {
		let parsed = current.split('');
		for (let i = 0; i < parsed.length; i++) {
			if (parsed[i] === '%') {
				if (parsed[i+1]) parsed[i] = '*(0.01)*'
				else parsed[i] = '*(0.01)'
			} else if (parsed[i] === '÷') {
				parsed[i] = '/'
			} else if (parsed[i] === '×') {
				parsed[i] = '*'
			}
		}
		// console.log(parsed.join(''))
		return parsed.join('');
	}

	function resultEval () {
		try {
			const parsed_current = currentParser();
			// console.log(parsed_current)
			if (eval(parsed_current) || eval(parsed_current) === 0) {
				setResult(eval(parsed_current))
			}
		} catch (e) {
			// console.log(e)
			setResult('Invalid Expression')
		}
	}

	return (
		<div className="App">
			<div className="display">
				<div className={`current ${clicked ? 'current-transition' : ''}`}>
					{currentDisplay()}
					{/* <span className="cursor">&nbsp;|</span> */}
				</div>
				<div className={`result ${clicked ? 'result-transition' : ''}`}>
					{resultDisplay()}
				</div>
			</div>
			<div className="keyboard">
				{/*All Clear*/}
				<div className="keyboard-button symbol button_AC" onClick={() => { click('AC') }}>AC</div>
				{/*Backspace*/}
				<div className="keyboard-button symbol button_Backspace" onClick={() => { click('B') }}><PiBackspaceBold /></div>
				{/*Numbers*/}
				<div className="keyboard-button button_7" onClick={() => { click('7') }}>7</div>
				<div className="keyboard-button button_8" onClick={() => { click('8') }}>8</div>
				<div className="keyboard-button button_9" onClick={() => { click('9') }}>9</div>
				<div className="keyboard-button button_4" onClick={() => { click('4') }}>4</div>
				<div className="keyboard-button button_5" onClick={() => { click('5') }}>5</div>
				<div className="keyboard-button button_6" onClick={() => { click('6') }}>6</div>
				<div className="keyboard-button button_1" onClick={() => { click('1') }}>1</div>
				<div className="keyboard-button button_2" onClick={() => { click('2') }}>2</div>
				<div className="keyboard-button button_3" onClick={() => { click('3') }}>3</div>
				<div className="keyboard-button button_00" onClick={() => { click('00') }}>00</div>
				<div className="keyboard-button button_0" onClick={() => { click('0') }}>0</div>
				<div className="keyboard-button button_Decimal" onClick={() => { click('.') }}>.</div>
				{/*Symbols*/}
				<div className="keyboard-button symbol button_Percent" onClick={() => { click('P') }}><PiPercentBold /></div>
				<div className="keyboard-button symbol button_Divide" onClick={() => { click('D') }}><PiDivideBold /></div>
				<div className="keyboard-button symbol button_Multiply" onClick={() => { click('X') }}><PiXBold /></div>
				<div className="keyboard-button symbol button_Minus" onClick={() => { click('M') }}><PiMinusBold /></div>
				<div className="keyboard-button symbol button_Plus" onClick={() => { click('A') }}><PiPlusBold /></div>
				<div className="keyboard-button equals button__Equals" onClick={() => { click('E') }}><PiEqualsBold /></div>
			</div>
		</div>
	);
}


export default App;
