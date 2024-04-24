<script lang="ts">
	export let value: string | number = '';
	export let type = 'text';
	export let id = '';
	export let name = '';
	export let readonly: boolean | null = null;
	export let disabled: boolean | null = null;
	export let placeholder = '';
	export let min: number | null = null;
	export let max: number | null = null;
	export let change = (event: { currentTarget: HTMLInputElement }) => {};
	export let width = 'w-32';
	const props = {
		type,
		id,
		name,
		placeholder,
		readonly,
		disabled,
		min,
		max,
		change,
		width
	};
</script>

<input class="w-32 text-black {width}" {...props} bind:value on:change={change} />
