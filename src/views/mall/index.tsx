import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const Mall: FC<IProps> = () => {
  return <div>Mall</div>;
};
export default memo(Mall);
