import React from 'react';
import { DiscordMessages, DiscordMessage, Mention } from 'react-discord-message';

export default () => (
	<DiscordMessages>
		<DiscordMessage>
			Hey guys, I'm new here! Glad to be able to join you all!
		</DiscordMessage>
		<DiscordMessage author="Dawn" avatar="red">
			Hi, I'm new here too!
		</DiscordMessage>
		<DiscordMessage author="Sanctuary" avatar="https://i.imgur.com/FPWMhCa.png" roleColor="#0099ff">
			Hey, <Mention>User</Mention> and <Mention>Dawn</Mention>. Welcome to our server!
		</DiscordMessage>
		<DiscordMessage author="Twelve" avatar="https://i.imgur.com/Mc0F0Hf.png" roleColor="#15b153">
			Hello everyone! How's it going?
		</DiscordMessage>
		<DiscordMessage author="User">
			Thank you, <Mention highlight={true}>Sanctuary</Mention>!
		</DiscordMessage>
		<DiscordMessage author="Yotsuba" avatar="https://i.imgur.com/amw0MGJ.png">
			I'm doing well, <Mention>Twelve</Mention>. What about yourself?
		</DiscordMessage>
		<DiscordMessage author="Twelve" avatar="https://i.imgur.com/Mc0F0Hf.png" roleColor="#15b153">
			!8ball How am I doing today?
		</DiscordMessage>
		<DiscordMessage bot={true} author="Rinon" avatar="https://i.imgur.com/axQ9wJl.png" roleColor="violet">
			Yes.
		</DiscordMessage>
	</DiscordMessages>
);
