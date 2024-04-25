<script lang="ts">
	import CheckBox from '@/components/form/CheckBox.svelte';
	import Label from '@/components/form/Label.svelte';
	import NormalButton from '@/components/form/NormalButton.svelte';
	import TextInput from '@/components/form/TextInput.svelte';
	import PageSubTitle from '@/components/PageSubTitle.svelte';
	import PageTitle from '@/components/PageTitle.svelte';
	import { NumberUtils } from '@/utils/numberUtils';
	import { allTileList, type Tile } from './mahjong';

	// 山
	let tilesWall = [...allTileList];
	// 捨牌（自分）
	let discardList: Tile[] = [];
	// 捨牌（他家）
	let discardLeftList: Tile[] = [];
	let discardRightList: Tile[] = [];
	let discardOppositeList: Tile[] = [];
	// 選択牌
	let selectedIdx: number | null = null;
	let remainingNums = tilesWall.length;
	let autoRitualFlg = false;

	// 自摸
	const drawing = (): Tile => {
		const select = NumberUtils.getRandomInt(0, tilesWall.length);
		const tile = tilesWall[select];
		tilesWall = tilesWall.filter((item, index) => index !== select);
		if (tile) {
			remainingNums = remainingNums - 1;
			return tile;
		} else {
			// 失敗した場合は引き直し
			return drawing();
		}
	};

	// 配牌
	const arrangementTile = (): Tile[] => {
		const tmpList = [];
		for (let i = 0; i < 14; i++) {
			// 山から牌を自模る
			const tile = drawing();
			if (tile) {
				tmpList.push(tile);
			} else {
				throw new Error('配牌エラー：自摸に失敗しました。：' + tile);
			}
		}
		// 他家分の配牌
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 13; j++) {
				drawing();
			}
		}

		// 王牌の除去
		for (let i = 0; i < 13; i++) {
			drawing();
		}
		return tmpList;
	};

	// 理牌
	const ritualTile = () => {
		handList = handList.sort((a, b) => a.index - b.index);
	};

	// ハンドラ
	const select = (event: { currentTarget: HTMLButtonElement }) => {
		selectedIdx = Number.parseInt(event.currentTarget.value);
	};
	const ritual = (event: { currentTarget: HTMLInputElement }) => {
		ritualTile();
	};
	const discard = (event: { currentTarget: HTMLInputElement }) => {
		if (selectedIdx !== null) {
			if (remainingNums === 0) {
				if (handList.length === 14) {
					// 捨牌に追加
					discardList.push(handList[selectedIdx]);
					discardList = [...discardList];

					// 手配から指定の牌を削除して更新
					handList = handList.filter((item, index) => index !== selectedIdx);
					if (autoRitualFlg) {
						ritualTile();
					}
				} else {
					alert('これ以上牌を切れません。');
				}
			} else {
				// 捨牌に追加
				discardList.push(handList[selectedIdx]);

				// 配列を更新しないと再描画されないためコピー
				discardList = [...discardList];

				// 手配から指定の牌を削除して更新
				handList = handList.filter((item, index) => index !== selectedIdx);

				// 他家分の自摸（全て自摸切り前提）
				const right = drawing();
				discardRightList.push(right);
				discardRightList = [...discardRightList];
				const opposite = drawing();
				discardOppositeList.push(opposite);
				discardOppositeList = [...discardOppositeList];
				const left = drawing();
				discardLeftList.push(left);
				discardLeftList = [...discardLeftList];

				// 山から牌を自模る
				const tile = drawing();
				handList.push(tile);
				newHand = tile;

				// 選択牌を更新（自摸牌）
				selectedIdx = 13;

				if (autoRitualFlg) {
					ritualTile();
				}
			}
		}
	};
	const reset = (event: { currentTarget: HTMLInputElement }) => {
		tilesWall = [...allTileList];
		discardList = [];
		discardLeftList = [];
		discardRightList = [];
		discardOppositeList = [];
		selectedIdx = null;
		remainingNums = tilesWall.length;
		handList = arrangementTile();
		dora = drawing();
		ritualTile();
	};

	let handList: Tile[] = arrangementTile();
	let newHand: Tile = handList[13];
	let dora = drawing();
</script>

