import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const Download: FC<IProps> = () => {
  return <div>Download</div>;
};
export default memo(Download);
