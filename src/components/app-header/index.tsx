import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import titleList from '@/assets/data/header_titles.json';
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
interface IProps {
  children?: ReactNode;
}
interface ItemType {
  title: string;
  type: string;
  link: string;
  id: number;
}
const AppHeader: FC<IProps> = () => {
  function showItem(item: ItemType) {
    if (item.type === 'path') {
      return (
        <NavLink to={item.link}>
          <span>{item.title}</span>
          <i className="icon sprite_01"></i>
        </NavLink>
      );
    } else {
      return <a href={item.link}>{item.title}</a>;
    }
  }
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a href="/" className="logo sprite_01">
            网易云音乐
          </a>
          <div className="title-list">
            {titleList.map((item) => {
              return (
                <div className="item" key={item.id}>
                  {showItem(item)}
                </div>
              );
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input placeholder="音乐/视频/电台" className="search" prefix={<SearchOutlined />} />
          <span className="center">创作者中心</span>
          <span className="login">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  );
};
export default memo(AppHeader);
