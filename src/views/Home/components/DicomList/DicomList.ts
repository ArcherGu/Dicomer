import { useStore } from "@/store";
import { computed, defineComponent, reactive, toRefs, watch } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { cornerstone, cornerstoneWADOImageLoader } from "@/plugins/cornerstone";
import { DicomInfo } from "@/types/dicom";

export default defineComponent({
    name: "DicomList",
    components: {
        CloseOutlined,
    },
    props: {},
    setup(props) {
        const state = reactive({
            selectedKeys: [] as string[],
        });
        const store = useStore();
        const dicomList = computed(() => store.getters["dicom/list"]);

        const changeImage = (obj: any) => {
            store.commit("dicom/setCurrentId", obj.key);
        };

        const removeDicom = (dicomInfo: DicomInfo) => {
            if (state.selectedKeys.includes(dicomInfo.imageId)) {
                store.commit("dicom/setCurrentId", null);
            }

            store.commit("dicom/remove", dicomInfo);

            const { imageCache } = cornerstone;
            if (imageCache.imageCache.hasOwnProperty(dicomInfo.imageId)) {
                imageCache.removeImageLoadObject(dicomInfo.imageId);
            }

            cornerstoneWADOImageLoader.wadouri.fileManager.remove(
                dicomInfo.fileIndex
            );
        };

        watch(
            () => store.getters["dicom/currentId"],
            (imageId: string | null) => {
                if (imageId) {
                    state.selectedKeys = [imageId];
                } else {
                    state.selectedKeys = [];
                }
            }
        );

        return {
            ...toRefs(state),
            dicomList,
            changeImage,
            removeDicom,
        };
    },
});