const defaultAvatars = {
	blue: 'https://cdn.discordapp.com/embed/avatars/0.png',
	gray: 'https://cdn.discordapp.com/embed/avatars/1.png',
	green: 'https://cdn.discordapp.com/embed/avatars/2.png',
	orange: 'https://cdn.discordapp.com/embed/avatars/3.png',
	red: 'https://cdn.discordapp.com/embed/avatars/4.png',
}

defaultAvatars.default = defaultAvatars.blue

export default {
	avatars: defaultAvatars,
	defaultMode: 'comfy',
	defaultTheme: 'dark',
	disableFont: true,
	profiles: {},
}
