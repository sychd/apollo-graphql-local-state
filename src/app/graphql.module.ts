import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';

const uri = 'https://metaphysics-production.artsy.net/';

export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri });

  return {
    link: http,
    cache: new InMemoryCache(),
    connectToDevTools: !environment.production
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
