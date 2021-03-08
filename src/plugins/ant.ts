import { App, Plugin } from 'vue';
import {
    Layout,
    Button,
    Row,
    Col,
    Form,
    Input,
    Tooltip,
    Divider,
    Tag,
    Upload
} from 'ant-design-vue';

const components = [
    Layout,
    Button,
    Row,
    Col,
    Form,
    Input,
    Tooltip,
    Divider,
    Tag,
    Upload
];

const ant: Plugin = {
    install(app: App) {
        components.forEach(c => {
            app.use(c);
        });
    }
};

export function setupAntd(app: App) {
    app.use(ant);
}