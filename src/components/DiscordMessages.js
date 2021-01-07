import React, { Children, cloneElement, useContext } from 'react';
import DiscordOptionsContext from '../context/DiscordOptionsContext.js';
import * as DiscordDefaultOptions from '../context/DiscordDefaultOptions.js';
import './DiscordMessages.css';

export default function DiscordMessages({ children, compactMode = false, lightTheme = false }) {
	const options = useContext(DiscordOptionsContext) || DiscordDefaultOptions;

	lightTheme = lightTheme === true || (options.defaultTheme === 'light' && lightTheme !== false);
	compactMode = compactMode === true || (options.defaultMode === 'compact' && compactMode !== false);

	let classes = 'discord-messages';
	if (lightTheme) classes += ' discord-light-theme';
	if (compactMode) classes += ' discord-compact-mode';

	const messages = Children.map(children, (element, index) => {
		return cloneElement(element, { compactMode, key: index });
	});

	return (
		<div className={classes}>
			{messages}
		</div>
	);
}
