import React from "react";
import E from "wangeditor";

export interface IProps {
    height?: number;
    defaultValue?: string;
    menus?: string[];
    onChange?: (html: string) => void;
}
interface IState { }

export default class WangEditor extends React.Component<IProps, IState> {
    private editorRef: any = React.createRef();
    private EDITOR: any;
    static defaultProps = {
        height: 400,
        defaultValue: "",
        menus: [
            'head',
            'bold',
            'fontSize',
            'fontName',
            'lineHeight',
            'foreColor',
            'backColor',
            'link',
            'list',
            'justify',
            'quote',
            'image',
            'splitLine',
            'undo',
            'redo',
        ]
    };

    public componentDidMount() {
        this.EDITOR = new E(this.editorRef.current);
        // @ts-ignore
        this.EDITOR.config.height = this.props.height;
        // @ts-ignore
        this.EDITOR.config.menus = this.props.menus;
        this.EDITOR.config.uploadImgMaxLength = 1;
        this.EDITOR.config.uploadImgTimeout = 100000000;
        this.EDITOR.config.uploadVideoTimeout = 100000000;
        this.EDITOR.config.uploadFileName = 'files';
        this.EDITOR.config.uploadImgMaxSize = 5 * 1024 * 1024; // 10M
        this.EDITOR.config.customAlert = function (msg: string, t: any) {
            switch (t) {
                case 'success':
                    console.log('success');
                    break;
                case 'info':
                    console.log('info');
                    break;
                case 'warning':
                    console.log('warning');
                    break;
                case 'error':
                    console.log('error');
                    break;
                default:
            }
        };
        this.EDITOR.config.onchange = (html: string) => {
            this.props.onChange && this.props.onChange(html);
        };

        this.EDITOR.create();
        this.EDITOR.txt.clear();
        this.EDITOR.txt.html(this.props.defaultValue);
    }

    public setData(value: string) {
        if (this.EDITOR) {
            this.EDITOR.txt.html(value);
        }
    }

    public render() {
        return <div ref={this.editorRef} style={{ width: "100%" }} />;
    }
}
