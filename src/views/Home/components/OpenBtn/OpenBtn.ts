import { computed, defineComponent } from "vue";
import { FolderOpenOutlined } from "@ant-design/icons-vue";
import { cornerstoneWADOImageLoader } from "@/plugins/cornerstone";
import { useStore } from "@/store";
import { DicomInfo } from "@/types/dicom";
import { Subject } from "rxjs";
import { throttleTime } from "rxjs/operators";

export default defineComponent({
    name: "OpenBtn",
    components: {
        FolderOpenOutlined,
    },
    props: {},
    setup(props) {
        const store = useStore();
        const openStream = new Subject<string>();

        openStream.pipe(throttleTime(2 * 1000)).subscribe((imageId) => {
            store.commit("dicom/setCurrentId", imageId);
        });

        const dicomList = computed<DicomInfo[]>(() => store.getters["dicom/list"]);

        const openFile = (file: File) => {
            if (dicomList.value.some(e => e.fileName === file.name) || file.name.indexOf('.dcm') == -1) {
                return false;
            }

            const imageId: string = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

            const fileIndex = Number(imageId.split(":")[1]);

            store.commit("dicom/add", {
                imageId,
                fileName: file.name,
                fileIndex,
            } as DicomInfo);

            openStream.next(imageId);

            return false;
        };

        return {
            openFile,
        };
    },
});
