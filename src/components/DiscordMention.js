import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import hexToRgba from 'hex-to-rgba'
import DiscordOptionsContext from '../context/DiscordOptionsContext.js'
import * as DiscordDefaultOptions from '../context/DiscordDefaultOptions.js'
import './DiscordMention.css'

export default class DiscordMention extends Component {
	static contextType = DiscordOptionsContext

	static propTypes = {
		color: PropTypes.string,
		highlight: PropTypes.bool,
		profile: PropTypes.string,
		type(props) {
			if (!['user', 'channel', 'role'].includes(props.type)) {
				return new RangeError('Type prop inside DiscordMention component must be either "user", "channel", or "role".')
			}
		},
	};

	static defaultProps = {
		type: 'user',
	};

	constructor(props) {
		super(props)
		this.$el = createRef()
		this.user = {}
		this.roleColor = props.color
	}

	componentDidMount() {
		if (this.roleColor && this.props.type === 'role') {
			this.$el.current.addEventListener('mouseover', this.setHoverColor.bind(this))
			this.$el.current.addEventListener('mouseout', this.resetHoverColor.bind(this))
		}
	}

	componentWillUnmount() {
		if (this.roleColor && this.props.type === 'role') {
			this.$el.current.removeEventListener('mouseover', this.setHoverColor.bind(this))
			this.$el.current.removeEventListener('mouseout', this.resetHoverColor.bind(this))
		}
	}

	setHoverColor() {
		this.$el.current.style.backgroundColor = hexToRgba(this.roleColor, 0.3)
	}

	resetHoverColor() {
		this.$el.current.style.backgroundColor = hexToRgba(this.roleColor, 0.1)
	}

	render() {
		const { children, color, profile, type } = this.props

		this.user = (this.context || DiscordDefaultOptions).profiles[profile] || {}
		this.roleColor = this.user.roleColor || color

		const colorStyle = !this.roleColor || type !== 'role'
			? {}
			: {
				color: this.roleColor,
				backgroundColor: hexToRgba(this.roleColor, 0.1),
			}

		const slots = { 'default': children }
		const mentionCharacter = type === 'channel' ? '#' : '@'

		if (!slots.default) {
			slots.default = type === 'user' && this.user.author
				? this.user.author
				: type === 'channel' ? type : type.charAt(0).toUpperCase() + type.slice(1)
		}

		return (
			<span style={colorStyle} className="discord-mention" ref={this.$el}>
				{mentionCharacter}{slots.default}
			</span>
		)
	}
}
