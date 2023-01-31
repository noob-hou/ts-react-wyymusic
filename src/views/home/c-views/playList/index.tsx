import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const PlayList: FC<IProps> = () => {
  return <div>PlayList</div>;
};
export default memo(PlayList);
