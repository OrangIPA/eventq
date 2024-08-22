<template>
  <div class="flex min-h-screen items-center justify-center bg-zinc-950">
    <div class="flex flex-col items-center gap-2">
      <h1 class="mb-1 text-xl font-bold">Login</h1>
      <UForm :state @submit="submit" class="flex flex-col items-center gap-3">
        <UFormGroup label="Email">
          <UInput :ui="{ color: '' }" type="email" v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Password">
          <UInput
            :ui="{ color: '' }"
            type="password"
            v-model="state.password"
          />
        </UFormGroup>
        <UButton color="sky" class="mt-1" type="submit">Submit</UButton>
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
const state = ref({ email: "", password: "" });

async function submit() {
  const res = await $fetch('/api/login', {method: 'POST', body: JSON.stringify(state.value)})
  console.log(res)
};
</script>
