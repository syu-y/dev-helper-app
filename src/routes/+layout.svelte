<script lang="ts">
  import "@/app.css";
  import Header from '@/components/Header.svelte';
  import Main from '@/components/Main.svelte';
</script>

<div class="flex flex-col h-screen text-white font-mplus1p">
  <div class="sticky top-0 z-50 bg-zinc-800">
    <Header />
  </div>

  <div class="flex-grow p-3 font-semibold bg-gray-950">
    <Main>
      <slot />
    </Main>
  </div>
</div>
