/** @format */

import { useState, useEffect } from 'react';
import { getPoi } from '../utils/apiReq';

const Autocomplete = ({ placeholder, onPushChange, onChange, value }) => {
	const [inputValue, setInputValue] = useState(value || '');
	const [options, setOptions] = useState([]);
	const [showOptions, setShowOptions] = useState(false);
	const [focus, setFocus] = useState(false);

	useEffect(() => {
		if (inputValue.length < 3) {
			setOptions([]);
			return;
		}
		async function fetchData() {
			try {
				// Replace 'getPoi' with your actual API fetching function
				const response = await getPoi(inputValue); // Assuming getPoi is a function that fetches data from an API
				setOptions(
					response.map((item) => ({
						label: item.address,
						...item,
					}))
				);
				setShowOptions(true); // Show options when fetched
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
	};

	const handleSelectOption = (option) => {
		console.log(option);
		setInputValue(option.label);
		onPushChange(option.address, option.postcode);
		setOptions(options.filter((opt) => opt.label !== option.label)); // Remove selected option from suggestions
		setShowOptions(false); // Hide options after selection
		setFocus(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			setShowOptions(false); // Hide options on 'Esc' key press
		}
	};

	const handleFocus = () => {
		setFocus(true);
	};

	const handleBlur = () => {
		// setFocus(false);
	};

	return (
		<div className='relative'>
			<input
				type='text'
				placeholder={placeholder}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={value}
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
							className='px-4 py-2 cursor-pointer hover:bg-gray-100'
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
