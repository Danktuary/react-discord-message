import React from 'react';
import './AuthorInfo.css';

export default ({ bot, children, roleColor }) => {
	return (
		<span className="discord-author-info">
			<span style={{ color: roleColor }} className="discord-author-username">
				{children}
			</span>
			{bot
				? <span className="discord-bot-tag">Bot</span>
				: null
			}
		</span>
	);
};
