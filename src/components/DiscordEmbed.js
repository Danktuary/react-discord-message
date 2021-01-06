import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { elementsWithoutSlot, findSlot, parseTimestamp } from '../util.js';
import './DiscordEmbed.css';

export default class DiscordEmbed extends Component {
	static propTypes = {
		authorName: PropTypes.string,
		authorImage: PropTypes.string,
		authorUrl: PropTypes.string,
		color: PropTypes.string,
		image: PropTypes.string,
		footerImage: PropTypes.string,
		thumbnail: PropTypes.string,
		timestamp: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string,
		]),
		title: PropTypes.string,
		url: PropTypes.string,
	};

	static defaultProps = {
		author: 'User',
	};

	render() {
		const { props } = this;
		const { authorImage, authorName, authorUrl } = props;

		const slots = {
			default: props.children,
			fields: findSlot(props.children, 'fields'),
			footer: findSlot(props.children, 'footer'),
		};

		if (slots.fields) {
			if (!React.isValidElement(slots.fields) || slots.fields.type.name !== 'DiscordEmbedFields') {
				throw new Error('Element with slot name "fields" must be a DiscordEmbedFields component.');
			}

			slots.default = elementsWithoutSlot(slots.default, 'fields');
		}

		if (slots.footer) slots.default = elementsWithoutSlot(slots.default, 'footer');

		const content = {
			author: (
				<div className="discord-embed-author">
					{authorImage ? <img src={authorImage} alt="" className="discord-author-image" /> : null}
					{authorUrl ? <a href={authorUrl} target="_blank">{authorName}</a> : <span>{authorName}</span>}
				</div>
			),
			footer: (
				<div className="discord-embed-footer">
					{slots.footer && props.footerImage
						? <img src={props.footerImage} alt="" className="discord-footer-image" />
						: null
					}
					<span>
						{slots.footer}
						{slots.footer && props.timestamp
							? <span className="discord-footer-separator">&bull;</span>
							: null
						}
						{props.timestamp ? <span>{parseTimestamp(props.timestamp)}</span> : null}
					</span>
				</div>
			),
			title: (
				<div className="discord-embed-title">
					{props.url ? <a href={props.url} target="_blank">{props.title}</a> : <span>{props.title}</span>}
				</div>
			),
		};

		return (
			<div className="discord-embed">
				<div style={{ backgroundColor: props.color }} className="discord-left-border"></div>
				<div className="discord-embed-container">
					<div className="discord-embed-content">
						<div>
							{authorName ? content.author : null}
							{props.title ? content.title : null}
							<div className="discord-embed-description">
								{slots.default}
							</div>
							{slots.fields}
							{props.image ? <img src={props.image} className="discord-embed-image" alt="" /> : null}
						</div>
						{props.thumbnail ? <img src={props.thumbnail} alt="" className="discord-embed-thumbnail" /> : null}
					</div>
					{slots.footer || props.timestamp ? content.footer : null}
				</div>
			</div>
		);
	}
}
