// import { Editor } from "@monaco-editor/react";
import { FC, useRef } from "react";

export const CodeEditor: FC<{
    code: string;
    onChange: (value: string | undefined) => void;
}> = ({ code, onChange }) => {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
    }

    const handleEditorChange = (value: string | undefined, event: any) => {
        onChange(value);
    }

    return (
        <div className="app-code-editor" >
            {/*
                <Editor
                    height="100%"
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                />
            */}
        </div>
    )
}