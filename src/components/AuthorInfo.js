import React from 'react';
import styles from './AuthorInfo.css';

export default ({ bot, children, roleColor }) => {
	return (
		<span className={styles['discord-author-info']}>
			<span style={{ color: roleColor }} className={styles['discord-author-username']}>
				{children}
			</span>
			{bot
				? <span className={styles['discord-bot-tag']}>Bot</span>
				: null
			}
		</span >
	);
};
