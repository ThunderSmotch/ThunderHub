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
export default class PhotoshopPage extends React.Component {
  render() {
    return (
      <div css={stylePage}>
        <webview src="https://open.spotify.com/" />
      </div>
    );
  }
}
