import { FC, useState } from "react";
import { CodeEditor } from "../CodeEditor/CodeEditor.component";
import { evaluateRules, Rule } from "@ryanrutkin/autological";
import './CodePanel.component.css'

export const CodePanel: FC<{
    data: string;
    rules: string;
}> = ({ data, rules }) => {
    const [dirtyData, setDirtyData] = useState<string>(data);
    const [dirtyRules, setDirtyRules] = useState<string>(rules);
    const [result, setResult] = useState<any>('');

    const showResults = () => {
        setResult('');
        if (!dirtyData || !dirtyRules) {
            // TODO - show error
            return;
        }
        let parsedData: Record<string, any> | null = null;
        let parsedRules: any[] | null = null;

        try {
            parsedData = JSON.parse(dirtyData);
        } catch(e) {
            // TODO - throw error
            return;
        }

        try {
            parsedRules = JSON.parse(dirtyRules);
        } catch(e) {
            // TODO - throw error
            return;
        }

        if (!parsedData || !parsedRules) {
            // TODO - show error
            return;
        }

        setResult(evaluateRules(parsedRules as Rule[], [parsedData]));
    }

    return (
        <div className="code-panel" >
            <div className="code-panel-data" >
                {
                    // <CodeEditor code={dirtyData} onChange={(value: string | undefined) => setDirtyData(value || '')} />
                }
            </div>
            <div className="code-panel-rules" >
                {
                    // <CodeEditor code={dirtyRules} onChange={(value: string | undefined) => setDirtyRules(value || '')} />
                }
            </div>
            <div className="code-panel-button-row" >
                <button disabled={!dirtyData || !dirtyRules} className="code-panel-button" >See Results</button>
            </div>
            <div className="code-panel-results" >
                { result }
            </div>
        </div>
    )
}
