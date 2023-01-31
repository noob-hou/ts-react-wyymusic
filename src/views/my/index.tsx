import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const My: FC<IProps> = () => {
  return <div>My</div>;
};
export default memo(My);
