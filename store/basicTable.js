

const state = {
  users: [],
  columns: [],
  headers:[],
  selectedArray:[],
  asc: true
};

const mutations = {
  set_Users(state, users) {
    state.users = users;
  },
  set_Columns(state, columns) {
    state.columns = Object.keys(columns);
  },
  set_Headers(state, headers) {
  
    if(headers){
      state.headers = Object.keys(headers);
    }
  },
  selectedFilters(state , filter){
    state.selectedArray = filter
    localStorage.setItem('selectedArray',JSON.stringify(state.selectedArray));
  },
  sortCols(state,sortKey ) {
 
    state.asc = !state.asc;
    let sortedUsers = state.users;
    if(state.asc){
      sortedUsers.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
    }else{
      sortedUsers.sort((a, b) => (a[sortKey] > b[sortKey] ? -1 : 1));
    }
    state.users = sortedUsers;
}
};



const actions = {
  async getUsers({ commit }) {
    this.$axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        commit("set_Users", response.data);
        commit("set_Columns", response.data[0]);
        commit("set_Headers", response.data[0]);
      });
  },
};


export default {
  state,
  actions,
  mutations,
};
