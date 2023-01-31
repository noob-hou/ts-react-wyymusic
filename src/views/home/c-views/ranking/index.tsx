import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
interface IProps {
  children?: ReactNode;
}
const Ranking: FC<IProps> = () => {
  return <div>Ranking</div>;
};
export default memo(Ranking);
