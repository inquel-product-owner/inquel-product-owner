import React from "react";
import CKEditor from "ckeditor4-react";

class CKeditor extends React.Component {
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
            // <CKEditor
            //     data={props.data}
            //     onChange={props.onChange}
            //     config={{
            //         toolbar: [
            //             [
            //                 "Source",
            //                 "-",
            //                 "Save",
            //                 "NewPage",
            //                 "Preview",
            //                 "Print",
            //                 "-",
            //                 "Templates",
            //             ],
            //             [
            //                 "Cut",
            //                 "Copy",
            //                 "Paste",
            //                 "PasteText",
            //                 "PasteFromWord",
            //                 "-",
            //                 "Undo",
            //                 "Redo",
            //             ],
            //             ["Find", "Replace", "SelectAll", "Scayt"],
            //             ["Maximize"],
            //             [
            //                 "Image",
            //                 "Table",
            //                 "HorizontalRule",
            //                 "Smiley",
            //                 "SpecialChar",
            //                 "PageBreak",
            //                 "Iframe",
            //             ],
            //             ["Link", "Unlink", "Anchor"],
            //             [
            //                 "Bold",
            //                 "Italic",
            //                 "Underline",
            //                 "Strike",
            //                 "Subscript",
            //                 "Superscript",
            //                 "Font",
            //                 "FontSize",
            //                 "TextColor",
            //                 "BGColor",
            //             ],
            //             [
            //                 "JustifyLeft",
            //                 "JustifyCenter",
            //                 "JustifyRight",
            //                 "JustifyBlock",
            //                 "-",
            //                 "NumberedList",
            //                 "BulletedList",
            //                 "-",
            //                 "Outdent",
            //                 "Indent",
            //                 "-",
            //                 "Blockquote",
            //                 "CreateDiv",
            //                 "-",
            //                 "BidiLtr",
            //                 "BidiRtl",
            //                 "Language",
            //             ],
            //         ],
            //         height: "350px",
            //     }}
            // />
        );
    }
}

export default CKeditor;
