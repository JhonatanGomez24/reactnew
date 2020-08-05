import React from 'react';
import $ from 'jquery';
import ChannelsForm from './Views/Channels/Form';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

const UIBasicButton = React.lazy(() =>
  import('./Demo/UIElements/Basic/Button')
);
const UIBasicBadges = React.lazy(() =>
  import('./Demo/UIElements/Basic/Badges')
);
const UIBasicBreadcrumbPagination = React.lazy(() =>
  import('./Demo/UIElements/Basic/BreadcrumbPagination')
);

const UIBasicCollapse = React.lazy(() =>
  import('./Demo/UIElements/Basic/Collapse')
);
const UIBasicTabsPills = React.lazy(() =>
  import('./Demo/UIElements/Basic/TabsPills')
);
const UIBasicBasicTypography = React.lazy(() =>
  import('./Demo/UIElements/Basic/Typography')
);

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const Facility = React.lazy(() => import('./Views/Facilitys'));
const FacilityForm = React.lazy(() => import('./Views/Facilitys/facilityForm'));

const Channel = React.lazy(() => import('./Views/Channels'));
const ChannelForm = React.lazy(() => import('./Views/Channels/Form'));

const Restaurant = React.lazy(() => import('./Views/Restaurants/'));
const RestaurantForm = React.lazy(() => import('./Views/Restaurants/Form'));

const Orders = React.lazy(() => import('./Views/Orders/'));
const OrdersForm = React.lazy(() => import('./Views/Orders/Form'));

const Historial = React.lazy(() => import('./Views/Historial/'));
const HistorialForm = React.lazy(() => import('./Views/Historial/Form'));

const Temporal = React.lazy(() => import('./Views/Historial/temporal'));

const Rest = React.lazy(() => import('./Views/Historial/restaurant'));


const routes = [
  {
    path: '/dashboard/default',
    exact: true,
    name: 'Default',
    component: DashboardDefault,
  },
  {
    path: '/basic/button',
    exact: true,
    name: 'Basic Button',
    component: UIBasicButton,
  },
  {
    path: '/basic/badges',
    exact: true,
    name: 'Basic Badges',
    component: UIBasicBadges,
  },
  {
    path: '/basic/breadcrumb-paging',
    exact: true,
    name: 'Basic Breadcrumb Pagination',
    component: UIBasicBreadcrumbPagination,
  },
  {
    path: '/basic/collapse',
    exact: true,
    name: 'Basic Collapse',
    component: UIBasicCollapse,
  },
  {
    path: '/basic/tabs-pills',
    exact: true,
    name: 'Basic Tabs & Pills',
    component: UIBasicTabsPills,
  },
  {
    path: '/basic/typography',
    exact: true,
    name: 'Basic Typography',
    component: UIBasicBasicTypography,
  },
  {
    path: '/forms/form-basic',
    exact: true,
    name: 'Forms Elements',
    component: FormsElements,
  },
  {
    path: '/tables/bootstrap',
    exact: true,
    name: 'Bootstrap Table',
    component: BootstrapTable,
  },
  {
    path: '/charts/nvd3',
    exact: true,
    name: 'Nvd3 Chart',
    component: Nvd3Chart,
  },
  {
    path: '/maps/google-map',
    exact: true,
    name: 'Google Map',
    component: GoogleMap,
  },
  {
    path: '/sample-page',
    exact: true,
    name: 'Sample Page',
    component: OtherSamplePage,
  },
  { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
  {
    path: '/facility',
    exact: true,
    name: 'Facility',
    component: Facility,
  },
  {
    path: '/facility/:id',
    exact: true,
    name: 'FacilityForm',
    component: FacilityForm,
  },
  {
    path: '/channels',
    exact: true,
    name: 'Channels',
    component: Channel,
  },
  {
    path: '/channels/:id',
    exact: true,
    name: 'ChannelsForm',
    component: ChannelForm,
  },
  {
    path: '/restaurants',
    exact: true,
    name: 'Restaurants',
    component: Restaurant,
  },
  {
    path: '/restaurants/:id',
    exact: true,
    name: 'RestaurantsForm',
    component: RestaurantForm,
  },
  {
    path: '/orders',
    exact: true,
    name: 'Orders',
    component: Orders,
  },
  {
    path: '/orders/:id',
    exact: true,
    name: 'OrdersForm',
    component: OrdersForm,
  },
  {
    path: '/historial',
    exact: true,
    name: 'Historial',
    component: Historial,
  },
  {
    path: '/historial/:id',
    exact: true,
    name: 'HistorialForm',
    component: HistorialForm,
  },
  {
    path: '/temporal',
    exact: true,
    name: 'temporal',
    component: Temporal,
  },
  {
    path: '/restaurant',
    exact: true,
    name: 'rest',
    component: Rest,
  },
];

export default routes;