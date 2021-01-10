const defaultAvatars = {
	blue: 'https://cdn.discordapp.com/attachments/654503812593090602/665721745466195978/blue.png',
	gray: 'https://cdn.discordapp.com/attachments/654503812593090602/665721746569166849/gray.png',
	green: 'https://cdn.discordapp.com/attachments/654503812593090602/665721748431306753/green.png',
	orange: 'https://cdn.discordapp.com/attachments/654503812593090602/665721750201434138/orange.png',
	red: 'https://cdn.discordapp.com/attachments/654503812593090602/665721752277483540/red.png',
}

defaultAvatars.default = defaultAvatars.blue

export default {
	avatars: defaultAvatars,
	defaultMode: 'comfy',
	defaultTheme: 'dark',
	disableFont: true,
	profiles: {},
}
