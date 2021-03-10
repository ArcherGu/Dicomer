import { defineComponent, onMounted, onUnmounted, reactive, ref, toRefs } from "vue";
import { cornerstone } from "@/plugins/cornerstone";
import { decodeDicomGBK } from "@/utils";
import { dateFormat } from "@/plugins/day";

const EmptyOverlay = { tl: [], tr: [], bl: [], br: [] } as { [key: string]: string[]; };

export default defineComponent({
    name: "ImageViewer",
    components: {},
    props: {},
    setup(props) {
        let element: Element;
        let enableElement: any;
        const viewer = ref<any>(null);
        const state = reactive({
            overlay: { tl: [], tr: [], bl: [], br: [] } as { [key: string]: string[]; }
        });

        const init = () => {
            element = viewer.value;
            cornerstone.enable(element);
            enableElement = cornerstone.getEnabledElement(element);
        };

        const displayImage = (image: any) => {
            cornerstone.displayImage(element, image);
            updateOverlay();
        };

        const clearImage = () => {
            if (enableElement && enableElement.canvas) {
                const canvas = enableElement.canvas;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                enableElement.image = undefined;
            }
            updateOverlay();
        };

        const windowResize = () => {
            cornerstone.resize(element, true);
        };

        const updateOverlay = () => {
            state.overlay = { tl: [], tr: [], bl: [], br: [] };
            if (
                !enableElement ||
                !enableElement.image ||
                !enableElement.image.data
            ) {
                return;
            }
            const dataSet = enableElement.image.data;

            state.overlay.tl.push(`Im: ${dataSet.string("x00200013")}/${dataSet.string("x00201002")}`); // Instance Number/Images in Acquisition
            state.overlay.tl.push(`Se: ${dataSet.string("x00200011")}`); // Series Number
            state.overlay.tl.push(`${dataSet.string("x00180024")}`); // Sequence Name

            state.overlay.tr.push(decodeDicomGBK(dataSet, "x00100010")); // Patient Name
            state.overlay.tr.push(dataSet.string("x00100020")); // Patient ID
            state.overlay.tr.push(
                `${dataSet.string("x00100040")}/${dataSet.string("x00101010")}`
            ); // Patient Sex / Patient Age
            state.overlay.tr.push(dataSet.string("x00080080")); // Institution Name
            state.overlay.tr.push(dataSet.string("x0008103E")); // Series Description
            state.overlay.tr.push(dataSet.string("x00180020")); // Scanning Sequence

            state.overlay.bl.push(`T: ${dataSet.string("x00180050")} L: ${Number(dataSet.string("x00201041")).toFixed(2)}`); //Slice Thickness / Slice Location

            state.overlay.br.push(`FS: ${dataSet.string("x00180087")}`); // Magnetic Field Strength
            state.overlay.br.push(`TR: ${dataSet.string("x00180080")} TE: ${dataSet.string("x00180081")}`); // Repetition Time  / cho Time
            state.overlay.br.push(dateFormat(dataSet.string("x00080021") + dataSet.string("x00080031")));// Series Date Series Time
        };

        onMounted(() => {
            init();
            window.addEventListener("resize", windowResize);
        });

        onUnmounted(() => {
            window.removeEventListener("resize", windowResize);
        });

        return {
            ...toRefs(state),
            viewer,
            displayImage,
            clearImage,
        };
    },
});