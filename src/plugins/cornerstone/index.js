import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneMath from 'cornerstone-math';
import Hammer from "hammerjs";

export function setupCornerstone() {
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.init({ showSVGCursors: true });
    cornerstoneTools.disableLogger();

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
}

const EVENTS = cornerstoneTools.EVENTS;

export {
    cornerstone,
    cornerstoneTools,
    cornerstoneWADOImageLoader,
    EVENTS
};