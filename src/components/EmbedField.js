import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EmbedField.css';

export default class EmbedField extends Component {
	static propTypes = {
		inline: PropTypes.bool,
		title: PropTypes.string.isRequired,
	};

	render() {
		const { children, inline, title } = this.props;
		let classes = 'discord-embed-field';
		if (inline) classes += ' discord-inline-field';

		return (
			<div className={classes}>
				<div className="discord-field-title">{title}</div>
				{children}
			</div>
		);
	}
}
