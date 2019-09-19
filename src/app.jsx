// Module imports
import * as React from 'react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import Menu from './components/menu';
import CurrentPage from './pages/currentpage';

const styleFill = css`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 99;
`;

// eslint-disable-next-line
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { page: 0 };
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
  }

  handleMenuButtonClick(id) {
    this.setState({ page: id });
  }

  render() {
    return (
      <div css={styleFill} className="light-grey">
        <Menu onClick={this.handleMenuButtonClick} page={this.state.page} />
        <CurrentPage page={this.state.page} />
      </div>
    );
  }
}
