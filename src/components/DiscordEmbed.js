import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmbedFields from './EmbedFields.js';
import EmbedField from './EmbedField.js';
import './DiscordEmbed.css';

export default class DiscordEmbed extends Component {
	static propTypes = {
		authorName: PropTypes.string,
		authorImage: PropTypes.string,
		authorUrl: PropTypes.string,
		color: PropTypes.string,
		fields: PropTypes.arrayOf(EmbedField),
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
		const { authorImage, authorName, authorUrl, footer } = props;
		const slots = {
			author: (
				<div className="discord-embed-author">
					{authorImage ? <img src={authorImage} alt="" className="discord-author-image" /> : null}
					{authorUrl ? <a href={authorUrl} target="_blank">{authorName}</a> : <span>{authorName}</span>}
				</div>
			),
			fields: props.fields.map((field, index) => {
				return React.createElement(() => field, { key: field.key || index });
			}),
			footer: (
				<div className="discord-embed-footer">
					{footer && props.footerImage
						? <img src={props.footerImage} alt="" className="discord-footer-image" />
						: null
					}
					<span>
						{footer}
						{footer && props.timestamp
							? <span className="discord-footer-separator">&bull;</span>
							: null
						}
						{props.timestamp ? <span>{props.timestamp}</span> : null}
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
							{authorName ? slots.author : null}
							{props.title ? slots.title : null}
							<div className="discord-embed-description">
								{props.children}
							</div>
							<EmbedFields>{slots.fields}</EmbedFields>
							{props.image ? <img src={props.image} className="discord-embed-image" alt="" /> : null}
						</div>
						{props.thumbnail ? <img src={props.thumbnail} alt="" className="discord-embed-thumbnail" /> : null}
					</div>
					{props.footer || props.timestamp ? slots.footer : null}
				</div>
			</div>
		);
	}
}
