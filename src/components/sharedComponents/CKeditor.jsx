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
        );
    }
}

export default CKeditor;
