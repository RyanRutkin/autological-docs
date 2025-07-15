export type JsonSchemaProperty = {
    type: string;
    format?: string;
    enum?: string[];
    const?: string;
    $ref?: string;
}

export type JsonSchema = {
    $id: string;
    $schema: string;
    title: string;
    description: string;
    type: string;
    properties: Record<string, JsonSchemaProperty>;
    required: string[];
    oneOf?: Partial<JsonSchema>[];
}

export type JsonSchemaDef = {
    schema_type: string;
    schema_type_version: number;
    schema: JsonSchema;
}

export type ValueOf<T> = T[keyof T];
