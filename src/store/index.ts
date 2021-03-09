import { App, InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { dicomModule } from './dicom';
import { AllStateTypes } from './types';

export const store = createStore<AllStateTypes>({
    modules: {
        dicom: dicomModule,
    }
});

export const key: InjectionKey<Store<AllStateTypes>> = Symbol('vue-store');

export function useStore() {
    return baseUseStore(key);
}

export function setupStore(app: App) {
    app.use(store, key);
};