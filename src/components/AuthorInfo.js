import React from 'react'
import PropTypes from 'prop-types'
import './AuthorInfo.css'

function AuthorInfo({ bot, children, roleColor }) {
	return (
		<span className="discord-author-info">
			<span style={{ color: roleColor }} className="discord-author-username">
				{children}
			</span>
			{bot ? <span className="discord-bot-tag">Bot</span> : null}
		</span>
	)
}

AuthorInfo.propTypes = {
	bot: PropTypes.bool,
	children: PropTypes.node,
	roleColor: PropTypes.string,
}

export default AuthorInfo
