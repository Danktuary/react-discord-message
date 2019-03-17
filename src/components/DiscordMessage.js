import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthorInfo from './AuthorInfo.js';
import filters from '../util/filters.js';
import styles from './DiscordMessage.css';

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
	};

	// TEMP: This should be eventually be somewhat the equivalant of `this.$root.$discordMessage` in Vue
	discord = {
		avatars: {
			default: 'https://i.imgur.com/FPWMhCa.png',
		},
		profiles: {},
	};

	createProfile() {
		const { discord, props } = this;
		const resolveAvatar = avatar => discord.avatars[avatar] || avatar || discord.avatars.default;
		const defaults = {
			author: props.author,
			bot: props.bot,
			roleColor: props.roleColor,
		};

		const profile = discord.profiles[props.user] || {};
		profile.avatar = resolveAvatar(profile.avatar || props.avatar);

		return Object.assign(defaults, profile);
	}

	renderTimestamp() {
		const timestamp = this.props.timestamp || new Date();
		const { formatDate, padZeroes } = filters.dates;
		return padZeroes(formatDate(timestamp));
	}

	render() {
		const { children } = this.props;
		const profile = this.createProfile();

		const comfyAuthorInfo = (
			<div>
				<AuthorInfo bot={profile.bot} roleColor={profile.roleColor}>
					{profile.author}
				</AuthorInfo>
				<span className={styles['discord-message-timestamp']}>
					{this.renderTimestamp()}
				</span>
			</div>
		);

		// TEMP: Should be taken from "plugin options" somehow
		const compactMode = false;

		return (
			<div className={styles['discord-message']}>
				<div className={styles['discord-author-avatar']}>
					<img src={profile.avatar} alt={profile.author} />
				</div>
				<div className={styles['discord-message-content']}>
					{!compactMode ? comfyAuthorInfo : null}
					<div className={styles['discord-message-body']}>
						{children}
					</div>
				</div>
			</div>
		);
	}
}
