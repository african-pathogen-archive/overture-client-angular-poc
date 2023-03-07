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
import { Specimen } from './specimen';
import { Sample } from './sample';
import { JsonNode } from './jsonNode';


export interface SpecimenWithSamples { 
    donorId?: string;
    info?: JsonNode;
    samples?: Array<Sample>;
    specimen?: Specimen;
    specimenId?: string;
    specimenTissueSource?: string;
    specimenType?: string;
    submitterSpecimenId?: string;
    tumourNormalDesignation?: string;
}
