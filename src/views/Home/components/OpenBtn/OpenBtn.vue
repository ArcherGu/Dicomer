<template>
    <a-dropdown>
        <a @click.prevent>
            <a-upload
                :before-upload="openFile"
                :show-upload-list="false"
            >
                <a-button
                    type="link"
                    class="h-full"
                >
                    <FolderOpenOutlined class="text-4xl" />
                </a-button>
            </a-upload>
        </a>

        <template #overlay>
            <a-menu>
                <a-menu-item>
                    <a-upload
                        :before-upload="openFile"
                        :show-upload-list="false"
                    >
                        <a @click.prevent>Open DICOM File</a>
                    </a-upload>
                </a-menu-item>
                <a-menu-item>
                    <a-upload
                        :before-upload="openFile"
                        :show-upload-list="false"
                        directory
                    >
                        <a @click.prevent>Open Folder</a>
                    </a-upload>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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

        const openFile = (file: File) => {
            const imageId: string = cornerstoneWADOImageLoader.wadouri.fileManager.add(
                file
            );

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
</script>

<style>
</style>