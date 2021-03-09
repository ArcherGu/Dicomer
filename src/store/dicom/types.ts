import { DicomInfo } from "@/types/dicom";

export interface DicomModuleTypes {
    currentId: string | null;
    list: DicomInfo[];
}