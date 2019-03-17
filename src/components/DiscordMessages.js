import React from 'react';
import './DiscordMessages.css';

	let classes = 'discord-messages';

	if (lightTheme) classes += ' discord-light-theme';
	if (compactMode) classes += ' discord-compact-mode';

	return (
		<div className={classes}>
			{children}
		</div>
	);
};
