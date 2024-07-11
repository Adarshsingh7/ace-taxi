/** @format */

import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getPoi } from '../utils/apiReq';

export default function ComboBox({
	placeholder,
	onPushChange,
	onChange,
	value,
}) {
	const [data, setData] = useState([]);
	// const [value, setValue] = useState('ASDA');

	function handleSelectOption(event, data) {
		onPushChange(data.address, data.postcode);
	}

	useEffect(() => {
		if (value.length < 3) return;
		async function fetchData() {
			const data = await getPoi(value);
			setData(
				data.map((item) => ({
					label: item.address,
					...item,
				}))
			);
		}
		fetchData();
	}, [value]);

	return (
		<Autocomplete
			disablePortal
			id='combo-box-demo'
			// options={top100Films}
			options={data}
			onChange={handleSelectOption}
			sx={{ width: 300 }}
			inputValue={value}
			onInputChange={(e, n) => n}
			renderInput={(params) => (
				<TextField
					value={value}
					onChange={onChange}
					{...params}
					label={placeholder}
				/>
			)}
		/>
	);
}
