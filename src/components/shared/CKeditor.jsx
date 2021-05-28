import React from "react";
import CKEditor from "ckeditor4-react";

export default class CKeditor extends React.Component {
    constructor() {
        super();
        CKEditor.editorUrl =
            "https://cdn.ckeditor.com/4.16.0/full-all/ckeditor.js";
    }

    render() {
        return (
            <CKEditor
                data={this.props.data}
                onChange={this.props.onChange}
                config={{
                    extraPlugins: "ckeditor_wiris",
                    removePlugins:
                        "filetools,uploadimage,uploadwidget,uploadfile,filebrowser,easyimage,forms,about,save,exportpdf,div,showblocks",
                    removeButtons: "Anchor",
                    allowedContent: true,
                }}
                onBeforeLoad={(CKEDITOR) => {
                    CKEDITOR.plugins.addExternal(
                        "ckeditor_wiris",
                        "/mathtype-ckeditor4/",
                        "plugin.js"
                    );
                }}
            />
        );
    }
}

export class OptionEditor extends React.Component {
    render() {
        return (
            <CKEditor
                data={this.props.data}
                onChange={this.props.onChange}
                type="inline"
                config={{
                    editorplaceholder: "Enter options here...",
                    extraPlugins: "ckeditor_wiris",
                    removePlugins:
                        "basicstyles,link,list,blockquote,format,about,filetools,uploadimage,uploadwidget,uploadfile,filebrowser,easyimage,forms,about,save,exportpdf,div,showblocks,justify,font,smiley,flash,iframe,pagebreak,language,find,copyformatting,selectall,newpage,print,templates,preview,",
                    removeButtons:
                        "Cut,Copy,Paste,PasteFromWord,PasteText,Table,Styles,Indent,Outdent,RemoveFormat,Source,Undo,Redo,SpecialChar,HorizontalRule,Scayt,TextColor,BGColor,BidiLtr,BidiRtl",
                    allowedContent: true,
                    toolbar: [
                        [
                            "Image",
                            "ckeditor_wiris_formulaEditor",
                            "ckeditor_wiris_formulaEditorChemistry",
                            "Maximize",
                        ],
                    ],
                }}
                onBeforeLoad={(CKEDITOR) => {
                    CKEDITOR.plugins.addExternal(
                        "ckeditor_wiris",
                        "/mathtype-ckeditor4/",
                        "plugin.js"
                    );
                }}
            />
        );
    }
}
