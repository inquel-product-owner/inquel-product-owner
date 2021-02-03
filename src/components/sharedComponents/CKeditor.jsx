import React from "react";
import CKEditor from "ckeditor4-react-advanced";

function CKeditor(props) {
    return (
        <CKEditor
            data={props.data}
            onChange={props.onChange}
            config={{
                toolbar: [
                    [
                        "Source",
                        "-",
                        "Save",
                        "NewPage",
                        "Preview",
                        "Print",
                        "-",
                        "Templates",
                    ],
                    [
                        "Cut",
                        "Copy",
                        "Paste",
                        "PasteText",
                        "PasteFromWord",
                        "-",
                        "Undo",
                        "Redo",
                    ],
                    ["Find", "Replace", "SelectAll", "Scayt"],
                    ["Maximize"],
                    [
                        "Image",
                        "Table",
                        "HorizontalRule",
                        "Smiley",
                        "SpecialChar",
                        "PageBreak",
                        "Iframe",
                    ],
                    ["Link", "Unlink", "Anchor"],
                    [
                        "Bold",
                        "Italic",
                        "Underline",
                        "Strike",
                        "Subscript",
                        "Superscript",
                        "Font",
                        "FontSize",
                        "TextColor",
                        "BGColor",
                    ],
                    [
                        "JustifyLeft",
                        "JustifyCenter",
                        "JustifyRight",
                        "JustifyBlock",
                        "-",
                        "NumberedList",
                        "BulletedList",
                        "-",
                        "Outdent",
                        "Indent",
                        "-",
                        "Blockquote",
                        "CreateDiv",
                        "-",
                        "BidiLtr",
                        "BidiRtl",
                        "Language",
                    ],
                ],
                height: "350px",
            }}
        />
    );
}

export default CKeditor;
