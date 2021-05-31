import React, { useState, useEffect } from "react";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import './CodeEditor.css'

const CodeEditor = (props) => {
    const [content, setContent] = useState(props.default);

    const handleKeyDown = (evt) => {
        let value = content,
            selStartPos = evt.currentTarget.selectionStart;

        console.log(evt.currentTarget);

        // handle 4-space indent on
        if (evt.key === "Tab") {
            value =
                value.substring(0, selStartPos) +
                "    " +
                value.substring(selStartPos, value.length);
            evt.currentTarget.selectionStart = selStartPos + 3;
            evt.currentTarget.selectionEnd = selStartPos + 4;
            evt.preventDefault();

            setContent(value);
        }
    };

    useEffect(() => {
        Prism.highlightAll();
    }, [content]);

    return (
        <div className="code-edit-container">
            <textarea
                className="code-input"
                value={content}
                onChange={(evt) => { setContent(evt.target.value); props.onChange(evt.target.value); }}
                onKeyDown={handleKeyDown}
            />
            <pre className="code-output line-numbers">
                <code className={`language-clike`}>{content}</code>
            </pre>
        </div>
    );
};

export default CodeEditor;