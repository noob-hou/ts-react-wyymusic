import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const Album: FC<IProps> = () => {
  return <div>album</div>;
};
export default memo(Album);
