import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const Friend: FC<IProps> = () => {
  return <div>Friend</div>;
};
export default memo(Friend);
