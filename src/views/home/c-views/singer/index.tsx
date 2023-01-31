import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const Singer: FC<IProps> = () => {
  return <div>Singer</div>;
};
export default memo(Singer);
