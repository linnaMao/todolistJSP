import React from 'react';
import styled from './index.scss';
import { Menu, message } from 'antd';
import { IconFont } from '../Iconfont';
import {  insertTitle } from '../../axios'

const { Item } = Menu;

class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: ''
    }
  }

  componentDidMount() {
   const { getTitle } = this.props
   getTitle()
  };

  // 菜单
  renderList = (data) => {
    const { handleTitleClick } = this.props

    return data.map((item) => {
      return (
        <Item onClick={() => handleTitleClick(item)} key={item.id}>
          <IconFont type={item.icon} />
          {item.titleName}
        </Item>
      )
    })
  };

  // 获取title值
  handleTitleChange = (e) => {
    this.setState({
      titleValue: e.target.value
    })
  }

  // 新增标题
  handleAddTitleEnter = (e) => {
    const { titleValue } = this.state
    const { getTitle } = this.props
    if (e.nativeEvent.keyCode === 13) {
      if (titleValue.trim().length === 0) {
        return message.error("标题不能为空~")
      }
      insertTitle(titleValue)
      this.setState({
        titleValue: ""
      })
      getTitle()
    }
  }

  render() {
    const { titleValue } = this.state
    const { navList } = this.props
    return (
      <div>
        <div className={styled.user}>
          <IconFont type="icon-account" className={styled.userImg} />
          <span className={styled.username}>毛丽真</span>
          <IconFont type="icon-glass" className={styled.search} />
        </div>
        <Menu defaultSelectedKeys="title15751991087990" theme="light">
          {this.renderList(navList)}
        </Menu>
        <div className={styled.addNewList}>
          <IconFont type="icon-hao-copy" />
          <input 
            type="text" 
            placeholder="新建清单"  
            value={titleValue}
            onChange={this.handleTitleChange}
            onKeyPress={this.handleAddTitleEnter}
          />
        </div>
      </div>
    )
  }
}

export default NavLeft