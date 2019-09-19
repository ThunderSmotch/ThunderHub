// Module imports
import * as React from 'react';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

// Style
const styleMenuButton = `
  text-align: center;
  width:100%;
  outline:0;
  height: 40px;
  line-height: 40px;
  &:hover {
    background-color: #535177!important;
    cursor: pointer;
  }
`;

const styleMenuButtonSelected = `
  box-sizing: border-box;
  border-right: 5px solid;
  border-color: #2fce37;
`;

const styleMenuButtonIcon = css`
  height: 32px;
  width: 32px;
  display:inline-block;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  vertical-align: middle;
  float: left;
  filter: invert(100%);
`;

const styleMenuButtonText = css`
  margin-left: 32px;
  color: white;
  height: 100%;
  text-align: left;
  line-height: 15px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
`;

// React Class for MenuButton
export default class MenuButton extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.id);
  }

  // Returns the div
  render() {
    let btnClass = styleMenuButton;

    if (this.props.id === this.props.page) {
      btnClass += styleMenuButtonSelected;
    }

    return (
      <div role="button" tabIndex={0} css={css`${btnClass}`} onClick={this.handleClick}>
        <img alt="Menu Button" src={this.props.icon} css={styleMenuButtonIcon} />
        <div css={styleMenuButtonText}>{this.props.name}</div>
      </div>
    );
  }

}

MenuButton.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.number,
  page: PropTypes.number,
  icon: PropTypes.string,
  name: PropTypes.string,
};

MenuButton.defaultProps = {
  onClick: () => {},
  id: 0,
  page: 0,
  icon: '',
  name: '',
};
