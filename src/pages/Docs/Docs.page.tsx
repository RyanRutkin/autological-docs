import { FC, useMemo, useState } from "react";
import { Page } from "../../components/Page/Page.component";
import { JumpMenu } from "../../components/JumpMenu/JumpMenu.component";
import { AutologicalSchemas } from '@ryanrutkin/autological-schema';
import { CodePanel } from "../../components/CodePanel/CodePanel.component";
import { JsonSchemaDef } from "../../types/types";
import { SchemaDisplay } from "../../components/SchemaDisplay/SchemaDisplay.component";
import './Docs.page.css';
import { AppHashLink } from "../../components/AppHashLink/AppHashLink.component";

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

    return (
        <Page className="docs-page" >
            <JumpMenu items={jumpItems} />
            <div className="docs-page-body" >
                <div className="docs-page-body-content" >
                    <div className="docs-page-header" >
                        <div className="docs-page-title" >
                            autological
                        </div>
                        <div id="links" className="docs-page-links-section" >
                            <div className="docs-page-link" >
                                <div className="docs-page-link-label" >Github</div>
                                <a href="https://github.com/RyanRutkin/autological" >https://github.com/RyanRutkin/autological</a>
                            </div>
                            <div className="docs-page-link" >
                                <div className="docs-page-link-label" >NPM</div>
                                <a href="https://www.npmjs.com/package/@ryanrutkin/autological" >https://www.npmjs.com/package/@ryanrutkin/autological</a>
                            </div>
                        </div>
                    </div>
                    <div id="description" className="docs-page-description" >
                        <div className="docs-page-description-section" >
                            <div className="docs-page-description-section-label" >Description</div>
                            <div className="docs-page-description-section-body" >
                                <div className="docs-page-description-section-content" >
                                    Autological is a robust library that allows users to query a dataset.
                                    <br/>These queries are defined in JSON and can be validated by JSON Schema.
                                    <br/>
                                    <br/>The inputs to an autological query are an array of documents and a query to be performed against them.
                                    <br/>A document can be any JSON body, but if more than one document is supplied then every document must contain an "$id" property.
                                    <br/>This $id is used for targeting the document that your query is working against. Without it, we wouldn't know where to resolve our JSON Pointers.
                                </div>
                            </div>
                        </div>
                        <div className="docs-page-description-section" >
                            <div className="docs-page-description-section-label" >Targetting</div>
                            <div className="docs-page-description-section-body" >
                                <div className="docs-page-description-section-content" >
                                    Queries target different portions of the document by <a href="https://datatracker.ietf.org/doc/html/rfc6901" >JSON Pointer</a>.
                                    <br/>For example, say we have a body of JSON (this is what autological calls a document):
                                    <br/>
                                    <div className="docs-page-code-block" >
                                        <pre>
                                            <code>
                                                {
`{
    "menu": {
        "appetizers": [
            {
                "label": "Spicy Bacon Brussels",
                "description": "Everyone loves these now!",
                "price": "8.99"
            },
            {
                "label": "Edamame",
                "description": "More fun than tasty",
                "price": "5.99"
            }
        ],
        "salads": [
            {
                "label": "Caesar",
                "description": "Basic",
                "price": "12.99"
            },
            {
                "label": "Apple Walnut",
                "description": "Apple, Walnut, Gorgonzola, Greens, mmm",
                "price": "14.99"
            }
        ],
        "sandwiches": [
            {
                "label": "PB&J",
                "description": "Don't grow up",
                "price": "5.99"
            },
            {
                "label": "Burger",
                "description": "Yes a burger is a sandwich. It doesn't need it's own section.",
                "price": "13.99"
            }
        ],
        "entrees": [
            {
                "label": "Fish and Chips",
                "description": "Can you guess what kind of fish it is?",
                "price": "15.99"
            },
            {
                "label": "Steak and Eggs",
                "description": "Breakfast? Dinner? Who cares",
                "price": "16.99"
            }
        ],
        "deserts": [
            {
                "label": "Molten Lava Cake",
                "description": "We don't need to be original",
                "price": "8.99"
            },
            {
                "label": "New York Cheesecake",
                "description": "Not actually from New York",
                "price": "5.99"
            }
        ]
    }
}`
                                                }
                                            </code>
                                        </pre>
                                    </div>
                                    To target the price of the first appetizer, Spicy Bacon Brussels, we could use the JSON Pointer 
                                    <div className="docs-page-code-block auto-height" >
                                        <pre>
                                            <code>/menu/appetizers/0/price</code>
                                        </pre>
                                    </div>
                                    Calling autological with this data (as myDocument) and a simple <AppHashLink to="/#PATH_RESOLUTION_RULE" >PathResolutionRule</AppHashLink> with this path supplied will return the price.
                                    <div className="docs-page-code-block auto-height" >
                                        <pre><code>{`evaluateRules(
    {
        "path": "/menu/appetizers/0/price"
    },
    [myDocument]
);

// Result: "8.99"`}</code></pre>
                                    </div>
                                </div>
                            </div>
                        </div>
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