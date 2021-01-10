import React from 'react'
import PropTypes from 'prop-types'
import './AuthorInfo.css'

function AuthorInfo({ author, bot, roleColor }) {
	return (
		<span className="discord-author-info">
			<span style={{ color: roleColor }} className="discord-author-username">
				{author}
			</span>
			{bot ? <span className="discord-bot-tag">Bot</span> : null}
		</span>
	)
}

AuthorInfo.propTypes = {
	author: PropTypes.string,
	bot: PropTypes.bool,
	roleColor: PropTypes.string,
}

export default AuthorInfo
