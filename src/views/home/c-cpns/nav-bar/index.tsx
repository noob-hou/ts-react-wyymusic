import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import { NavWrapper } from './style';
import { homeMenu } from '@/assets/data/local_data';
import { NavLink } from 'react-router-dom';
interface IProps {
  children?: ReactNode;
}
const Navbar: FC<IProps> = () => {
  return (
    <NavWrapper className="warp-v1">
      <div className="nav">
        {homeMenu.map((item) => {
          return (
            <div className="item" key={item.link}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          );
        })}
      </div>
    </NavWrapper>
  );
};
export default memo(Navbar);
