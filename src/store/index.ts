import { App } from 'vue';
import { createStore } from 'vuex';

const store = createStore({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
});

export function setupStore(app: App) {
    app.use(store);
}

export default store;
