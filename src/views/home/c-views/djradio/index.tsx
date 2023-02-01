import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const Djradio: FC<IProps> = () => {
  return <div>djradio</div>;
};
export default memo(Djradio);
