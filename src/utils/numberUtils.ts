export const NumberUtils = {
	// 乱数生成（min以上max未満）
	getRandomInt: (min: number, max: number) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	},
	// 乱数生成（min以上max以下）
	getRandomIntInclusive: (min: number, max: number) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
};
