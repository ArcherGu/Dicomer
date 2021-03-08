<template>
    <div
        ref="viewer"
        class="image-viewer h-full w-full"
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
        const viewer = ref<any>(null);

        const init = () => {
            element = viewer.value;
            cornerstone.enable(element);
        };

        const displayImage = (image: any) => {
            cornerstone.displayImage(element, image);
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
        };
    },
});
</script>

<style lang="less">
</style>