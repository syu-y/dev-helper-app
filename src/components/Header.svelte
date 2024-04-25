<script lang="ts">
	import Link from './Link.svelte';
</script>

<header>
	<nav class="flex items-center justify-between w-full px-2 border-b">
		<span>
			<div class="py-1 text-2xl font-logo">
				<a class="font-extrabold align-baseline" href="/">My Tools</a>
			</div>
		</span>

		<div class="flex items-center justify-center gap-4">
			<Link url="/" label="Home" />
			<Link url="/case" label="Case" />
			<Link url="/count" label="Count" />
			<Link url="/naming" label="Naming" />
			<Link url="/mahjong" label="麻雀" />
		</div>
	</nav>
</header>
