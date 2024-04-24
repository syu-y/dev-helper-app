<script lang="ts">
	export let value = '';
	export let id = '';
	export let name = '';
	export let readonly: boolean | null = null;
	export let disabled: boolean | null = null;
	export let placeholder = '';
	export let width = 'w-64';
	export let height = 'h-1';
	export let resize = true;
	export let input = (event: { currentTarget: HTMLTextAreaElement }) => {};
	const props = {
		id,
		name,
		placeholder,
		readonly,
		disabled,
		input
	};
</script>

<textarea
	class="text-black p-3 rounded-lg focus:ring-0 focus:border-blue-500 {resize
		? ''
		: 'resize-none'} {width} {height}"
	{...props}
	bind:value
	on:input={input}
/>
