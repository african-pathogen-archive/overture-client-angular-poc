import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AnalysisService } from './api/analysis.service';
import { DonorService } from './api/donor.service';
import { ExportService } from './api/export.service';
import { FileService } from './api/file.service';
import { HealthService } from './api/health.service';
import { LegacyEntityService } from './api/legacyEntity.service';
import { SampleService } from './api/sample.service';
import { SchemaService } from './api/schema.service';
import { SpecimenService } from './api/specimen.service';
import { StudyService } from './api/study.service';
import { SubmitService } from './api/submit.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
