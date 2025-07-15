import { FC, useMemo, useState } from "react";
import { Page } from "../../components/Page/Page.component";
import { JumpMenu } from "../../components/JumpMenu/JumpMenu.component";
import { AutologicalSchemas } from '@ryanrutkin/autological-schema';
import { CodePanel } from "../../components/CodePanel/CodePanel.component";
import { JsonSchemaDef } from "../../types/types";
import { SchemaDisplay } from "../../components/SchemaDisplay/SchemaDisplay.component";
import './Docs.page.css';

export const DocsPage: FC = () => {
    const [data, setData] = useState<string>('');
    const [rules, setRules] = useState<string>('');

    const schemas = useMemo(() => {
        const testSchemas = Object.values(AutologicalSchemas) as JsonSchemaDef[];
        return testSchemas;
    }, []);
    const jumpItems = useMemo(() => (
        schemas.map(schema => ({
            title: schema.schema.title,
            id: schema.schema_type
        }))
    ), [schemas]);

    const jumpTo = (id: string) => {

    }

    return (
        <Page className="docs-page" >
            <JumpMenu items={jumpItems} jumpTo={jumpTo} />
            <div className="docs-page-body" >
                <div className="docs-page-body-content" >
                    <div className="docs-page-header" >
                        <div className="docs-page-title" >
                            autological
                        </div>
                        <div id="links" className="docs-page-links-section" >
                            <div className="docs-page-link" >
                                https://github.com/RyanRutkin/autological
                            </div>
                            <div className="docs-page-link" >
                                https://www.npmjs.com/package/@ryanrutkin/autological
                            </div>
                        </div>
                    </div>
                    <div id="description" className="docs-page-description" >
                        Description about autological
                    </div>
                    <div id="specification" >
                        {
                            schemas.map(schemaDef => (
                                <SchemaDisplay
                                    schemaId={ `${schemaDef.schema_type}_${schemaDef.schema_type_version}` } 
                                    schema={schemaDef.schema} 
                                    schemaType={schemaDef.schema_type}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <CodePanel data={data} rules={rules} />
        </Page>
    )
}