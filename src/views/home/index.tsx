import { FC, ReactNode, Suspense } from 'react';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './c-cpns/nav-bar';
interface IProps {
  children?: ReactNode;
}
const Home: FC<IProps> = () => {
  return (
    <div>
      <NavBar />
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  );
};
export default memo(Home);
