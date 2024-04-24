<script lang="ts">
	import PageSubTitle from '@/components/PageSubTitle.svelte';
	import PageTitle from '@/components/PageTitle.svelte';
	import TextArea from '@/components/form/TextArea.svelte';
	import TextInput from '@/components/form/TextInput.svelte';
	import { StringUtils } from '@/utils/stringUtils';
	import Label from '@components/form/Label.svelte';

	let input: string = '';
	let length: string = '0';
	let lengthNoNl: string = '0';
	let lengthNoSpace: string = '0';
	let lengthNoSpaceNl: string = '0';
	let lineCount: string = '0';
	let bytes: string = '0';

	const count = (event: { currentTarget: HTMLTextAreaElement }) => {
		countLength(event);
		countLines(event);
		countBytets(event);
	};
	const countLength = (event: { currentTarget: HTMLTextAreaElement }) => {
		length = StringUtils.getDisplayCharacterLength(event.currentTarget.value).toString();

		lengthNoNl = StringUtils.getDisplayCharacterLength(
			event.currentTarget.value.replaceAll('\n', '')
		).toString();

		lengthNoSpace = StringUtils.getDisplayCharacterLength(
			event.currentTarget.value.replaceAll('\t', '').replaceAll(' ', '').replaceAll('　', '')
		).toString();

		lengthNoSpaceNl = StringUtils.getDisplayCharacterLength(
			event.currentTarget.value
				.replaceAll('\n', '')
				.replaceAll('\t', '')
				.replaceAll(' ', '')
				.replaceAll('　', '')
		).toString();
	};

	const countLines = (event: { currentTarget: HTMLTextAreaElement }) => {
		const countNl = StringUtils.getSpecificharacterCount(event.currentTarget.value, '\n');
		lineCount = (countNl + 1).toString();
	};

	const countBytets = (event: { currentTarget: HTMLTextAreaElement }) => {
		bytes = StringUtils.getBytes(event.currentTarget.value).toString();
	};
</script>

<PageTitle>Count various textsize</PageTitle>

<div class="py-1">
	<PageSubTitle>Count Tool</PageSubTitle>
	<div class="px-5 py-1">
		<p>
			Enter the text you want to check the number of characters into the text field below Or copy
			and paste.
		</p>
	</div>
	<div class="px-5 py-1">
		<p>
			<Label width="w-16" labeltext="Input" name="input" />
			<TextArea
				id="input"
				name="input"
				input={count}
				bind:value={input}
				resize={false}
				width="w-full"
				height="h-20"
			/>
		</p>
	</div>
	<div class="px-5 py-1">
		<p class="py-1">
			<Label width="w-60" labeltext="Word Count" name="length" />
			<TextInput id="length" name="length" readonly={true} bind:value={length} />
		</p>
		<p class="py-1">
			<Label width="w-60" labeltext="Word Count(No NL)" name="lengthNoNl" />
			<TextInput id="lengthNoNl" name="lengthNoNl" readonly={true} bind:value={lengthNoNl} />
		</p>
		<p class="py-1">
			<Label width="w-60" labeltext="Word Count(No Space)" name="lengthNoSpace" />
			<TextInput
				id="lengthNoSpace"
				name="lengthNoSpace"
				readonly={true}
				bind:value={lengthNoSpace}
			/>
		</p>
		<p class="py-1">
			<Label width="w-60" labeltext="Word Count(No Space/NL)" name="lengthNoSpaceNl" />
			<TextInput
				id="lengthNoSpaceNl"
				name="lengthNoSpaceNl"
				readonly={true}
				bind:value={lengthNoSpaceNl}
			/>
		</p>
		<p class="py-1">
			<Label width="w-60" labeltext="Line Count" name="lineCount" />
			<TextInput id="lineCount" name="lineCount" readonly={true} bind:value={lineCount} />
		</p>
		<p class="py-1">
			<Label width="w-60" labeltext="Bytes" name="bytes" />
			<TextInput id="bytes" name="bytes" readonly={true} bind:value={bytes} />
		</p>
	</div>

	<div class="py-1">
		<PageSubTitle>How to use</PageSubTitle>
		<div class="px-5 py-1">
			<ul class="list-disc list-outside text-xm">
				<li class="py-1">
					Word Count
					<ul class="text-sm list-disc list-inside">
						<li>
							The number of half-width and full-width characters counted as one character is
							displayed.
						</li>
						<li>
							The number of characters displayed is counted as one character for variant characters.
						</li>
						<li>A new line character counts as one character.</li>
					</ul>
				</li>
				<li class="py-1">
					Word Count(No NL)
					<ul class="text-sm list-disc list-inside">
						<li>
							Both half-width and full-width characters are counted as one character. Line feed
							characters are not counted.
						</li>
					</ul>
				</li>
				<li class="py-1">
					Word Count(No Space)
					<ul class="text-sm list-disc list-inside">
						<li>
							The number of characters excluding spaces (tabs, half-width and full-width spaces) is
							displayed.
						</li>
					</ul>
				</li>
				<li class="py-1">
					Word Count(No Space/NL)
					<ul class="text-sm list-disc list-inside">
						<li>
							The number of characters is displayed excluding line feeds and white space (tabs,
							half-width and full-width white space).
						</li>
					</ul>
				</li>
				<li class="py-1">
					LineCount
					<ul class="text-sm list-disc list-inside">
						<li>The number of lines is displayed.</li>
					</ul>
				</li>
				<li class="py-1">
					Bytes
					<ul class="text-sm list-disc list-inside">
						<li>
							The number of bytes (including newline characters) when converted to UTF-8 is
							displayed.
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</div>

<style></style>
