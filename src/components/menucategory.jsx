// Module imports
import * as React from 'react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { dataSubjects } from '../data.js';
import MenuButton from './menubutton';

const { join } = require('path');

// Style
const styleMenuCategory = css`
  text-align: center;
  width:100%;
  outline:0;
  height: 40px;
  line-height: 40px;
  /* background-color: #0a2044!important; OG*/
  background-color:  #BBCABD!important;
  &:hover {
    background-color: #535577!important;
    cursor: pointer;
  }
`;

const styleMenuCategoryText = css`
  margin-left: 32px;
  color: black;
  /* color: white; */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  font-weight: bold;
`;

export default class MenuCategory extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      hidden: true,
    };
  }

  handleClick() {
    // Reveal children here
    if (this.state.hidden) {
      this.setState({ hidden: false });
    } else {
      this.setState({ hidden: true });
    }
  }

  // Returns the div
  render() {
    let id = 0; // Key id of each child
    const menuitems = []; // Where the subjects will be
    const subjects = dataSubjects[0].subjects;

    // Add subjects from this category if not hidden
    if (!this.state.hidden) {
      subjects.forEach((subject) => {
        if (subject.category === this.props.name || (!subject.category && this.props.name === 'Outros')) {
          // Add div
          menuitems.push(<MenuButton
            page={this.props.page}
            onClick={this.props.onClick}
            icon={join('img/subjects', subject.icon)}
            name={subject.name}
            id={subject.id}
            key={id++}
          />);
        }
      });
    }

    // Return final html
    return (
      <div>
        <div role="button" tabIndex={0} css={styleMenuCategory} onClick={this.handleClick}>
          <div css={styleMenuCategoryText}>{this.props.name}</div>
        </div>
        <div>
          {menuitems}
        </div>
      </div>
    );
  }
}
