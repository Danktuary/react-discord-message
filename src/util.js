import { Children } from 'react';

const avatars = {
	blue: 'https://cdn.discordapp.com/attachments/654503812593090602/665721745466195978/blue.png',
	gray: 'https://cdn.discordapp.com/attachments/654503812593090602/665721746569166849/gray.png',
	green: 'https://cdn.discordapp.com/attachments/654503812593090602/665721748431306753/green.png',
	orange: 'https://cdn.discordapp.com/attachments/654503812593090602/665721750201434138/orange.png',
	red: 'https://cdn.discordapp.com/attachments/654503812593090602/665721752277483540/red.png',
};

avatars.default = avatars.blue;

export const config = { avatars, profiles: {} };

export const parseTimestamp = (timestamp = new Date()) => {
	if (!(timestamp instanceof Date)) timestamp = new Date(timestamp);
	const [month, day, year] = [timestamp.getMonth() + 1, timestamp.getDate(), timestamp.getFullYear()];
	return `${month.toString().padStart(2, 0)}/${day.toString().padStart(2, 0)}/${year}`;
};

export const findSlot = (elements, name) => {
	return Children.toArray(elements).find(({ props = {} }) => props.slot && props.slot === name);
};

export const elementsWithoutSlot = (elements, name) => {
	return Children.map(elements, element => {
		if (element.props && element.props.slot === name) return;
		return element;
	});
};
