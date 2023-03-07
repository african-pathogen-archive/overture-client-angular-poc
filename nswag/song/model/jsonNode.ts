/**
 * Song API
 * Song API reference for developers. SONG is an open source system for validating and tracking metadata about raw data submissions, assigning identifiers to entities of interest, and managing the state of the raw data with regards to publication and access
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface JsonNode { 
    array?: boolean;
    bigDecimal?: boolean;
    bigInteger?: boolean;
    binary?: boolean;
    _boolean?: boolean;
    containerNode?: boolean;
    _double?: boolean;
    _float?: boolean;
    floatingPointNumber?: boolean;
    _int?: boolean;
    integralNumber?: boolean;
    _long?: boolean;
    missingNode?: boolean;
    nodeType?: JsonNode.NodeTypeEnum;
    _null?: boolean;
    number?: boolean;
    object?: boolean;
    pojo?: boolean;
    _short?: boolean;
    textual?: boolean;
    valueNode?: boolean;
}
export namespace JsonNode {
    export type NodeTypeEnum = 'ARRAY' | 'BINARY' | 'BOOLEAN' | 'MISSING' | 'NULL' | 'NUMBER' | 'OBJECT' | 'POJO' | 'STRING';
    export const NodeTypeEnum = {
        Array: 'ARRAY' as NodeTypeEnum,
        Binary: 'BINARY' as NodeTypeEnum,
        Boolean: 'BOOLEAN' as NodeTypeEnum,
        Missing: 'MISSING' as NodeTypeEnum,
        Null: 'NULL' as NodeTypeEnum,
        Number: 'NUMBER' as NodeTypeEnum,
        Object: 'OBJECT' as NodeTypeEnum,
        Pojo: 'POJO' as NodeTypeEnum,
        String: 'STRING' as NodeTypeEnum
    };
}

