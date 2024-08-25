<template>
  <div>selemat datang, {{ (user.data.value as any).name }}</div>
  <UButton @click="logout" label="Logout" />
</template>

<script lang="ts" setup>
const auth = await useFetch("/api/login/refresh", { method: "POST" });

watchEffect(() => {
  console.log(auth.data, auth.error);
  if (auth.error.value) {
    navigateTo("/login");
  }
});

const user = useLazyFetch("/api/login/auth", {
  headers: { Authorization: `Bearer ${auth.data.value!}` },
});
console.log(user.data.value, user.error.value);

const logout = async () => {
  await $fetch("/api/login/logout", { method: "POST" });
  auth.refresh();
};
</script>
