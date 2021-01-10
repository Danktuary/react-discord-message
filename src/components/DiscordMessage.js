import React, { Fragment, isValidElement, useContext } from 'react'
import PropTypes from 'prop-types'
import AuthorInfo from './AuthorInfo.js'
import DiscordDefaultOptions from '../context/DiscordDefaultOptions.js'
import DiscordOptionsContext from '../context/DiscordOptionsContext.js'
import { elementsWithoutSlot, findSlot, parseTimestamp } from '../util.js'
import './DiscordMessage.css'

const now = new Date()

function DiscordMessage(props) {
	const options = useContext(DiscordOptionsContext) || DiscordDefaultOptions

	const resolveAvatar = avatar => options.avatars[avatar] || avatar || options.avatars.default
	const defaults = {
		author: props.author,
		bot: props.bot,
		roleColor: props.roleColor,
	}

	const userProfile = options.profiles[props.profile] || {}
	userProfile.avatar = resolveAvatar(userProfile.avatar || props.avatar)

	const profile = { ...defaults, ...userProfile }

	const authorInfo = {
		comfy: (
			<div>
				<AuthorInfo author={profile.author} bot={profile.bot} roleColor={profile.roleColor} />
				<span className="discord-message-timestamp">
					{parseTimestamp(props.timestamp)}
				</span>
			</div>
		),
		compact: (
			<Fragment>
				<span className="discord-message-timestamp">
					{parseTimestamp(props.timestamp)}
				</span>
				<AuthorInfo author={profile.author} bot={profile.bot} roleColor={profile.roleColor} />
			</Fragment>
		),
	}

	const checkHighlight = children => {
		if (!Array.isArray(children)) return false
		return children.some(({ props: childProps = {} }) => childProps.highlight && childProps.type !== 'channel')
	}

	let messageClasses = 'discord-message'
	if (props.children && checkHighlight(props.children)) messageClasses += ' discord-highlight-mention'

	const slots = {
		'default': props.children,
		embeds: findSlot(props.children, 'embeds'),
	}

	if (slots.embeds) {
		if (!isValidElement(slots.embeds)) {
			throw new Error('Element with slot name "embeds" should be a valid DiscordEmbed component.')
		}

		slots.default = elementsWithoutSlot(slots.default, 'embeds')
	}

	return (
		<div className={messageClasses}>
			<div className="discord-author-avatar">
				<img src={profile.avatar} alt={profile.author} />
			</div>
			<div className="discord-message-content">
				{!props.compactMode ? authorInfo.comfy : null}
				<div className="discord-message-body">
					{props.compactMode ? authorInfo.compact : null}
					{slots.default}
					{props.edited
						? <span className="discord-message-edited">(edited)</span>
						: null
					}
				</div>
				{slots.embeds}
			</div>
		</div>
	)
}

DiscordMessage.propTypes = {
	author: PropTypes.string,
	avatar: PropTypes.string,
	bot: PropTypes.bool,
	children: PropTypes.node,
	compactMode: PropTypes.bool,
	edited: PropTypes.bool,
	profile: PropTypes.string,
	roleColor: PropTypes.string,
	timestamp: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.string,
	]),
}

DiscordMessage.defaultProps = {
	author: 'User',
	timestamp: now,
}

export default DiscordMessage
