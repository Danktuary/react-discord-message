import React from 'react';

const avatars = {
	blue: 'https://cdn.discordapp.com/attachments/654503812593090602/665721745466195978/blue.png',
	gray: 'https://cdn.discordapp.com/attachments/654503812593090602/665721746569166849/gray.png',
	green: 'https://cdn.discordapp.com/attachments/654503812593090602/665721748431306753/green.png',
	orange: 'https://cdn.discordapp.com/attachments/654503812593090602/665721750201434138/orange.png',
	red: 'https://cdn.discordapp.com/attachments/654503812593090602/665721752277483540/red.png',
};

avatars.default = avatars.blue;

export const config = { avatars, profiles: {} };

export const dateFilters = {
	formatDate(value) {
		if (!(value instanceof Date)) return value;
		return `${value.getMonth() + 1}/${value.getDate()}/${value.getFullYear()}`;
	},
	padZeroes(value) {
		const [month, day, year] = value.split('/');
		return `${month.padStart(2, 0)}/${day.padStart(2, 0)}/${year}`;
	},
};

export const findSlot = (elements, name) => {
	return React.Children.toArray(elements).find(({ props = {} }) => props.slot && props.slot === name);
};
