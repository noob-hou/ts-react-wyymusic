import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
const Home = React.lazy(() => import('@/views/home'));

const Album = React.lazy(() => import('@/views/home/c-views/album'));
const PlayList = React.lazy(() => import('@/views/home/c-views/playList'));
const Ranking = React.lazy(() => import('@/views/home/c-views/ranking'));
const Singer = React.lazy(() => import('@/views/home/c-views/singer'));
const Recommend = React.lazy(() => import('@/views/home/c-views/recommend'));
const Djradio = React.lazy(() => import('@/views/home/c-views/djradio'));

const My = React.lazy(() => import('@/views/my'));
const Download = React.lazy(() => import('@/views/download'));
const Friend = React.lazy(() => import('@/views/friend'));
const Mall = React.lazy(() => import('@/views/mall'));
const Musician = React.lazy(() => import('@/views/musician'));
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '/home',
        element: <Navigate to="/home/recommend" />
      },
      {
        path: '/home/recommend',
        element: <Recommend />
      },
      {
        path: '/home/album',
        element: <Album />
      },
      {
        path: '/home/playList',
        element: <PlayList />
      },
      {
        path: '/home/ranking',
        element: <Ranking />
      },
      {
        path: '/home/singer',
        element: <Singer />
      },
      {
        path: '/home/djradio',
        element: <Djradio />
      }
    ]
  },
  {
    path: '/my',
    element: <My />
  },
  {
    path: '/download',
    element: <Download />
  },
  {
    path: '/friend',
    element: <Friend />
  },
  {
    path: '/mall',
    element: <Mall />
  },
  {
    path: '/musician',
    element: <Musician />
  }
];

export default routes;
