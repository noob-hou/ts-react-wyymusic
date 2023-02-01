import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const AppFooter: FC<IProps> = () => {
  return <div>AppFooter</div>;
};
export default memo(AppFooter);
