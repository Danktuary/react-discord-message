import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hexToRgba from 'hex-to-rgba';
import './DiscordMention.css';

export default class DiscordMention extends Component {
	static propTypes = {
		highlight: PropTypes.bool,
		color: PropTypes.string,
		type: PropTypes.string,
	};

	static defaultProps = {
		type: 'user',
	};

	constructor(props) {
		super(props);
		this.$el = React.createRef();
	}

	componentDidMount() {
		const { props, $el } = this;
		if (props.color && props.type === 'role') {
			$el.current.addEventListener('mouseover', () => this.setHoverColor($el, props.color));
			$el.current.addEventListener('mouseout', () => this.resetHoverColor($el, props.color));
		}
	}

	componentWillUnmount() {
		const { props, $el } = this;
		if (props.color && props.type === 'role') {
			$el.current.removeEventListener('mouseover', () => this.setHoverColor($el, props.color));
			$el.current.removeEventListener('mouseout', () => this.resetHoverColor($el, props.color));
		}
	}

	setHoverColor(element, color) {
		element.current.style.backgroundColor = hexToRgba(this.props.color, 0.3);
	}

	resetHoverColor(element, color) {
		element.current.style.backgroundColor = hexToRgba(this.props.color, 0.1);
	}

	render() {
		const { props } = this;

		const colorStyle = (!props.color || props.type !== 'role')
			? {}
			: {
				color: props.color,
				backgroundColor: hexToRgba(props.color, 0.1),
			};

		const mentionCharacter = props.type === 'channel' ? '#' : '@';

		return (
			<span
				style={colorStyle}
				className="discord-mention"
				ref={this.$el}
			>
				{mentionCharacter}{props.children}
			</span>
		);
	}
}
