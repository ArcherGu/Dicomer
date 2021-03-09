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
    Popover,
    Tag,
    Upload,
    Dropdown,
    Menu
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
    Popover,
    Tag,
    Upload,
    Dropdown,
    Menu
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