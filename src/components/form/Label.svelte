<script lang="ts">
	export let labeltext = '';
	export let name = '';
	export let width = '';
</script>

<label class="inline-block align-baseline {width}" for={name}>
	<span>{labeltext}</span>
</label>
