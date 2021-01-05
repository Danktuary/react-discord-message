import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthorInfo from './AuthorInfo.js';
import DiscordEmbed from './DiscordEmbed.js';
import { config, dateFilters } from '../util.js';
import './DiscordMessage.css';

export default class DiscordMessage extends Component {
	static propTypes = {
		author: PropTypes.string,
		avatar: PropTypes.string,
		bot: PropTypes.bool,
		edited: PropTypes.bool,
		embeds: PropTypes.arrayOf(DiscordEmbed),
		roleColor: PropTypes.string,
		timestamp: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string,
		]),
		user: PropTypes.string,
	};

	static defaultProps = {
		author: 'User',
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

	renderTimestamp() {
		const timestamp = this.props.timestamp || new Date();
		return dateFilters.padZeroes(dateFilters.formatDate(timestamp));
	}

	render() {
		const profile = this.createProfile();

		const authorInfo = {
			comfy: (
				<div>
					<AuthorInfo bot={profile.bot} roleColor={profile.roleColor}>
						{profile.author}
					</AuthorInfo>
					<span className="discord-message-timestamp">
						{this.renderTimestamp()}
					</span>
				</div>
			),
			compact: (
				<AuthorInfo bot={profile.bot} roleColor={profile.roleColor}>
					{profile.author}
				</AuthorInfo>
			),
		};

		const { props } = this;
		let messageClasses = 'discord-message-body';

		if (props.children && this.checkHighlight(props.children)) messageClasses += ' discord-highlight-mention';

		return (
			<div className="discord-message">
				<div className="discord-author-avatar">
					<img src={profile.avatar} alt={profile.author} />
				</div>
				<div className="discord-message-content">
					{!props.compactMode ? authorInfo.comfy : null}
					<div className={messageClasses}>
						{props.compactMode ? authorInfo.compact : null}
						{props.children}
						{props.edited
							? <span className="discord-message-edited">(edited)</span>
							: null
						}
					</div>
					{props.embeds}
				</div>
			</div>
		);
	}
}
