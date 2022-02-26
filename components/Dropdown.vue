<template>
  <div>
    <button
      class="flex justify-between  w-full bg-white text-blue-900 border border-gray-300 p-2 rounded-lg cursor-pointer relative"
      @click="showDropdown"  >
      Column Visibilty
       <font-awesome-icon :icon="['fa', 'angle-down']" class="text-xs mx-2 mt-1" />
    </button>
    <transition name="slide">
      <div class="absolute bg-gray-100 py-2 px-4 my-1 z-50 rounded-lg w-auto" v-if="show">
        <ul>
          <li
            class="my-2 text-gray-600"
            v-for="(column, index) in columns"
            :key="index"
          >
            <div >
              <div class="flex items-center mr-4 mb-2 ">
                <input
                  type="checkbox"
                  :name="column"
                  :id="index"
                  :value="column"
                  v-model="selected"
                  class="opacity-0 absolute h-3 w-3 cursor-pointer"
                />
                <div
                  class="cursor-pointer bg-white border-2 rounded-md border-blue-600 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-600"
                >
                   <font-awesome-icon :icon="['fa', 'check']" 
                     :class="selected.includes(column) ? 'text-white' : ' text-blue-500' "
                    />
                   <!-- class="fill-current hidden w-3 h-3 text-blue-900 pointer-events-none" -->
                 
                </div>

                <label class="cursor-pointer" :for="index">{{ column }}</label>
              </div>
            </div>
          
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      show: false,
      selected: [],
      toggleActive: false,
    };
  },
  methods: {
    ...mapMutations({
      selectedFilters: "basicTable/selectedFilters",
    }),
    showDropdown() {
      this.show = !this.show;
    },
  },
  watch: {
    selected(val) {
      this.selectedFilters(val);
    },
  },
  computed: {
    ...mapState({
      columns: (state) => state.basicTable.columns,
      selectedArray: (state) => state.basicTable.selectedArray,
    }),
  },
  mounted() {
    const saved = JSON.parse(localStorage.getItem("selectedArray"));
    if (saved) {
      this.selected = saved;
    }
  },
};
</script>
<style scoped>
.slide-enter-active {
  transition: 0.5s;
}
.slide-enter {
  transform: translate(0, 15%);
}

input:checked + div {
  @apply border-blue-600;
}
input:checked + div svg {
  @apply block;
}
</style>
