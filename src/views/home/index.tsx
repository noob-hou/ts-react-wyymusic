import { FC, ReactNode, Suspense } from 'react';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
interface IProps {
  children?: ReactNode;
}
const Home: FC<IProps> = () => {
  return (
    <div>
      Home
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  );
};
export default memo(Home);
