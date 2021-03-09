<template>
    <div
        ref="viewer"
        class="image-viewer h-full w-full bg-black"
    >
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { cornerstone } from "@/plugins/cornerstone";

export default defineComponent({
    name: "ImageViewer",
    components: {},
    props: {},
    setup(props) {
        let element: Element;
        let enableElement: any;
        const viewer = ref<any>(null);

        const init = () => {
            element = viewer.value;
            cornerstone.enable(element);
            enableElement = cornerstone.getEnabledElement(element);
        };

        const displayImage = (image: any) => {
            cornerstone.displayImage(element, image);
        };

        const clearImage = () => {
            if (enableElement && enableElement.canvas) {
                const canvas = enableElement.canvas;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                enableElement.image = undefined;
            }
        };

        const windowResize = () => {
            cornerstone.resize(element, true);
        };

        onMounted(() => {
            init();
            window.addEventListener("resize", windowResize);
        });

        onUnmounted(() => {
            window.removeEventListener("resize", windowResize);
        });

        return {
            viewer,
            displayImage,
            clearImage,
        };
    },
});
</script>

<style lang="less">
</style>