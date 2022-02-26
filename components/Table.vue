<template>
  <div>
    <div class="grid grid-cols-12 gap-4 bg-gray-100 rounded-lg mt-4 py-5 px-2">
      <div class="col-span-8 flex items-center justify-center">
        <div class="flex w-full rounded-lg px-4 py-2 bg-white text-gray-400">
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            class="mt-1 mr-3"
          />

          <input
            v-model="search"
            type="text"
            class="rounded-lg w-full focus:outline-none"
            placeholder="Search by name..."
          />
        </div>
      </div>
      <div class="col-span-2">
        <button
          class="flex justify-between w-full bg-white text-blue-900 border border-gray-300 p-2 rounded-lg cursor-pointer relative"
        >
          Filter
          <font-awesome-icon
            :icon="['fa', 'filter']"
            class="w-3 h-3 mx-2 mt-2"
          />
        </button>
      </div>
      <div class="col-span-2">
        <dropDown />
      </div>
    </div>
    <div class="my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="(column, index) in headers"
                  :key="index"
                  class="px-6 py-3 cursor-pointer text-left text-xs font-medium text-blue-800 uppercase tracking-wider"
                  @click="sortColumn(column, index)"
                >
                  <span class="flex">
                    <span class="mr-2">
                      {{ column }}
                    </span>

                    <font-awesome-icon
                      v-if="asc == true && activeIndex == index"
                      :icon="['fas', 'angles-up']"
                      class="mt-1"
                    />
                    <font-awesome-icon
                      v-else-if="asc == false && activeIndex == index"
                      :icon="['fas', 'angles-down']"
                      class="mt-1"
                    />
                    <font-awesome-icon
                      v-else
                      :icon="['fas', 'angles-up']"
                      class="mt-1"
                    />
                  </span>
                  <!-- {{user.key}} -->
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(user, index) in filteredUsers" :key="index">
                <td
                  v-for="(column, indexColumn) in headers"
                  :key="indexColumn"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  <span
                    class="text-gray-600"
                    v-if="(typeof user[column] != 'object')"
                  >
                    {{ user[column] }}
                  </span>
                  <span v-else>
                    <ul>
                      <li
                        class="text-xs text-gray-500 font-medium"
                        v-for="(value, key) in user[column]"
                        :key="key"
                      >
                        <span v-if="typeof value === 'string'">
                          {{ key }}: {{ value }}
                        </span>
                      </li>
                    </ul>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-12 gap-4 bg-gray-100 rounded-lg py-3 px-2 my-4 text-gray-500"
    >
      <div class="col-span-8 pt-1">showing 1 of 8 entires</div>
      <div class="col-span-4 flex">
        <span class="leading-10 mr-2"> The page You ara on </span>
        <select class="p-1 rounded-lg">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <span class="mx-5 leading-10">| </span>
        <span
          class="cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-1 mr-1"
        >
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="mt-1" />
        </span>
        <span
          class="cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-1"
        >
          <font-awesome-icon
            :icon="['fas', 'arrow-right']"
            class="mt-1 text-blue-800"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import dropDown from "@/components/Dropdown.vue";
export default {
  components: { dropDown },
  data() {
    return {
      activeIndex: null,
      search: "",
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.basicTable.users,
      columns: (state) => state.basicTable.columns,
      headers: (state) => state.basicTable.headers,
      selectedArray: (state) => state.basicTable.selectedArray,
      asc: (state) => state.basicTable.asc,
    }),
    filteredUsers() {
      let newArray = [];
      newArray = this.users.map((user) => {
        const tempObj = Object.assign({}, user);
        for (const v of this.selectedArray) {
          delete tempObj[v];
        }

        return tempObj;
      });
      if (this.search !== "") {
        // this will not be paginated
        this.set_Headers(newArray[0]);
        return newArray.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        this.set_Headers(newArray[0]);
        return newArray;
      }
    },
  },
  mounted() {
    this.$store.dispatch("basicTable/getUsers");
  },
  methods: {
    ...mapMutations({
      set_Headers: "basicTable/set_Headers",
      set_Users: "basicTable/set_Users",
      sortCols: "basicTable/sortCols",
    }),
    sortColumn(sortKey, i) {
      this.activeIndex = i;
      this.sortCols(sortKey);
    },
  },
};
</script>
