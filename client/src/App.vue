<template>
  <Suspense>
    <template #fallback>Loading...</template>
    <template #default>
      <div class="h-screen w-full dark:bg-gray-900">
        <div class="sm:w-4/5 md:w-3/4 lg:w-3/5 h-full mx-auto">
          <header
            class="flex flex-col justify-center items-center py-4 border-b border-black dark:border-white relative z-10"
          >
            <h1 class="text-2xl dark:text-white">
              Utilisation des environnements de test
            </h1>
          </header>

          <main class="w-full h-4/5 flex items-center justify-center">
            <div
              class="w-4/5 h-3/4 shadow shadow-white rounded p-4 bg-white relative"
            >
              <router-view />
            </div>
          </main>
        </div>
      </div>
    </template>
  </Suspense>
</template>
