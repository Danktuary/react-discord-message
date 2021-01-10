import React, { isValidElement } from 'react'
import PropTypes from 'prop-types'
import { elementsWithoutSlot, findSlot, parseTimestamp } from '../util.js'
import './DiscordEmbed.css'

function DiscordEmbed({
	authorImage,
	authorName,
	authorUrl,
	children,
	color,
	footerImage,
	image,
	thumbnail,
	timestamp,
	title,
	url,
}) {
	const slots = {
		'default': children,
		fields: findSlot(children, 'fields'),
		footer: findSlot(children, 'footer'),
	}

	if (slots.fields) {
		if (!isValidElement(slots.fields)) {
			throw new Error('Element with slot name "fields" should be a valid DiscordEmbedFields component.')
		}

		slots.default = elementsWithoutSlot(slots.default, 'fields')
	}

	if (slots.footer) slots.default = elementsWithoutSlot(slots.default, 'footer')

	const content = {
		author: (
			<div className="discord-embed-author">
				{authorImage ? <img src={authorImage} alt="" className="discord-author-image" /> : null}
				{authorUrl ? <a href={authorUrl} target="_blank" rel="noopener noreferrer">{authorName}</a> : <span>{authorName}</span>}
			</div>
		),
		footer: (
			<div className="discord-embed-footer">
				{slots.footer && footerImage
					? <img src={footerImage} alt="" className="discord-footer-image" />
					: null
				}
				<span>
					{slots.footer}
					{slots.footer && timestamp
						? <span className="discord-footer-separator">&bull;</span>
						: null
					}
					{timestamp ? <span>{parseTimestamp(timestamp)}</span> : null}
				</span>
			</div>
		),
		title: (
			<div className="discord-embed-title">
				{url ? <a href={url} target="_blank" rel="noopener noreferrer">{title}</a> : <span>{title}</span>}
			</div>
		),
	}

	return (
		<div className="discord-embed">
			<div style={{ backgroundColor: color }} className="discord-left-border"></div>
			<div className="discord-embed-container">
				<div className="discord-embed-content">
					<div>
						{authorName ? content.author : null}
						{title ? content.title : null}
						<div className="discord-embed-description">
							{slots.default}
						</div>
						{slots.fields}
						{image ? <img src={image} alt="" className="discord-embed-image" /> : null}
					</div>
					{thumbnail ? <img src={thumbnail} alt="" className="discord-embed-thumbnail" /> : null}
				</div>
				{slots.footer || timestamp ? content.footer : null}
			</div>
		</div>
	)
}

DiscordEmbed.propTypes = {
	authorImage: PropTypes.string,
	authorName: PropTypes.string,
	authorUrl: PropTypes.string,
	children: PropTypes.node,
	color: PropTypes.string,
	footerImage: PropTypes.string,
	image: PropTypes.string,
	thumbnail: PropTypes.string,
	timestamp: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.string,
	]),
	title: PropTypes.string,
	url: PropTypes.string,
}

DiscordEmbed.defaultProps = {
	author: 'User',
}

export default DiscordEmbed
