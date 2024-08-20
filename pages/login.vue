<template>
  <div class="flex min-h-screen items-center justify-center bg-zinc-950">
    <div class="flex flex-col items-center gap-3">
      <h1 class="mb-1 text-xl">Login</h1>
      <UFormGroup label="Email">
        <UInput :ui="{ color: '' }" type="email" />
      </UFormGroup>
      <UFormGroup label="Password">
        <UInput :ui="{ color: '' }" type="password" />
      </UFormGroup>
      <UButton color="sky" class="mt-1">Submit</UButton>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
