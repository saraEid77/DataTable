
<template>
  <div class="w-64 h-full shadow-md bg-white fixed top-0 bottom-0">
    <div class="flex items-center pl-5 border-b border-gray-200 py-8">
      <logo class="" />
      <div class="">
        <p class="text-lg font-semibold text-blue-900 -mx-2">
          <span class="font-bold">X</span>
          Trade
        </p>
      </div>
    </div>
    <div class="flex py-5 px-3">
      <span class="bg-gray-100 w-10 h-10 text-center leading-10 rounded-full mr-2">SR</span>      
      <span >
        <p class="text-sm text-gray-300">Adminstrator</p>
        <span class="font-bold">Sara Eid </span>
      </span>
    </div>
    <ul class="relative px-1">
      <li>
        <NuxtLink
          to="/"
          class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-900 hover:bg-blue-50 transition duration-300 ease-in-out"
        >
          <font-awesome-icon :icon="['fa', 'globe']" class="mr-3" />

          <span>Home</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/users"
          class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-900 hover:bg-blue-50 transition duration-300 ease-in-out"
        >
          <font-awesome-icon :icon="['fa', 'users']" class="mr-3" />
          <span>Users</span>
        </NuxtLink>
      </li>
    </ul>

    <div class=" bottom-0 absolute w-full ">
      <hr class="m-0" />
      <p class="px-6 py-5 text-base text-gray-700">
        <font-awesome-icon
          :icon="['fa', 'arrow-right-from-bracket']"
          class="mr-2"
        />
        <!-- <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /> -->
        Logout
      </p>
    </div>
  </div>
</template>
<style scoped>
a.nuxt-link-exact-active {
  @apply text-blue-900 bg-gray-100
}
</style>
