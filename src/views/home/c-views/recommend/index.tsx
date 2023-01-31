import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const Recommend: FC<IProps> = () => {
  return <div>Recommend</div>;
};
export default memo(Recommend);
