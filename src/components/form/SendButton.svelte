<script lang="ts">
	export let id = '';
	export let name = '';
	export let dispName = '';
	export let disabled: boolean | null = null;
	export let click = (event: { currentTarget: HTMLInputElement }) => {};
	const props = {
		id,
		name,
		dispName,
		disabled,
		click
	};
</script>

<input
	class="px-4 py-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
	type="submit"
	{...props}
	value={dispName}
	on:click={click}
/>
