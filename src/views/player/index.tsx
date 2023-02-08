import { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import { PlayerWrapper } from './style';

interface IProps {
  children?: ReactNode;
}
const Player: FC<IProps> = () => {
  return (
    <PlayerWrapper>
      <div className="content warp-v2"></div>
    </PlayerWrapper>
  );
};
export default memo(Player);
