<template>
    <div class="home-page h-full">
        <div class="home-page-header flex border-0 border-b border-solid border-gray-300 divide-x divide-gray-300">
            <div class="header-item logo flex items-center h-full justify-center">
                <img
                    src="@/assets/logo-h.png"
                    class="align-middle"
                />
            </div>

            <div class="header-item open-file-action flex justify-center">
                <OpenBtn />
            </div>

            <div class="header-item">

            </div>
        </div>

        <div class="home-page-container flex divide-x divide-gray-300">
            <div class="file-list-block h-full">

            </div>

            <div class="image-viewer-block h-full">
                <ImageViewer ref="imageViewer" />
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { cornerstone } from "@/plugins/cornerstone";
import { ImageViewer, OpenBtn } from "./components";
import { FolderOpenOutlined } from "@ant-design/icons-vue";
import { useStore } from "@/store";

export default defineComponent({
    name: "Main",
    components: {
        ImageViewer,
        OpenBtn,
        FolderOpenOutlined,
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
</script>

<style lang="less">
.home-page {
    @headerHeight: 80px;
    @headerLogoWidth: 270px;

    .home-page-header {
        height: @headerHeight;

        .logo {
            width: @headerLogoWidth;
            img {
                width: @headerLogoWidth - 20px;
            }
        }

        .open-file-action {
            .ant-upload {
                height: 100%;
            }
        }
    }

    .home-page-container {
        height: calc(100vh - @headerHeight);
        .file-list-block {
            width: @headerLogoWidth;
        }

        .image-viewer-block {
            width: calc(100vw - @headerLogoWidth);
        }
    }
}
</style>