import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './DiscordEmbedField.css'

export default class DiscordEmbedField extends Component {
	static propTypes = {
		fieldTitle: PropTypes.string.isRequired,
		inline: PropTypes.bool,
	};

	render() {
		let classes = 'discord-embed-field'
		if (this.props.inline) classes += ' discord-inline-field'

		return (
			<div className={classes}>
				<div className="discord-field-title">{this.props.fieldTitle}</div>
				{this.props.children}
			</div>
		)
	}
}
