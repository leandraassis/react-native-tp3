/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/dashboard` | `/(tabs)/profile` | `/(tabs)\games` | `/..\components\table\Table` | `/..\interfaces\Game` | `/..\services\database` | `/_sitemap` | `/ctx` | `/dashboard` | `/forgot-password` | `/form` | `/login` | `/profile` | `/register` | `/settings` | `/useStorageState`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
