import React from 'react';
import styles from './DiscordMessages.css';

export default ({ children, compactMode, lightTheme }) => {
	let classes = styles['discord-messages'];

	if (lightTheme) classes += ` ${styles['discord-light-theme']}`;
	// if (compactMode) classes += ` ${styles['discord-compact-mode']}`;

	return (
		<div className={classes}>
			{children}
		</div>
	);
};
