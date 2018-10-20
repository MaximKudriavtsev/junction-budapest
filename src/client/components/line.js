import React, { PureComponent } from 'react';
import './line.css';

/* eslint-disable */
export class Line extends PureComponent {
	render() {
		return (
			<div
				className="pulse"
				style={{
					transform: `translate(300px, 200px)`,
					transition: 'all 2s linear'
				}}
			/>
		);
	}
}