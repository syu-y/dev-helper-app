export const StringUtils = {
	// 文字列結合
	concatText: (strList: string[], isNl: boolean) => {
		let result = '';
		for (const str of strList) {
			result += isNl ? str + '\n' : str;
		}
		return result;
	},

	// 指定位置の文字列置き換え
	strReplaceByIndex: (value: string, start: number, end: number, replaceStr: string): string => {
		const before = value.slice(0, start);
		const after = value.slice(end + 1);
		const result = before + replaceStr + after;
		return result;
	},
	// 大文字判定
	isUpperCase: (str: string) => {
		return str === str.toUpperCase() ? true : false;
	},
	// 小文字判定
	isLowerCase: (str: string) => {
		return str === str.toLowerCase() ? true : false;
	},

	// 文字数カウント（表示されている文字数
	getDisplayCharacterLength: (str: string) => {
		const segmenter = new Intl.Segmenter('ja-JP', { granularity: 'grapheme' });
		return [...segmenter.segment(str)].length;
	},

	// 文字数カウント（異体字は2文字でカウント）
	getCharacterLength: (str: string) => {
		return [...str].length;
	},

	// バイト数カウント
	getBytes: (str: string) => {
		return new Blob([str]).size;
	},

	// 文字カウント
	getSpecificharacterCount: (text: string, targetStr: string) => {
		return (text.match(new RegExp(targetStr, 'g')) || []).length;
	}
};
