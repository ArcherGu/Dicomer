<template>
    <div class="home-page">
        <a-upload :before-upload="openFile">
            <a-button>
                Open File
            </a-button>
        </a-upload>

        <div ref="viewer">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { cornerstone, cornerstoneWADOImageLoader } from "@/plugins/cornerstone";

export default defineComponent({
    name: "Main",
    components: {},
    props: {},
    setup(props) {
        const viewer = ref<any>(null);

        const openFile = (file: any) => {
            const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(
                file
            );

            const element = viewer.value;
            cornerstone.loadImage(imageId).then((image: any) => {
                cornerstone.displayImage(element, image);
            });

            return false;
        };

        const initViewer = () => {
            const element = viewer.value;
            cornerstone.enable(element);
        };

        onMounted(() => {
            initViewer();
        });

        return {
            viewer,
            openFile,
        };
    },
});
</script>

<style>
</style>