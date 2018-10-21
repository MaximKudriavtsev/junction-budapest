import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import './line.css';

const DELAY = 500;
const ANIMATION_DELAY = 2000;
const WITH = 15;

/* eslint-disable */
export class Line extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			endX: props.startX || 0,
			endY: props.startY || 0,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				endX: this.props.endX,
				endY: this.props.endY,
			});
		}, DELAY);
		// setTimeout(() => {
		// 	const line = ReactDOM.findDOMNode(this);
		// line.remove();
		// }, ANIMATION_DELAY + DELAY + 300);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
    const {
			startX,
			startY,
    } = nextProps;

		if (prevState.endX === startX) return({});
    return {
			endX: startX,
			endY: startY,
    };
  }

	render() {
		const {
			startX,
			startY,
			scale,
		} = this.props;
		const {
			endX,
			endY,
		} = this.state;

		return (
			<div
				className="pulse"
				style={{
					transition: `top ${ANIMATION_DELAY / 1000}s ease-in, left ${ANIMATION_DELAY / 1000}s ease-in`,
					transform: `rotate(${ Math.atan((startY - endY/(startX - endX))) }rad)`,
					left: `${endX}px`,
					top: `${endY}px`,
					width: `${WITH * scale}px`,
					height: `${WITH * scale}px`
				}}
			/>
		);
	}
}