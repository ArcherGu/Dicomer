import { DicomInfo } from "@/types/dicom";
import { Module } from "vuex";
import { AllStateTypes } from "../types";
import { DicomModuleTypes } from "./types";
import { array as isArray } from "is";

export const dicomModule: Module<DicomModuleTypes, AllStateTypes> = {
    namespaced: true,
    state: {
        currentId: null,
        list: []
    },
    mutations: {
        setCurrentId(state, data: string) {
            state.currentId = data;
        },
        add(state, data: DicomInfo | DicomInfo[]) {
            isArray(data) ? state.list.push(...(data as DicomInfo[])) : state.list.push((data as DicomInfo));
        },
        remove(state, data: DicomInfo) {
            const index = state.list.findIndex(e => e.imageId == data.imageId);
            state.list.splice(index, 1);
        },
        clear(state) {
            state.list = [];
        }
    },
    getters: {
        currentId(state) {
            return state.currentId;
        },
        list(state) {
            return state.list;
        }
    },
    actions: {

    }
};