import React from 'react'
import PropTypes from 'prop-types'
import './DiscordEmbedField.css'

function DiscordEmbedField({ children, fieldTitle, inline }) {
	let classes = 'discord-embed-field'
	if (inline) classes += ' discord-inline-field'

	return (
		<div className={classes}>
			<div className="discord-field-title">{fieldTitle}</div>
			{children}
		</div>
	)
}

DiscordEmbedField.propTypes = {
	children: PropTypes.node,
	fieldTitle: PropTypes.string.isRequired,
	inline: PropTypes.bool,
}

export default DiscordEmbedField
