import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const Template: FC<IProps> = () => {
  return <div>template</div>;
};
export default memo(Template);
