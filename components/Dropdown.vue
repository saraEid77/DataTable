<template>
  <div>
    <button
      class="flex justify-between  w-full bg-white text-blue-900 border border-gray-300 p-2 rounded-lg cursor-pointer relative"
      @click="showDropdown">
      Column Visibilty
       <font-awesome-icon :icon="['fa', 'angle-down']" class="w-3 h-3 mx-2 mt-2" />
    </button>
    <transition name="slide">
      <div class="absolute bg-gray-100 py-2 px-4 my-1 z-50 rounded-lg w-52" v-if="show">
        <ul>
          <li
            class="my-2 text-gray-600"
            v-for="(column, index) in columns"
            :key="index"
          >
           
            <div >
              <div class="flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  :name="column"
                  :id="index"
                  :value="column"
                  v-model="selected"
                  class="opacity-0 absolute h-4 w-4"
                />
                <div
                  class="bg-white border-2 rounded-md border-blue-600 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-600"
                >
                  <svg
                    class="fill-current hidden w-3 h-3 text-blue-900 pointer-events-none"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="blue"
                        fill-rule="nonzero"
                      >
                        <path
                          d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>

                <label :for="index">{{ column }}</label>
              </div>
            </div>
            <!-- <div class="flex justify-between items-center mr-2" @click="toggleActive = !toggleActive">
                <div class="w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-blue-400': toggleActive}">
                  <div class="bg-white w-5 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-3': toggleActive}"></div>
                </div>
              </div> -->
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
  transition: 1s;
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
