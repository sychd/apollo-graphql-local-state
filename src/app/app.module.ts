import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArtistsPageComponent } from './artists-page/artists-page.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import {artistsInitialState} from './artists-page/state/artists.state';
import {ArtistsResolvers} from './artists-page/state/artists.resolvers';
import {Apollo} from 'apollo-angular';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsPageComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    AgGridModule.withComponents([]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo) {
    apollo.getClient().writeData({
      data: artistsInitialState
    });
    apollo.getClient().addResolvers(ArtistsResolvers);
  }
}
