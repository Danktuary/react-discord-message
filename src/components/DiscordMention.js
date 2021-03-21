import React, { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import hexToRgba from 'hex-to-rgba'
import DiscordDefaultOptions from '../context/DiscordDefaultOptions.js'
import DiscordOptionsContext from '../context/DiscordOptionsContext.js'
import './DiscordMention.css'

function DiscordMention({ children, color, profile, type }) {
	const options = useContext(DiscordOptionsContext) || DiscordDefaultOptions
	const user = options.profiles[profile] || {}
	const roleColor = user.roleColor || color

	const $el = useRef(null)
	const setHoverColor = () => $el.current.style.backgroundColor = hexToRgba(roleColor, 0.3)
	const resetHoverColor = () => $el.current.style.backgroundColor = hexToRgba(roleColor, 0.1)

	const colorStyle = !roleColor || type !== 'role'
		? {}
		: {
			color: roleColor,
			backgroundColor: hexToRgba(roleColor, 0.1),
		}

	useEffect(() => {
		if ($el.current && roleColor && type === 'role') {
			$el.current.addEventListener('mouseover', setHoverColor)
			$el.current.addEventListener('mouseout', resetHoverColor)
		}

		return () => {
			if ($el.current && roleColor && type === 'role') {
				$el.current.removeEventListener('mouseover', setHoverColor)
				$el.current.removeEventListener('mouseout', resetHoverColor)
			}
		}
	}, [])

	const slots = { 'default': children }
	const mentionCharacter = type === 'channel' ? '#' : '@'

	if (!slots.default) {
		slots.default = type === 'user' && user.author
			? user.author
			: type === 'channel' ? type : type.charAt(0).toUpperCase() + type.slice(1)
	}

	return (
		<span style={colorStyle} className="discord-mention" ref={$el}>
			{mentionCharacter}{slots.default}
		</span>
	)
}

DiscordMention.propTypes = {
	children: PropTypes.node,
	color: PropTypes.string,
	highlight: PropTypes.bool,
	profile: PropTypes.string,
	type(props) {
		if (!['user', 'channel', 'role'].includes(props.type)) {
			return new RangeError('Type prop inside DiscordMention component must be either "user", "channel", or "role".')
		}
	},
}

DiscordMention.defaultProps = {
	type: 'user',
}

export default DiscordMention
