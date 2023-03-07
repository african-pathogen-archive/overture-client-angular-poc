export * from './conversion.service';
import { ConversionService } from './conversion.service';
export * from './indexing.service';
import { IndexingService } from './indexing.service';
export * from './managementController.service';
import { ManagementControllerService } from './managementController.service';
export const APIS = [ConversionService, IndexingService, ManagementControllerService];
