import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import hexToRgba from 'hex-to-rgba';
import './DiscordMention.css';

export default class DiscordMention extends Component {
	static propTypes = {
		color: PropTypes.string,
		highlight: PropTypes.bool,
		type(props) {
			if (!['user', 'channel', 'role'].includes(props.type)) {
				return new Error('Type prop inside DiscordMention component must be either "user", "channel", or "role".');
			}
		},
	};

	static defaultProps = {
		type: 'user',
	};

	constructor(props) {
		super(props);
		this.$el = createRef();
	}

	componentDidMount() {
		if (this.props.color && this.props.type === 'role') {
			this.$el.current.addEventListener('mouseover', this.setHoverColor.bind(this));
			this.$el.current.addEventListener('mouseout', this.resetHoverColor.bind(this));
		}
	}

	componentWillUnmount() {
		if (this.props.color && this.props.type === 'role') {
			this.$el.current.removeEventListener('mouseover', this.setHoverColor.bind(this));
			this.$el.current.removeEventListener('mouseout', this.resetHoverColor.bind(this));
		}
	}

	setHoverColor() {
		this.$el.current.style.backgroundColor = hexToRgba(this.props.color, 0.3);
	}

	resetHoverColor() {
		this.$el.current.style.backgroundColor = hexToRgba(this.props.color, 0.1);
	}

	render() {
		const { children, color, type } = this.props;

		const colorStyle = !color || type !== 'role'
			? {}
			: {
				color: color,
				backgroundColor: hexToRgba(color, 0.1),
			};

		const slots = { default: children };
		const mentionCharacter = type === 'channel' ? '#' : '@';

		if (!slots.default) {
			slots.default = type === 'channel' ? type : type.charAt(0).toUpperCase() + type.slice(1);
		}

		return (
			<span style={colorStyle} className="discord-mention" ref={this.$el}>
				{mentionCharacter}{slots.default}
			</span>
		);
	}
}
