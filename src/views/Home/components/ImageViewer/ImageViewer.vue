<template>
    <div class="image-viewer h-full w-full bg-black relative">
        <div
            ref="viewer"
            class="h-full w-full"
        >
        </div>

        <div class="image-overlay h-full w-full absolute top-0 left-0">
            <div class="overlay-top-left absolute top-0 left-0 p-5">
                <div v-for="txt in overlay.tl">
                    {{ txt }}
                </div>
            </div>

            <div class="overlay-top-right absolute top-0 right-0 p-5">
                <div v-for="txt in overlay.tr">
                    {{ txt }}
                </div>
            </div>

            <div class="overlay-bottom-left absolute bottom-0 left-0 p-5">
                <div v-for="txt in overlay.bl">
                    {{ txt }}
                </div>
            </div>

            <div class="overlay-bottom-right absolute bottom-0 right-0 p-5">
                <div v-for="txt in overlay.br">
                    {{ txt }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./ImageViewer.ts"></script>
<style lang="less" src="./ImageViewer.less"></style>