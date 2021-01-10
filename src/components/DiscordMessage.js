import React, { Fragment, isValidElement, useContext } from 'react'
import PropTypes from 'prop-types'
import AuthorInfo from './AuthorInfo.js'
import DiscordDefaultOptions from '../context/DiscordDefaultOptions.js'
import DiscordOptionsContext from '../context/DiscordOptionsContext.js'
import { elementsWithoutSlot, findSlot, parseTimestamp } from '../util.js'
import './DiscordMessage.css'

const now = new Date()

function DiscordMessage({
	author,
	avatar,
	bot,
	children,
	compactMode,
	edited,
	profile: profileKey,
	roleColor,
	timestamp,
}) {
	const options = useContext(DiscordOptionsContext) || DiscordDefaultOptions

	const profileDefaults = { author, bot, roleColor }
	const resolveAvatar = userAvatar => options.avatars[userAvatar] || userAvatar || options.avatars.default

	const userProfile = options.profiles[profileKey] || {}
	userProfile.avatar = resolveAvatar(userProfile.avatar || avatar)

	const profile = { ...profileDefaults, ...userProfile }

	const authorInfo = {
		comfy: (
			<div>
				<AuthorInfo author={profile.author} bot={profile.bot} roleColor={profile.roleColor} />
				<span className="discord-message-timestamp">
					{parseTimestamp(timestamp)}
				</span>
			</div>
		),
		compact: (
			<Fragment>
				<span className="discord-message-timestamp">
					{parseTimestamp(timestamp)}
				</span>
				<AuthorInfo author={profile.author} bot={profile.bot} roleColor={profile.roleColor} />
			</Fragment>
		),
	}

	const checkHighlight = elements => {
		if (!Array.isArray(elements)) return false
		return elements.some(({ props: childProps = {} }) => childProps.highlight && childProps.type !== 'channel')
	}

	let messageClasses = 'discord-message'
	if (children && checkHighlight(children)) messageClasses += ' discord-highlight-mention'

	const slots = {
		'default': children,
		embeds: findSlot(children, 'embeds'),
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
				{!compactMode ? authorInfo.comfy : null}
				<div className="discord-message-body">
					{compactMode ? authorInfo.compact : null}
					{slots.default}
					{edited
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
