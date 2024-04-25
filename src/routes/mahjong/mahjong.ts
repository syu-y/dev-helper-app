import { allTilesList } from './const';

export type Tile = { index: number; tile: string };

export const convertList = (strList: string[]): Tile[] => {
	const list: Tile[] = [];
	strList.forEach((str, index) => {
		const tile: Tile = { index: index, tile: str };
		list.push(tile);
	});
	return list;
};

export const allTileList = convertList(allTilesList);
