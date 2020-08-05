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
          title: 'Facilities',
          type: 'item',
          url: '/facility',
          icon: 'feather icon-folder',
        },
        {
          id: 'channels',
          title: 'Canales',
          type: 'item',
          url: '/channels',
          icon: 'feather icon-folder',
        },
        {
          id: 'restaurants',
          title: 'Restaurantes',
          type: 'item',
          url: '/restaurants',
          icon: 'feather icon-folder',
        },
        {
          id: 'orders',
          title: 'Pedidos',
          type: 'item',
          url: '/orders',
          icon: 'feather icon-folder',
        },
        {
          id: 'historial',
          title: 'Historial',
          type: 'item',
          url: '/historial',
          icon: 'feather icon-folder',
        },
      ],
    },
  ],
};