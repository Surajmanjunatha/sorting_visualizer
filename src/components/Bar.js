import { useState, useEffect } from 'react';
import './Bar.css';

const Bars = ({ index, length, colorKey }) => {
	const [len, setLen] = useState(length);
    const colors = ['#3d5af1', '#ff304f', '#83e85a'];

	useEffect(() => {
		setLen(length);
	}, [length]);

	let barStyle = {
		background: colors[colorKey],
		height: length * 2,
	};

	let textStyle = {
		position: 'absolute',
		bottom: '-20px',
		width: '100%',
		textAlign: 'center',
		fontSize: '12px'
	};

	return (
		<div className='bar-wrapper'>
			<div className='bar' style={barStyle} data-color={colorKey}>
			</div>
			<div className='text' style={textStyle}>
				{len}
			</div>
			<div className='index' style={{fontSize: '10px', color:'#999', marginTop:'2px'}}>{index}</div>
		</div>
	);
};

export default Bars;