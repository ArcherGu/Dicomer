import { decode } from "iconv-lite";

export function decodeDicomGBK(dataSet: any, code: string, defaultStr = '') {
    let str = defaultStr;
    try {
        const element = dataSet.elements[code];
        let position = element.dataOffset;
        const length = element.length;
        let byte;
        const strData = [];
        for (let i = 0; i < length; i++) {
            byte = dataSet.byteArray[position + i];
            strData.push(byte);
        }
        str = decode(Buffer.from(strData), 'gbk');
        str.trim();
    } catch (error) {
        str = defaultStr;
    }

    return str;
}