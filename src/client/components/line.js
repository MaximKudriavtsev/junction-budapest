import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './line.css';

const DELAY = 500;
const ANIMATION_DELAY = 2000;

/* eslint-disable */
export class Line extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			// startX: props.startX || 0,
			// startY: props.startY || 0,
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
		setTimeout(() => {
			const line = ReactDOM.findDOMNode(this);
			// line.remove();
		}, ANIMATION_DELAY + DELAY + 300);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
    const {
			startX,
			startY,
			// endX,
			// endY,
    } = nextProps;

		if (prevState.endX === startX) return({});
    return {
      // startX,
			// startY,
			endX: startX,
			endY: startY,
    };
  }

	render() {
		const {
			startX,
			startY,
		} = this.props;
		const {
			endX,
			endY,
		} = this.state;

		console.log('123');
		return (
			<div
				className="pulse"
				style={{
					transition: `top ${ANIMATION_DELAY / 1000}s ease-in, left ${ANIMATION_DELAY / 1000}s ease-in`,
					transform: `rotate(${ Math.atan((startY - endY/(startX - endX))) }rad)`,
					left: `${endX}px`,
					top: `${endY}px`,
				}}
			/>
		);
	}
}