<PageTitle>麻雀</PageTitle>
<div class="py-1">
	<PageSubTitle>テンパイ練習ツール</PageSubTitle>
	<div class="h-32 px-5 py-1">
		<p class="py-2">ドラ表示牌</p>
		<p class="py-2 text-5xl">{dora.tile}</p>
	</div>

	<div class="px-5 py-1">
		<p class="py-2">河</p>
	</div>
	<div class="flex items-center w-full h-full px-2">
		<div class="border-2 border-solid h-72 w-80">
			<p class="py-2">上家</p>
			<p class="py-2">
				{#each discardLeftList as item, index}
					<button class="py-1 text-5xl" value={index} disabled>{item.tile}</button>
				{/each}
			</p>
		</div>
		<div class="border-2 border-solid h-72 w-80">
			<p class="py-2 bg-orange-800">自家</p>
			<p class="py-2">
				{#each discardList as item, index}
					<button class="py-1 text-5xl" value={index} disabled>{item.tile}</button>
				{/each}
			</p>
		</div>
		<div class="border-2 border-solid h-72 w-80">
			<p class="py-2">下家</p>
			<p class="py-2">
				{#each discardRightList as item, index}
					<button class="py-1 text-5xl" value={index} disabled>{item.tile}</button>
				{/each}
			</p>
		</div>
		<div class="border-2 border-solid h-72 w-80">
			<p class="py-2">対面</p>
			<p class="py-2">
				{#each discardOppositeList as item, index}
					<button class="py-1 text-5xl" value={index} disabled>{item.tile}</button>
				{/each}
			</p>
		</div>
	</div>

	<div class="h-24 px-5 py-1">
		<p class="py-2">残り枚数</p>
		<TextInput
			id="remainingNums"
			name="remainingNums"
			readonly={true}
			bind:value={remainingNums}
			width="w-16"
		/>
	</div>
	<div class="h-32 px-5 py-1">
		<p class="py-2">手配</p>
		<p class="py-2">
			{#each handList as item, index}
				{#if index === selectedIdx}
					<button class="text-5xl brightness-50" on:click={select} value={index} disabled
						>{item.tile}</button
					>
				{:else if item.index === newHand.index}
					<button class="text-5xl bg-yellow-300" on:click={select} value={index}>{item.tile}</button
					>
				{:else}
					<button class="text-5xl" on:click={select} value={index}>{item.tile}</button>
				{/if}
			{/each}
		</p>
	</div>

	<div class="px-5 py-2">
		<NormalButton id="ritual" name="ritual" dispName="理牌" click={ritual} />
		<NormalButton
			id="discard"
			name="discard"
			disabled={remainingNums === 0 ? true : false}
			dispName="牌を切る"
			click={discard}
		/>
		<Label width="w-16" labeltext="自動理牌" name="autoRitualFlg" />
		<CheckBox id="autoRitualFlg" name="autoRitualFlg" bind:value={autoRitualFlg} />
	</div>
	<div class="px-5 py-2">
		<NormalButton id="reset" name="reset" dispName="リセット" click={reset} />
	</div>
</div>

<div class="py-1">
	<PageSubTitle>説明</PageSubTitle>
	<div class="px-5 py-1">
		<ul class="list-disc list-outside text-xm">
			<li class="py-1">
				遊び方
				<ul class="list-decimal list-inside text-xm">
					<li class="py-1">牌をクリックして選択します.</li>
					<li class="py-1">牌を切るボタンを押すと選択した牌を切ります.</li>
					<li class="py-1">牌を切ると他家も牌を切り手番が回ってきます.</li>
					<li class="py-1">2~3を繰り返すします.</li>
					<li class="py-1">最後の牌を切ると終了します.</li>
				</ul>
			</li>
			<li class="py-1">
				その他
				<ul class="list-disc list-inside text-xm">
					<li class="py-1">自摸牌は黄色でマークされます.</li>
					<li class="py-1">理牌ボタンを押すと牌の並びが整理されます.</li>
					<li class="py-1">リセットボタンを押すと手配・河・ドラ表示牌全てがリセットされます.</li>
					<li class="py-1">牌はUnicodeで表示されます.</li>
					<li class="py-1"><span class="text-3xl align-baseline">🀆</span>は白牌です.</li>
					<li class="py-1">他家は全て自摸切りの前提です.</li>
				</ul>
			</li>
		</ul>
	</div>
</div>

<style></style>
