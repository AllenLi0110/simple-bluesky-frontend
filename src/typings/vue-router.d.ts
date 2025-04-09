export {};

import 'vue-router';

type Breadcrumb = {
  title: string;
  name: string;
  breadcrumbName?: boolean;
};

type PageAction = {
  type: 'create' | 'delete';
  toRouteName: string;
  actionContent: string;
};

declare module 'vue-router' {
  interface RouteMeta {
    authenticated?: boolean;
    title?: string;
    breadcrumbs?: Breadcrumb;
    pageAction?: PageAction;
  }
}
