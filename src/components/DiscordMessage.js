import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AuthorInfo from './AuthorInfo.js';
import { config, elementsWithoutSlot, findSlot, parseTimestamp } from '../util.js';
import './DiscordMessage.css';

const now = new Date();

export default class DiscordMessage extends Component {
	static propTypes = {
		author: PropTypes.string,
		avatar: PropTypes.string,
		bot: PropTypes.bool,
		edited: PropTypes.bool,
		roleColor: PropTypes.string,
		timestamp: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string,
		]),
		user: PropTypes.string,
	};

	static defaultProps = {
		author: 'User',
		timestamp: now,
	};

	createProfile() {
		const { props } = this;

		const resolveAvatar = avatar => config.avatars[avatar] || avatar || config.avatars.default;
		const defaults = {
			author: props.author,
			bot: props.bot,
			roleColor: props.roleColor,
		};

		const profile = config.profiles[props.user] || {};
		profile.avatar = resolveAvatar(profile.avatar || props.avatar);

		return Object.assign(defaults, profile);
	}

	checkHighlight(children) {
		if (!Array.isArray(children)) return false;
		return children.some(child => {
			const { props = {}, type = {} } = child;
			return type.name === 'DiscordMention' && props.highlight && props.type !== 'channel';
		});
	}

	render() {
		const { props } = this;
		const profile = this.createProfile();

		const authorInfo = {
			comfy: (
				<div>
					<AuthorInfo bot={profile.bot} roleColor={profile.roleColor}>
						{profile.author}
					</AuthorInfo>
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
					<AuthorInfo bot={profile.bot} roleColor={profile.roleColor}>
						{profile.author}
					</AuthorInfo>
				</Fragment>
			),
		};

		let messageClasses = 'discord-message';

		if (props.children && this.checkHighlight(props.children)) messageClasses += ' discord-highlight-mention';

		const slots = {
			default: props.children,
			embeds: findSlot(props.children, 'embeds'),
		};

		if (slots.embeds) {
			if (!React.isValidElement(slots.embeds) || slots.embeds.type.name !== 'DiscordEmbed') {
				throw new Error('Element with slot name "embeds" must be a DiscordEmbed component.');
			}

			slots.default = elementsWithoutSlot(slots.default, 'embeds');
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
		);
	}
}
