import { DicomInfo } from "@/types/dicom";
import { Nullable } from "@/types/helper";

export interface DicomModuleTypes {
    currentId: Nullable<string>;
    list: DicomInfo[];
    element: Nullable<Element>;
}