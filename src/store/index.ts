import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { Member } from '@/types';

const vuexPersist = new VuexPersist({
  key: 'workshop',
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    membersList: [
      {
        id: 1,
        name: 'You',
        email: 'shivam@chargebee.com',
        role: 'Admin',
      },
    ] as Member[],
  },
  mutations: {
    addMember(state, member: Member): void {
      state.membersList.push(member);
    },
    deleteMember(state, memberId: number): void {
      for (let i = 0; i < state.membersList.length; i += 1) {
        if (state.membersList[i].id === memberId) {
          state.membersList.splice(i, 1);
          break;
        }
      }
    },
    editMemberRole(state, member: Member): void {
      for (let i = 0; i < state.membersList.length; i += 1) {
        if (state.membersList[i].id === member.id) {
          state.membersList[i].role = member.role;
          break;
        }
      }
    },
  },
  getters: {
    getMember: (state) => (memberId: number) => (
      state.membersList.find((member) => member.id === memberId)
    ),
    getMemberCount: (state) => state.membersList.length,
  },
  actions: {},
  modules: {},
  plugins: [vuexPersist.plugin],
});
