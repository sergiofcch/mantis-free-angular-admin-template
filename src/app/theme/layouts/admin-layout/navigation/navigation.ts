export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Inicio',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Inicio',
        type: 'item',
        classes: 'nav-item',
        url: '/admin',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'authentication',
    title: 'Componentes',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'users',
        title: 'Usuarios',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/users',
        icon: 'profile',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'reportes',
        title: 'Reportes',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/reports',
        icon: 'question',
        target: true,
        breadcrumbs: false
      }
    ]
  }
  /*{
    id: 'utilities',
    title: 'UI Components',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'typography',
        title: 'Typography',
        type: 'item',
        classes: 'nav-item',
        url: '/typography',
        icon: 'font-size'
      },
      {
        id: 'color',
        title: 'Colors',
        type: 'item',
        classes: 'nav-item',
        url: '/color',
        icon: 'bg-colors'
      },
      {
        id: 'tabler',
        title: 'Tabler',
        type: 'item',
        classes: 'nav-item',
        url: 'https://ant.design/components/icon',
        icon: 'ant-design',
        target: true,
        external: true
      }
    ]
  },

  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/mantis-angular/',
        icon: 'question',
        target: true,
        external: true
      }
    ]
  }*/
];
