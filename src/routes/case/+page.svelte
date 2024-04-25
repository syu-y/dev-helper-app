<script lang="ts">
	import Link from '@/components/Link.svelte';
	import PageSubTitle from '@/components/PageSubTitle.svelte';
	import PageTitle from '@/components/PageTitle.svelte';
	import TextInput from '@/components/form/TextInput.svelte';
	import Label from '@components/form/Label.svelte';
	import { strToCamelCase, strToSnakeCase } from '@utils/caseConvert';

	let inCamelCase: string = '';
	let outCamelCase: string = '';

	const toCamelCase = (event: { currentTarget: HTMLInputElement }) => {
		outCamelCase = strToCamelCase(event.currentTarget.value);
	};

	let inSnakeCase: string = '';
	let outSnakeCase: string = '';
	const toSnakeCase = (event: { currentTarget: HTMLInputElement }) => {
		outSnakeCase = strToSnakeCase(event.currentTarget.value);
	};

	// TODO: ケバブケース
	// TODO: パスカルケースへの変換
	// TODO: CSVファイルでまとめて変換
</script>

<PageTitle>Case Convert</PageTitle>
<div class="py-1">
	<PageSubTitle>Convert Target</PageSubTitle>
	<ul class="px-3 list-disc list-inside text-xm">
		<li>camelCase</li>
		<li>PascalCase</li>
		<li>snake_case</li>
		<li>kebab-case</li>
	</ul>
</div>

<div class="py-1">
	<h2>Convert Tool</h2>
	<div class="p-2">
		<h3>Convert to Camel Case</h3>
		<div class="px-5">
			<p>
				<Label labeltext="From(PascalCase/snake-case/kebab-case)" name="inCamelCase" />
			</p>
			<p class="px-5 py-1">
				<TextInput
					type="text"
					id="inCamelCase"
					name="inCamelCase"
					change={toCamelCase}
					width="w-56"
					bind:value={inCamelCase}
				/>
			</p>

			<p>
				<Label labeltext="To(CamelCase)" name="outCamelCase" />
			</p>
			<p class="px-5 py-1">
				<TextInput
					type="text"
					id="outCamelCase"
					name="outCamelCase"
					readonly={true}
					width="w-56"
					bind:value={outCamelCase}
				/>
			</p>
		</div>
	</div>

	<div class="p-2">
		<h3>Convert to Snake Case</h3>
		<div class="px-5">
			<p>
				<Label labeltext="From(PascalCase/camelCase/kebab-case)" name="inSnakeCase"></Label>
			</p>
			<p class="px-5 py-1">
				<TextInput
					type="text"
					id="inSnakeCase"
					name="inSnakeCase"
					change={toSnakeCase}
					width="w-56"
					bind:value={inSnakeCase}
				/>
			</p>

			<p>
				<Label labeltext="To(SnakeCase)" name="outSnakeCase" />
			</p>
			<p class="px-5 py-1">
				<TextInput
					type="text"
					id="outSnakeCase"
					name="outSnakeCase"
					readonly={true}
					width="w-56"
					bind:value={outSnakeCase}
				/>
			</p>
		</div>
	</div>
</div>

<div></div>

<div class="py-1">
	<h2>Reference</h2>
	<ul class="px-3 list-disc list-inside text-xm">
		<li>
			<Link
				url="https://typescript-jp.gitbook.io/deep-dive/styleguide"
				label="TypeScriptスタイルガイド"
			/>
		</li>
	</ul>
</div>

<style></style>
