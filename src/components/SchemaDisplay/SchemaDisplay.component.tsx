import { FC } from "react";
import { JsonSchema, ValueOf } from "../../types/types";
import './SchemaDisplay.component.css';
import { JsonSchemaProperty } from "@ryanrutkin/autological-schema";
import { HashLink } from "react-router-hash-link";

export const SchemaDisplay: FC<{
    schemaId: string;
    schema: Partial<JsonSchema>;
    isChild?: boolean;
}> = ({ schemaId, schema, isChild }) => {
    function getSchemaPropertyDetailItem(key: string, value: ValueOf<JsonSchemaProperty>) {
        if (key === 'items') {
            return getSchemaProperties('Items', value as Record<string, JsonSchemaProperty | string>);
        }
        return (
            <li className="app-schema-property-detail" >
                <div className="app-schema-property-detail-content" >
                    <div className="app-schema-property-detail-label" >{ key }:</div>
                    <div className="app-schema-property-detail-value" >
                        {
                            typeof value === 'string'
                            ? value
                            : null
                        }
                        {
                            Array.isArray(value)
                            ? value.join(' | ')
                            : null
                        }
                    </div>
                </div>
            </li>
        )
    }
    function getSchemaPropertyDetail(prop: JsonSchemaProperty) {
        if (prop.$ref) {
            return (
                <li className="app-schema-property-detail" >
                    <div className="app-schema-property-detail-content" >
                        <div className="app-schema-property-detail-label" >$ref:</div>
                        <div className="app-schema-property-detail-value" >
                            <HashLink to={`/#${ prop.$ref }`} >{ prop.$ref }</HashLink>
                        </div>
                    </div>
                </li>
            )
        }
        return Object.entries(prop).map(([key, value]) => 
            getSchemaPropertyDetailItem(key, value)
        )
    }
    function getSchemaProperties(label: string, properties: Record<string, JsonSchemaProperty | string>) {
        return (
            <div className="app-schema-properties" >
                <div className="app-schema-properties-label" >{ label }:</div>
                {
                    properties.$ref
                    ? (
                        <div className="app-schema-property" >
                            <div className="app-schema-property-detail-content" >
                                <div className="app-schema-property-detail-label" >$ref:</div>
                                <div className="app-schema-property-detail-value" >
                                    <HashLink to={`/#${ properties.$ref }`} >{ properties.$ref as string }</HashLink>
                                </div>
                            </div>
                        </div>
                    )
                    : Object.entries(properties || {}).map(([key, value]) => (
                        <div 
                            className="app-schema-property" 
                            key={ `schema_${schemaId}_${label}_${key}`} 
                        >
                            <div className="app-schema-property-name" >"{ key }"</div>
                            {
                                Object.keys(value).length
                                ? <ul className="app-schema-property-details" >
                                    {
                                        getSchemaPropertyDetail(value as JsonSchemaProperty)
                                    }
                                </ul>
                                : null
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
    return (
        <div className={ `app-schema ${ isChild ? 'app-schema-is-child' : '' }` } >
            {
                schema.title
                ? <div className="app-schema-title" >{ schema.title }</div>
                : null
            }
            <div className="app-schema-body" >
                {
                    schema.description
                    ? <div className="app-schema-description" >{ schema.description }</div>
                    : null
                }
                {
                    schema.properties
                    ? getSchemaProperties('Properties', schema.properties)
                    : null
                }
                {
                    schema.required
                    ? <div className="app-schema-required-properties" >
                        <div className="app-schema-required-properties-label" >Required: </div>
                        <div className="app-schema-required-properties-list" >{ schema.required.join(', ') }</div>
                    </div>
                    : null
                }
                {
                    schema.oneOf
                    ? (
                        <div className="app-schema-options" >
                            <div className="app-schema-options-label" >Variations (must conform to exactly one variation):</div>
                            <ul className="app-schema-options-body" >
                                {
                                    schema.oneOf.map((option, idx) => (
                                        <li className="app-schema-option-content" >
                                            <SchemaDisplay schemaId={ `${schemaId}_oneOf_${idx}`} schema={option} isChild={true} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}
