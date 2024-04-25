<script lang="ts">
  export let value: string;
  export let list = [''];
  export let id = '';
  export let name = '';
  export let disabled: boolean | null = null;
  export let change = (event: { currentTarget: HTMLSelectElement }) => {};
  const props = {
    id,
    name,
    disabled,
    change,
  };
</script>

<select class="px-1 text-black" {...props} bind:value on:change={change}>
  {#each list as item, key}
    <option value={item}>
      {item}
    </option>
  {/each}
</select>
