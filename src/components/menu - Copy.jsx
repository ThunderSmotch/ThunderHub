// Module imports
import * as React from 'react';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { categories } from '../data.js';
import MenuButton from './menubutton';
import MenuCategory from './menucategory';

// Style
const styleMenu = css`
  height: 100%;
  width: 200px;
  z-index:1;
  overflow:auto;
  position: fixed;
  /*background-color: #2a3f60; */
  background-color:  #EAFDED;
`;

const styleMenuTitle = css`
  width: 100%;
  color: black;
  /* color: white; */
  text-align: center;
  height: 80px;
  line-height: 80px;
  font-size: 30px;
  -webkit-app-region: dr;
  z-index:2;
  /*background-color: #2a3f60; */
  background-color:  #EAFDED;
  position: sticky!important;
  top: 0px;
`;

export default class Menu extends React.Component {

  // Gets the menu items
  getMenuItems() {
    let id = 0; // Key id of each child
    let btnid = 0; // Button id for changing page
    const menuitems = []; // Div storer

    // Create default menuitems
    menuitems.push(<div css={styleMenuTitle} className="sticky" key={id++}>
      <b>FocusKit</b>
    </div>);

    menuitems.push(<MenuButton
      page={this.props.page}
      onClick={this.props.onClick}
      icon="img/menu/home.png"
      name="Home"
      id={btnid++}
      key={id++}
    />);

    menuitems.push(<MenuButton
      page={this.props.page}
      onClick={this.props.onClick}
      icon="img/menu/mail.png"
      name="Email"
      id={btnid++}
      key={id++}
    />);

    menuitems.push(<MenuButton
      page={this.props.page}
      onClick={this.props.onClick}
      icon="img/menu/calendar.png"
      name="Calendar"
      id={btnid++}
      key={id++}
    />);

    menuitems.push(<hr key={id++} />);

    // Get the categories from data
    let catid = 0;
    categories.forEach((category) => {
      menuitems.push(<MenuCategory
        page={this.props.page}
        onClick={this.props.onClick}
        name={category}
        id={catid++}
        key={id++}
      />,
      );
    });

    return menuitems;
  }

  render() {
    return (
      <div css={styleMenu}>
        {this.getMenuItems()}
      </div>
    );
  }

}

Menu.propTypes = {
  onClick: PropTypes.func,
  page: PropTypes.number,
};

Menu.defaultProps = {
  onClick: () => {},
  page: 0,
};
