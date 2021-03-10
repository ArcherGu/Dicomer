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
                <ToolBlock />
            </div>
        </div>

        <div class="home-page-container flex divide-x divide-gray-300">
            <div class="file-list-block h-full">
                <DicomList />
            </div>

            <div class="image-viewer-block h-full">
                <ImageViewer ref="imageViewer" />
            </div>

        </div>
    </div>
</template>

<script lang="ts" src="./Home.ts"></script>
<style lang="less" src="./Home.less"></style>