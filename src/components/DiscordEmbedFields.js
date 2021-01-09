import React from 'react'
import PropTypes from 'prop-types'
import './DiscordEmbedFields.css'

function DiscordEmbedFields({ children }) {
	return (
		<div className="discord-embed-fields">{children}</div>
	)
}

DiscordEmbedFields.propTypes = {
	children: PropTypes.node,
}

export default DiscordEmbedFields
