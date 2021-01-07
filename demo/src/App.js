import React from 'react';
import {
	DiscordMessages,
	DiscordMessage,
	DiscordEmbed,
	DiscordEmbedFields,
	DiscordEmbedField,
	DiscordMention,
	DiscordOptionsContext,
	DiscordDefaultOptions,
} from 'react-discord-message';

const discordOptions = {
	...DiscordDefaultOptions,
	profiles: {
		sanc: {
			author: 'Sanctuary',
			avatar: 'https://i.imgur.com/0TeacfY.png',
			roleColor: '#0099ff',
		},
		twelve: {
			author: 'Twelve',
			avatar: 'https://i.imgur.com/Mc0F0Hf.png',
			roleColor: '#70f0b4',
		},
	},
};

export default () => (
	<div>
		<div>
			<h1 class="logo">React Discord Message</h1>
			&nbsp;
			<span>[<a href="https://github.com/Danktuary/react-discord-message/">Github</a>]</span>
		</div>
		<main>
			<DiscordOptionsContext.Provider value={discordOptions}>
				<h3 className="title">A normal conversation</h3>
				<DiscordMessages>
					<DiscordMessage>
						Hey guys, I'm new here! Glad to be able to join you all!
					</DiscordMessage>
					<DiscordMessage author="Dawn" avatar="red">
						Hi, I'm new here too!
					</DiscordMessage>
					<DiscordMessage profile="sanc">
						Hey, <DiscordMention>User</DiscordMention> and <DiscordMention>Dawn</DiscordMention>. Welcome to our server!<br />Be sure to read through the <DiscordMention type="channel">rules</DiscordMention>. You can ping <DiscordMention type="role" color="#70f0b4">Support</DiscordMention> if you need help.
					</DiscordMessage>
					<DiscordMessage profile="twelve">
						Hello everyone! How's it going?
					</DiscordMessage>
					<DiscordMessage author="User">
						Thank you <DiscordMention highlight={true}>Sanctuary</DiscordMention>!
					</DiscordMessage>
					<DiscordMessage author="Yotsuba" avatar="https://i.imgur.com/amw0MGJ.png">
						I'm doing well, <DiscordMention>Twelve</DiscordMention>. What about yourself?
					</DiscordMessage>
					<DiscordMessage profile="twelve">
						!8ball How am I doing today?
					</DiscordMessage>
					<DiscordMessage author="Rinon" avatar="https://i.imgur.com/axQ9wJl.png" roleColor="violet" bot={true}>
						Yes.
					</DiscordMessage>
				</DiscordMessages>
				<h3 className="title">Light mode</h3>
				<DiscordMessages lightTheme={true}>
					<DiscordMessage>Look at me I'm a beautiful butterfly</DiscordMessage>
					<DiscordMessage edited={true}>Fluttering in the sunlight <span role="img" aria-label="Sun">🌞</span></DiscordMessage>
				</DiscordMessages>
				<h3 className="title">Compact mode</h3>
				<DiscordMessages compactMode={true}>
					<DiscordMessage>Look at me I'm a beautiful butterfly</DiscordMessage>
					<DiscordMessage>Fluttering in the moonlight <span role="img" aria-label="Moon">🌝</span></DiscordMessage>
					<DiscordMessage>Waiting for the day when</DiscordMessage>
					<DiscordMessage>Compact mode would be turned on</DiscordMessage>
				</DiscordMessages>
				<h3 className="title">Mentions</h3>
				<DiscordMessages>
					<DiscordMessage profile="sanc">
						Hey, <DiscordMention>User</DiscordMention> and <DiscordMention>Dawn</DiscordMention>. Welcome to our server! Be sure to read through the <DiscordMention type="channel">rules</DiscordMention>. You can ping <DiscordMention type="role" color="#70f0b4">Support</DiscordMention> if you need help.
					</DiscordMessage>
					<DiscordMessage>
						Hey there <DiscordMention highlight={true}>Sanctuary</DiscordMention>, thanks! I will!
					</DiscordMessage>
				</DiscordMessages>
				<h3 className="title">Full embed example</h3>
				<DiscordMessages>
					<DiscordMessage>
						<DiscordEmbed
							authorImage="https://i.imgur.com/wSTFkRM.png"
							authorName="Some name"
							authorUrl="https://discord.js.org/"
							color="#0099ff"
							embedTitle="Some title"
							footerImage="https://i.imgur.com/wSTFkRM.png"
							image="https://i.imgur.com/wSTFkRM.png"
							thumbnail="https://i.imgur.com/wSTFkRM.png"
							timestamp="01/01/2018"
							url="https://discord.js.org/"
						>
							Some description here
							<DiscordEmbedFields slot="fields">
								<DiscordEmbedField fieldTitle="Regular field title">
									Some value here
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="​">

								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Inline field title" inline={true}>
									Some value here
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Inline field title" inline={true}>
									Some value here
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Inline field title" inline={true}>
									Some value here
								</DiscordEmbedField>
							</DiscordEmbedFields>
							<span slot="footer">Some footer text here</span>
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
				<h3 className="title">Embed fields</h3>
				<DiscordMessages>
					<DiscordMessage>
						<DiscordEmbed>
							<DiscordEmbedFields>
								<DiscordEmbedField fieldTitle="Field title">
									Some value here. Some value here. Some value here
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Field title">
									Some value here. Some value here. Some value here
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Field title">
									Some value here. Some value here. Some value here
								</DiscordEmbedField>
							</DiscordEmbedFields>
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
				<h3 className="title">Inline fields</h3>
				<DiscordMessages>
					<DiscordMessage>
						<DiscordEmbed>
							<DiscordEmbedFields>
								<DiscordEmbedField fieldTitle="Inline field title" inline={true}>
									Some value here
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Inline field title" inline={true}>
									Some value here
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Inline field title" inline={true}>
									Some value here
								</DiscordEmbedField>
							</DiscordEmbedFields>
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
				<h3 className="title">Inline fields with a thumbnail</h3>
				<DiscordMessages>
					<DiscordMessage>
						<DiscordEmbed slot="embeds" thumbnail="https://i.imgur.com/wSTFkRM.png">
							<DiscordEmbedFields slot="fields">
								<DiscordEmbedField fieldTitle="Inline field title" inline={true}>
									Some value here
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Inline field title" inline={true}>
									Some value here
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Inline field title" inline={true}>
									Some value here
								</DiscordEmbedField>
							</DiscordEmbedFields>
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
			</DiscordOptionsContext.Provider>
		</main>
	</div>
);
