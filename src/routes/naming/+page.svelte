<script lang="ts">
	import PageSubTitle from '@/components/PageSubTitle.svelte';
	import PageTitle from '@/components/PageTitle.svelte';
	import CheckBox from '@/components/form/CheckBox.svelte';
	import Label from '@/components/form/Label.svelte';
	import Select from '@/components/form/Select.svelte';
	import SendButton from '@/components/form/SendButton.svelte';
	import TextArea from '@/components/form/TextArea.svelte';
	import TextInput from '@/components/form/TextInput.svelte';
	import { StringUtils } from '@/utils/stringUtils';

	let output = '';
	let target = 'Variable';
	let lang = 'TypeScript';
	let caseType = 'camelCase';
	let data = '';
	let process = '';
	let commonFlg = false;
	let lengthLimit = 20;
	let candidatesNums = 5;
	const targetList = ['Variable', 'Class', 'Method'];
	const langList = ['TypeScript', 'JavaScript', 'Java', 'Python'];
	const caseTypeList = ['PascalCase', 'camelCase', 'snake-case', 'kebab-case'];

	let inputOrderText = '';
	const createOrderText = async (event: {
		currentTarget: HTMLInputElement | HTMLSelectElement;
	}) => {
		const orderTop = `${target} used in ${lang} that meet the following conditions Think of a name.`;
		const condCaseType = `・Use the ${caseType}.`;
		const condData =
			data === ''
				? ''
				: process === ''
					? `・This data has the meaning of ${await translate(data)}.`
					: `・Process ${await translate(data)} data.`;
		const condProcess =
			process === '' ? '' : `・The content of the process is ${await translate(process)}.`;
		const condLength = lengthLimit <= 0 ? '' : `・Within ${lengthLimit} characters.`;
		const condCandidates =
			candidatesNums <= 0 ? '' : `・Please suggest ${candidatesNums} candidates.`;
		const condCommon = commonFlg ? '・Please use "common" as a prefix to make it common.' : '';

		const orderList = [
			orderTop,
			condCaseType,
			condData,
			condProcess,
			condCommon,
			condLength,
			condCandidates
		];
		inputOrderText = StringUtils.concatText(orderList, true);
	};

	const orderExecution = async (event: { currentTarget: HTMLInputElement }) => {
		// 送信前にChatGPTへの入力情報を必ず作成
		createOrderText(event);
		output = await question(inputOrderText);
	};

	// 翻訳API呼出
	async function translate(text: string): Promise<string> {
		const response = await fetch('/api/translate', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ orderText: text })
		});
		const { result } = await response.json();
		return result;
	}

	// ChatGPTAPI呼出
	async function question(text: string) {
		const response = await fetch('/api/chatGPT', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ orderText: text })
		});
		const { result } = await response.json();
		return result;
	}
</script>

<PageTitle>Naming</PageTitle>
<div class="py-1">
	<PageSubTitle>Tools</PageSubTitle>
	<div class="px-5 py-1">
		<p>Name suggestions will be suggested based on the information you enter.</p>
	</div>
	<div class="px-5 py-1">
		<p class="py-1">
			<Label width="w-32" labeltext="target" name="target" />
			<Select
				id="target"
				name="target"
				list={targetList}
				bind:value={target}
				change={createOrderText}
			/>
		</p>
		<p class="py-1">
			<Label width="w-32" labeltext="Language" name="language" />
			<Select
				id="language"
				name="language"
				list={langList}
				bind:value={lang}
				change={createOrderText}
			/>
		</p>
		<p class="py-1">
			<Label width="w-32" labeltext="CaseType" name="caseType" />
			<Select
				id="caseType"
				name="caseType"
				list={caseTypeList}
				bind:value={caseType}
				change={createOrderText}
			/>
		</p>
		<p class="py-1">
			<Label width="w-32" labeltext="Data" name="data" />
			<TextInput id="data" name="data" bind:value={data} change={createOrderText} width="w-48" />
		</p>
		<p class="py-1">
			<Label width="w-32" labeltext="Process" name="process" />
			<TextInput
				id="process"
				name="process"
				bind:value={process}
				change={createOrderText}
				width="w-48"
			/>
		</p>
		<p class="py-1">
			<Label width="w-32" labeltext="Length Limit" name="lengthLimit" />
			<TextInput
				id="lengthLimit"
				name="lengthLimit"
				type="number"
				min={1}
				max={30}
				bind:value={lengthLimit}
				change={createOrderText}
			/>
		</p>
		<p class="py-1">
			<Label width="w-32" labeltext="Commonalize" name="common" />
			<CheckBox id="common" name="common" bind:value={commonFlg} change={createOrderText} />
		</p>
		<p class="py-10">
			<Label width="w-56" labeltext="Number of candidates" name="candidates" />
			<TextInput
				id="candidates"
				name="candidates"
				type="number"
				min={1}
				max={10}
				bind:value={candidatesNums}
				change={createOrderText}
			/>
			<SendButton id="submit" name="submit" dispName="Submit" click={orderExecution} />
		</p>
	</div>

	<div class="px-5 py-1">
		<p>
			<Label width="w-16" labeltext="Candidates" name="output" />
			<TextArea
				id="output"
				name="output"
				readonly={true}
				bind:value={output}
				resize={false}
				width="w-full"
				height="h-64"
			/>
		</p>
	</div>

	<div class="py-1">
		<PageSubTitle>How to use</PageSubTitle>
		<div class="px-5 py-1">
			<ul class="list-disc list-outside text-xm">
				<li class="py-1">Target : Subject to naming.</li>
				<li class="py-1">Language : Programming language.</li>
				<li class="py-1">CaseType : Format to use for names.</li>
				<li class="py-1">Data : Type of data to be stored or data to be processed.</li>
				<li class="py-1">Process : Type of processing (e.g. aggregate, create, delete).</li>
				<li class="py-1">Length Limit : Maximum name length.</li>
				<li class="py-1">Commonalize : Use "Common" as a prefix.</li>
			</ul>
		</div>
	</div>
</div>

<style></style>
