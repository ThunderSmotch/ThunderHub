// Module imports
import * as React from 'react';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const shell = require('electron').shell;


// Style
const styleFileButtonIcon = css`
  float: left;
  display: inline;
  height: 24px;
  width: 24px;
  margin-left: 8px;
  margin-top: 8px;
`;

const styleFileButtonText = css`
  color: black;
  display: inline-flex;
  align-items: center;
  float: left;
  height: 100%;
  text-height: 100%;
  padding-left: 16px;
`;

const styleFileButton = css`
  height: 40px;
  width: 90%;
  margin-left: 5%;
  vertical-align: middle;
`;

// Represents a button with filename and PDF/TEX buttons
export default class FileButton extends React.Component {
  constructor(props) {
    super(props);
    this.pdfClick = this.pdfClick.bind(this);
    this.texClick = this.texClick.bind(this);
  }

  // When clicking on a PDF-like file
  pdfClick() {
    shell.openItem(this.props.pdf);
  }

  // When clicking on a TEX file
  texClick() {
    shell.showItemInFolder(this.props.tex);
  }

  render() {
    const icons = []; // Array for file icons

    if (this.props.pdf) {
      icons.push(<div key={1} role="button" tabIndex={0} onClick={this.pdfClick}>
        <img
          alt="PDF Button"
          src="img/pdf.png"
          css={styleFileButtonIcon}
        />
      </div>);
    }

    if (this.props.tex) {
      icons.push(<div key={2} role="button" tabIndex={0} onClick={this.texClick}>
        <img
          alt="Tex Button"
          src="img/tex.png"
          css={styleFileButtonIcon}
        />
      </div>);
    }

    return (
      <div css={styleFileButton}>
        <div css={styleFileButtonText}>{this.props.name}</div>
        {icons}
      </div>
    );
  }
}

// Properties

FileButton.propTypes = {
  pdf: PropTypes.string,
  tex: PropTypes.string,
  name: PropTypes.string,
};

FileButton.defaultProps = {
  pdf: '',
  tex: '',
  name: '',
};
