<template>
    <div class="dicom-list h-full overflow-auto">
        <a-menu
            v-model:selectedKeys="selectedKeys"
            @click="changeImage"
            class="divide-y"
        >
            <a-menu-item
                v-for="dicom in dicomList"
                :key="dicom.imageId"
                class="dicom-list-item relative"
            >
                <div class="dicom-name text-lg font-medium">
                    {{ dicom.fileName }}
                </div>
                <div class="dicom-id">
                    <strong>Image ID:</strong>
                    {{ dicom.imageId }}
                </div>

                <a-button
                    type="link"
                    class="dicom-close-btn top-0 right-0 absolute"
                    @click.stop="removeDicom(dicom)"
                >
                    <CloseOutlined />
                </a-button>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script lang="ts">
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
</script>

<style lang="less">
.dicom-list {
    .dicom-list-item {
        height: 60px;
        margin: 0 !important;
        .dicom-name,
        .dicom-id {
            height: 30px;
            line-height: 30px;
        }

        .dicom-close-btn {
            display: none;
            height: 60px;
            align-items: center;
            color: #1890ff;
            .anticon {
                font-size: 16px;
            }

            &:hover {
                color: #ff7875;
            }
        }

        &:hover {
            .dicom-close-btn {
                display: flex;
            }
        }
    }
}
</style>