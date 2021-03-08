import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

export function setupCornerstone() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
}

export {
    cornerstone,
    cornerstoneWADOImageLoader
};