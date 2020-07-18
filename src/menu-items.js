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
          title: 'Facilitys',
          type: 'item',
          url: '/facility',
          icon: 'feather icon-folder',
        },
      ],
    },
  ],
};
