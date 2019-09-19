import * as React from 'react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const stylePage = css`
  margin-left:200px;
  position: fixed;
  width: calc(100% - 200px);
  height: 100%;
`;

// eslint-disable-next-line
export default class HomePage extends React.Component {
  render() {
    return (
      <div css={stylePage}>
        <h1>Home Page</h1>
      </div>
    );
  }
}
