import PageNotFound from './pages/pageNotFound';
import Home from './pages/home';
import Login from './pages/login';
import Meetings from './pages/meetings';
import Optimize from './pages/optimize';
import Meeting from './pages/meeting';
import Training from './pages/training';
import Loading from './pages/loading';
import Teams from './pages/teams';
import Team from './pages/team';
import Contacts from './pages/contacts';
import Settings from './pages/settings';
import ClientMeeting from './pages/client-meeting';

export const routes = [
  {
    path: '/home',
    component: Home,
  },
  { path: '/call/:id', component: ClientMeeting },
  { path: '/login', component: Login },
  { path: '/meetings', component: Meetings },
  { path: '/training/:id', component: Training },
  { path: '/meeting/:id', component: Meeting },
  { path: '/optimize/:id', component: Optimize },
  { path: '/loading/:id', component: Loading },
  { path: '/teams', component: Teams },
  { path: '/team/:teamId', component: Team },
  { path: '/contacts', component: Contacts },
  { path: '/settings', component: Settings },
  {
    path: '/*',
    component: PageNotFound,
  },
];
