import { defineComponent, ref, watch } from "vue";
import { cornerstone } from "@/plugins/cornerstone";
import { ImageViewer, OpenBtn, DicomList, ToolBlock } from "./components";
import { useStore } from "@/store";

export default defineComponent({
    name: "Main",
    components: {
        DicomList,
        ImageViewer,
        OpenBtn,
        ToolBlock
    },
    props: {},
    setup(props) {
        const store = useStore();
        const imageViewer = ref<any>(null);

        const changeImage = (imageId: string | null) => {
            if (!imageId) {
                imageViewer.value.clearImage();
                return;
            }

            cornerstone.loadAndCacheImage(imageId).then((image: any) => {
                imageViewer.value.displayImage(image);
            });
        };

        watch(() => store.getters["dicom/currentId"], changeImage);

        return {
            imageViewer,
        };
    },
});
