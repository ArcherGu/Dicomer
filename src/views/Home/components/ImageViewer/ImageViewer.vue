<template>
    <div class="image-viewer h-full w-full bg-black relative">
        <div
            ref="viewer"
            class="h-full w-full"
            @contextmenu.prevent
        >
        </div>

        <div class="image-overlay">
            <div class="overlay-top-left absolute top-0 left-0 p-5">
                <div
                    v-for="txt in overlay.tl"
                    class="text-blue-400"
                >
                    {{ txt }}
                </div>
            </div>

            <div class="overlay-top-right absolute top-0 right-0 p-5 text-right">
                <div
                    v-for="txt in overlay.tr"
                    class="text-blue-400"
                >
                    {{ txt }}
                </div>
            </div>

            <div class="overlay-bottom-left absolute bottom-0 left-0 p-5">
                <div
                    class="text-lg text-pink-500 font-semibold"
                    v-if="dicomPos"
                >
                    {{ `X: ${dicomPos.x} Y: ${dicomPos.y} Z: ${dicomPos.z}`}}
                </div>

                <div
                    class="text-lg text-yellow-600 font-semibold"
                    v-if="imagePos"
                >
                    {{ `X: ${imagePos.x} Y: ${imagePos.y}`}}
                </div>
                <div
                    v-for="txt in overlay.bl"
                    class="text-blue-400"
                >
                    {{ txt }}
                </div>
            </div>

            <div class="overlay-bottom-right absolute bottom-0 right-0 p-5 text-right">
                <div
                    v-for="txt in overlay.br"
                    class="text-blue-400"
                >
                    {{ txt }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./ImageViewer.ts"></script>