import React, { Children, cloneElement, useContext } from 'react'
import PropTypes from 'prop-types'
import DiscordDefaultOptions from '../context/DiscordDefaultOptions.js'
import DiscordOptionsContext from '../context/DiscordOptionsContext.js'
import './DiscordMessages.css'

function DiscordMessages({ children, compactMode, lightTheme }) {
	const options = useContext(DiscordOptionsContext) || DiscordDefaultOptions

	lightTheme = lightTheme === true || (options.defaultTheme === 'light' && lightTheme !== false)
	compactMode = compactMode === true || (options.defaultMode === 'compact' && compactMode !== false)

	let classes = 'discord-messages'
	if (lightTheme) classes += ' discord-light-theme'
	if (compactMode) classes += ' discord-compact-mode'

	const messages = Children.map(children, (element, index) => {
		return cloneElement(element, { compactMode, key: index })
	})

	return (
		<div className={classes}>
			{messages}
		</div>
	)
}

DiscordMessages.propTypes = {
	children: PropTypes.node,
	compactMode: PropTypes.bool,
	lightTheme: PropTypes.bool,
}

export default DiscordMessages
