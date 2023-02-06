import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { AreaHeaderWrapper } from './style';
interface IProps {
  children?: ReactNode;
  title: string;
  moreLink: string;
  linkList?: any[];
}
const AreaHeader: FC<IProps> = (props) => {
  const { title, moreLink, linkList } = props;
  return (
    <AreaHeaderWrapper className="sprite_02">
      <div className="left">
        <div className="title">{title}</div>
        <div className="keywords">
          {linkList?.map((item, index) => {
            return (
              <div className="item" key={index}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="right">
        <Link to={moreLink}>
          <span className="more">更多</span>
          <span className="icon sprite_02"></span>
        </Link>
      </div>
    </AreaHeaderWrapper>
  );
};
export default memo(AreaHeader);
