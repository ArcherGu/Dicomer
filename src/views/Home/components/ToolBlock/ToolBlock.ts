import { cornerstoneTools } from "@/plugins/cornerstone";
import { useStore } from "@/store";
import { defineComponent, watch } from "vue";

export default defineComponent({
    name: "ToolBlock",
    components: {},
    props: {},
    setup(props) {
        const store = useStore();
        const initTools = (element: Element) => {
            const { WwwcTool, ZoomMouseWheelTool } = cornerstoneTools;
            cornerstoneTools.addTool(WwwcTool);
            cornerstoneTools.addTool(ZoomMouseWheelTool);
            cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 2 });
            cornerstoneTools.setToolActive('ZoomMouseWheel', {});
        };

        watch(() => store.getters["dicom/element"], (element: Element) => {
            if (!element) {
                return;
            }

            initTools(element);
        });
    }
});