import React from 'react';
import './DiscordMessages.css';

export default function DiscordMessages({ children, compactMode = false, lightTheme = false }) {
	let classes = 'discord-messages';
	if (lightTheme) classes += ' discord-light-theme';
	if (compactMode) classes += ' discord-compact-mode';

	const messages = React.Children.map(children, (element, index) => {
		return React.cloneElement(element, { compactMode, key: index });
	});

	return (
		<div className={classes}>
			{messages}
		</div>
	);
}
