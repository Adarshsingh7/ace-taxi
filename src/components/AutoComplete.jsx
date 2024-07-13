/** @format */

import { useState, useEffect, useRef } from 'react';
import { getPoi } from '../utils/apiReq';

const Autocomplete = ({ placeholder, onPushChange, onChange, value }) => {
	const [inputValue, setInputValue] = useState(value || '');
	const [options, setOptions] = useState([]);
	const [showOptions, setShowOptions] = useState(false);
	const [focus, setFocus] = useState(false);
	const [activeOptionIndex, setActiveOptionIndex] = useState(-1);

	const inputRef = useRef(null);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	useEffect(() => {
		if (inputValue.length < 3) {
			setOptions([]);
			return;
		}
		async function fetchData() {
			try {
				const response = await getPoi(inputValue);
				setOptions(
					response.map((item) => ({
						label: item.address,
						...item,
					}))
				);
				setShowOptions(true);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchData();
	}, [inputValue]);

	const handleInputChange = (e) => {
		const newValue = e.target.value;
		setInputValue(newValue);
		onChange(e);
		setActiveOptionIndex(-1);
	};

	const handleSelectOption = (option) => {
		console.log(option);
		onPushChange(option.address, option.postcode);
		setOptions(options.filter((opt) => opt.label !== option.label));
		setShowOptions(false);
		setFocus(false);
		setInputValue(value);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			setShowOptions(false);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			setActiveOptionIndex((prevIndex) =>
				Math.min(prevIndex + 1, options.length - 1)
			);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setActiveOptionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
		} else if (e.key === 'Enter' && activeOptionIndex >= 0) {
			e.preventDefault();
			handleSelectOption(options[activeOptionIndex]);
		}
	};

	function handleFocus() {
		setFocus(true);
	}

	function handleBlur() {
		// Delay onBlur to allow option click to register
		setTimeout(() => {
			setFocus(false);
			setShowOptions(false);
		}, 500);
	}

	return (
		<div className='relative'>
			<input
				type='text'
				ref={inputRef}
				placeholder={placeholder}
				onBlur={handleBlur}
				onFocus={handleFocus}
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full'
			/>
			{showOptions && focus && inputValue.length > 0 && (
				<ul className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg'>
					{options.map((option, index) => (
						<li
							key={index}
							onClick={() => handleSelectOption(option)}
							className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
								index === activeOptionIndex ? 'bg-gray-200' : ''
							}`}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Autocomplete;
