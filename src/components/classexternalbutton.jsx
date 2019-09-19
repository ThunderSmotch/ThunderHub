// Module imports
import * as React from 'react';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const shell = require('electron').shell;

// Style

const stylePageTitleButton = css`
  height: 100%;
  line-height: 100%;
  display:inline-flex;
  align-items: center;
  font-size: 18 px;
  float: left;
  margin-left: 64px;
  padding-left: 8px;
  padding-right: 8px;
  color:#848484;
  &:hover {
    background-color: #a5a5a5!important;
    color: white;
    cursor: pointer;
  }
`;

export default class ClassExternalButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    shell.openExternal(this.props.link);
  }

  render() {
    return (<div
      tabIndex={0}
      role="button"
      css={stylePageTitleButton}
      onClick={this.onClick}
    >{this.props.name}</div>);
  }
}

ClassExternalButton.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
};

ClassExternalButton.defaultProps = {
  name: '',
  link: '',
};
