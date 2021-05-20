<template>
    <a-dropdown>
        <a-button
            type="link"
            class="h-full"
        >
            <FolderOpenOutlined class="text-4xl" />
        </a-button>

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

<script lang="ts" src="./OpenBtn.ts"></script>