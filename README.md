# React Discord Message

React components to easily build and display fake Discord messages on your webpages.

If you use Vue in your project, you should use [vue-discord-message](https://vue-discord-message.netlify.com/).
If you want to use web components instead, use [wc-discord-message](https://github.com/Danktuary/wc-discord-message)!

```sh
yarn add @danktuary/react-discord-message
# or npm install @danktuary/react-discord-messgae
# browser build also available: https://unpkg.com/@danktuary/react-discord-message
```

![react-discord-message preview](https://i.imgur.com/XX0JUdt.png)

```jsx
import React from 'react';
import {
	DiscordMessages,
	DiscordMessage,
	DiscordMention,
	DiscordEmbed,
	DiscordEmbedFields,
	DiscordEmbedField,
} from 'react-discord-message';

export default () => (
	<DiscordMessages>
		<DiscordMessage>
			Hey guys, I'm new here! Glad to be able to join you all!
		</DiscordMessage>
		<DiscordMessage author="Dawn" avatar="red">
			Hi, I'm new here too!
		</DiscordMessage>
		<DiscordMessage author="Sanctuary" avatar="https://i.imgur.com/0TeacfY.png" roleColor="#0099ff">
			Hey, <DiscordMention>User</DiscordMention> and <DiscordMention>Dawn</DiscordMention>. Welcome to our server!
		</DiscordMessage>
		<DiscordMessage author="Twelve" avatar="https://i.imgur.com/Mc0F0Hf.png" roleColor="#15b153">
			Hello everyone! How's it going?
		</DiscordMessage>
		<DiscordMessage author="User">
			Thank you <DiscordMention highlight={true}>Sanctuary</DiscordMention>!
		</DiscordMessage>
		<DiscordMessage author="Yotsuba" avatar="https://i.imgur.com/amw0MGJ.png">
			I'm doing well, <DiscordMention>Twelve</DiscordMention>. What about yourself?
		</DiscordMessage>
		<DiscordMessage author="Twelve" avatar="https://i.imgur.com/Mc0F0Hf.png" roleColor="#15b153">
			!8ball How am I doing today?
		</DiscordMessage>
		<DiscordMessage bot={true} author="Rinon" avatar="https://i.imgur.com/axQ9wJl.png" roleColor="violet">
			Yes.
		</DiscordMessage>
	</DiscordMessages>
);
```

## Features

* Design modeled after [Discord](https://discord.com/) itself
* Comfy and compact mode support
* Dark and light themes support
* Set the message author's username, avatar (use defaults or provide your own), role color, and "bot" tag status
* Display fake user, role, and channel mentions
* Complete embed support
* Simple syntax!
