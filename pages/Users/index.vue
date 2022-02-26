<template>
  <div class="pr-5">
    <div class="flex justify-between mt-4">
      <h1 class="text-2xl font-medium text-blue-900">Users</h1>
      <button class="bg-blue-900 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-800">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          class="mt-1"
        />
        Create New User
      </button>
    </div>
    <div>
      <ul class="flex font-medium  text-xs border-b border-gray-200 my-6  ">
        <li class="py-3 mr-3 cursor-pointer" @click="tab = 1" :class="tab ===1 ? 'border-b border-blue-700 text-blue-700':'text-gray-400'">All Users</li>
        <li class="py-3 mr-3  cursor-pointer" @click="tab = 2" :class="tab ===2 ? 'border-b border-blue-700 text-blue-700':'text-gray-400'">Users Data</li>
      </ul>
    </div>
    <Table v-if="tab === 1" />
    <div v-if="tab === 2" class="text-center"> 
         <img src='~/assets/images/empty_state.png' class="w-72 mx-auto "/>
         <h1 class="text-3xl font-bold text-gray-500"> oooooops , there is no thing here</h1>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tab: 1,
    };
  },
};
</script>
