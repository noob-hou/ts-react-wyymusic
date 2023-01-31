import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const Musician: FC<IProps> = () => {
  return <div>musician</div>;
};
export default memo(Musician);
