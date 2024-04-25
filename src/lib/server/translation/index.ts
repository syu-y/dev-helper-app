import * as deepl from 'deepl-node';
import { DEEPL_AUTH_KEY } from '$env/static/private';

export const translate = async (text: string) => {
	const apiKey = DEEPL_AUTH_KEY;
	const translator = new deepl.Translator(apiKey!);
	const targetLang: deepl.TargetLanguageCode = 'en-US';
	const results = await translator.translateText(text, null, targetLang);
	return results.text;
};
