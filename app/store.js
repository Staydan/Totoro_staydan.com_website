/**
 * @file 全局store
 *
 * @author Daniel Zhu <enterzhu@gmail.com>
 */
import Vuex from 'vuex';

const state = {
    count: 0
};

const mutations = {
    INCREMENT(state) {
        state.count++;
    }
};

export default new Vuex.Store({
    state,
    mutations
});
