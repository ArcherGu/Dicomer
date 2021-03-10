import { defineComponent, onMounted, onUnmounted, reactive, ref, toRefs } from "vue";
import { cornerstone, cornerstoneTools, EVENTS } from "@/plugins/cornerstone";
import { decodeDicomGBK } from "@/utils";
import { dateFormat } from "@/plugins/day";
import { useStore } from "@/store";
import { Nullable } from "@/types/helper";
interface ComponentState {
    overlay: { [key: string]: string[]; };
    imagePos: Nullable<{ x: string; y: string; }>;
    dicomPos: Nullable<{ x: string; y: string; z: string; }>;
}

export default defineComponent({
    name: "ImageViewer",
    components: {},
    props: {},
    setup(props) {
        const store = useStore();
        let element: Element;
        let enableElement: any;
        const viewer = ref<any>(null);
        const state = reactive<ComponentState>({
            overlay: { tl: [], tr: [], bl: [], br: [] },
            imagePos: null,
            dicomPos: null
        });

        const init = () => {
            element = viewer.value;
            cornerstone.enable(element);
            enableElement = cornerstone.getEnabledElement(element);

            store.commit("dicom/setElement", element);
        };

        const addEvents = () => {
            window.addEventListener("resize", windowResize);
            element.addEventListener(EVENTS.MOUSE_MOVE, updateMousePos);
        };

        const removeEvents = () => {
            window.removeEventListener("resize", windowResize);
            element.removeEventListener(EVENTS.MOUSE_MOVE, updateMousePos);
        };

        const updateMousePos = (evt: any) => {
            state.imagePos = null;
            state.dicomPos = null;
            if (!evt) {
                return;
            }

            const eventData = evt.detail;
            const imageX = eventData.currentPoints.image.x;
            const imageY = eventData.currentPoints.image.y;
            const imageHeight = eventData.image.height;
            const imageWidth = eventData.image.width;
            if (
                (imageX < 0 || imageX > imageWidth) ||
                (imageY < 0 || imageY > imageHeight)
            ) {
                return;
            }

            state.imagePos = { x: imageX.toFixed(2), y: imageY.toFixed(2) };
            const imagePointToPatientPoint = cornerstoneTools.importInternal(
                "util/imagePointToPatientPoint"
            );
            const imagePlane = cornerstone.metaData.get(
                'imagePlaneModule',
                eventData.image.imageId
            );
            if (!imagePlane) {
                return;
            }

            const patientPoint = imagePointToPatientPoint(
                {
                    x: imageX,
                    y: imageY,
                },
                imagePlane
            );
            if (!patientPoint) {
                return;
            }

            state.dicomPos = {
                x: patientPoint.x.toFixed(2),
                y: patientPoint.y.toFixed(2),
                z: patientPoint.z.toFixed(2),
            };
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
            updateMousePos(null);
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

            state.overlay.bl.push(`T: ${Number(dataSet.string("x00180050")).toFixed(2)} L: ${Number(dataSet.string("x00201041")).toFixed(2)}`); //Slice Thickness / Slice Location

            state.overlay.br.push(`FS: ${dataSet.string("x00180087")}`); // Magnetic Field Strength
            state.overlay.br.push(`TR: ${dataSet.string("x00180080")} TE: ${dataSet.string("x00180081")}`); // Repetition Time  / cho Time
            state.overlay.br.push(dateFormat(dataSet.string("x00080021") + dataSet.string("x00080031")));// Series Date Series Time
        };

        onMounted(() => {
            init();
            addEvents();
        });

        onUnmounted(() => {
            removeEvents();
        });

        return {
            ...toRefs(state),
            viewer,
            displayImage,
            clearImage,
        };
    },
});