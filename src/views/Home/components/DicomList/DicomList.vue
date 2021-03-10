<template>
    <div class="dicom-list h-full overflow-auto">
        <a-menu
            v-model:selectedKeys="selectedKeys"
            @click="changeImage"
            class="divide-y"
        >
            <a-menu-item
                v-for="dicom in dicomList"
                :key="dicom.imageId"
                class="dicom-list-item relative"
            >
                <div class="dicom-name text-lg font-medium">
                    {{ dicom.fileName }}
                </div>
                <div class="dicom-id">
                    <strong>Image ID:</strong>
                    {{ dicom.imageId }}
                </div>

                <a-button
                    type="link"
                    class="dicom-close-btn top-0 right-0 absolute"
                    @click.stop="removeDicom(dicom)"
                >
                    <CloseOutlined />
                </a-button>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script lang="ts" src="./DicomList.ts"></script>
<style lang="less" src="./DicomList.less"></style>