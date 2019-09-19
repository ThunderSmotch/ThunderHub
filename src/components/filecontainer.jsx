// Module imports
import * as React from 'react';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import FileButton from './filebutton';

const path = require('path');
const { readdirSync, lstatSync } = require('fs');
const fs = require('fs');

// Style
const styleFileContainer = css`
  background-color: white;
  width: 48%;
  height: 48%;
  outline: 2px solid #e2e2e2;
  margin-left: 1%;
  margin-top: 1%;
  overflow: hidden;
  display: inline-block;
`;

const styleFileContainerTitle = css`
  color: #2a3f60;
  width: 90%;
  height: 40px;
  border-bottom: 1px solid #b7b7b7;
  margin-left: 5%;
  font-size: 20px;
  display:flex;
  align-items: center;
`;

const styleFileContainerBody = css`
  overflow: auto;
  height: calc(99% - 40px);
`;

const styleFileSeparator = css`
  height: 40px;
  width: 90%;
  margin-left: 5%;
  display: flex;
  align-items: center;
  vertical-align: middle;
  color: #2a3f60;
`;

const isPDF = file => (file.slice(-4) === '.pdf');
const isDJVU = file => (file.slice(-5) === '.djvu');
const isTEX = file => (file.slice(-4) === '.tex');
const isPDFTEX = file => (isPDF(file) || isTEX(file) || isDJVU(file));

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

export default class FileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.getFiles = this.getFiles.bind(this);
  }

  // Gets all the pdf and tex divs in dir
  static getFileDivs(dir, keyID) {
    const files = []; // Where files will be stored
    let pdfprop; // pdf path if it exists
    let texprop; // same for tex

    const getFilenames = readdirSync(dir)
    .filter(isPDFTEX)
    .map(name => name.slice(0, name.lastIndexOf('.')))
    .filter((elem, index, self) => index === self.indexOf(elem));

    if (!getFilenames) {
      return null;
    }

    const keys = Object.keys(getFilenames); // Get array

    keys.forEach((key) => {
      const pdfpath = path.join(dir, (`${getFilenames[key]}.pdf`));
      const texpath = path.join(dir, (`${getFilenames[key]}.tex`));
      const djvupath = path.join(dir, (`${getFilenames[key]}.djvu`));
      if (fs.existsSync(pdfpath)) { pdfprop = pdfpath; }
      if (fs.existsSync(djvupath)) { pdfprop = djvupath; }
      if (fs.existsSync(texpath)) { texprop = texpath; }
      files.push(<FileButton
        key={keyID.id++}
        name={getFilenames[key]}
        pdf={pdfprop}
        tex={texprop}
      />);
    });

    return files;
  }

  getFiles() {
    const dir = this.props.path; // Path to search for files & folders
    if (!fs.existsSync(dir)) {
      return null;
    }
    const key = { id: 0 };
    let divs = []; // Divs storage array

    // Add files without folder first
    divs = divs.concat(FileContainer.getFileDivs(dir, key));

    // Get folders inside this dir
    const folders = getDirectories(dir);

    // For each folder we will search for files
    folders.forEach((folder) => {
      const folderName = path.basename(folder);
      divs.push(<div css={styleFileSeparator} key={key.id++}>{folderName}</div>);

      const divsAux = FileContainer.getFileDivs(path.join(dir, folderName), key);
      divs = divs.concat(divsAux);
    });

    return divs;
  }

  render() {
    return (
      <div css={styleFileContainer}>
        <div css={styleFileContainerTitle}>{this.props.name}</div>
        <div css={styleFileContainerBody}>
          {this.getFiles()}
        </div>
      </div>
    );
  }

}

FileContainer.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
};

FileContainer.defaultProps = {
  name: '',
  path: '',
};
