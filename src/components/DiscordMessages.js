import React from 'react';
import './DiscordMessages.css';

export default ({ children, compactMode = false, lightTheme = false }) => {
	let classes = 'discord-messages';

	if (lightTheme) classes += ' discord-light-theme';
	if (compactMode) classes += ' discord-compact-mode';

	const makeCompact = element => React.cloneElement(element, { compactMode });
	const messages = !Array.isArray(children) ? makeCompact(children) : children.map(makeCompact);

	return (
		<div className={classes}>
			{messages}
		</div>
	);
};
