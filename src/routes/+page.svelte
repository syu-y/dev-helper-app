<script lang="ts">
	import Link from '@/components/Link.svelte';
	import PageSubTitle from '@/components/PageSubTitle.svelte';
	import PageTitle from '@/components/PageTitle.svelte';
</script>

<PageTitle>Home</PageTitle>
<div class="py-1">
	<PageSubTitle>Tools</PageSubTitle>
	<ul class="px-3 list-disc list-inside text-xm">
		<li><Link url="/case" label="Case Convert Tools" /></li>
		<li><Link url="/count" label="Count Tools" /></li>
		<li><Link url="/naming" label="Naming Tools" /></li>
		<li><Link url="/mahjong" label="テンパイ練習ツール" /></li>
		<li><Link url="/buckshot" label="Buckshot Rouletteサポートツール" /></li>
	</ul>
</div>

<div class="py-1">
	<PageSubTitle>Tips</PageSubTitle>
	<ul class="px-3 list-disc list-inside text-xm">
		<li><a href="/case">Case Convert Tools</a></li>
		<li><a href="/count">Count Tools</a></li>
	</ul>
</div>

<style></style>
