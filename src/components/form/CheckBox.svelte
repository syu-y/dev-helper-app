<script lang="ts">
  export let value: boolean = false;
  export let id = '';
  export let name = '';
  export let disabled: boolean | null = null;
  export let change = (event: { currentTarget: HTMLInputElement }) => {};
  const props = {
    id,
    name,
    disabled,
    change,
  };
</script>

<input type="checkbox" {...props} bind:checked={value} on:change={change} />
