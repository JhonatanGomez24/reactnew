export default {
  items: [
    {
      id: 'navigation',
      title: 'General',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dashboard/default',
          icon: 'feather icon-home',
        },
        {
          id: 'facility',
          title: 'Sucursales',
          type: 'item',
          url: '/facility',
          icon: 'feather icon-folder',
        },
        {
          id: 'delivery',
          title: 'Entregas',
          type: 'item',
          url: '/delivery',
          icon: 'feather icon-globe',
        },
      ],
    },
  ],
};
