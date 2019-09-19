// Module imports
import * as React from 'react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import FileContainer from '../components/filecontainer';
import ClassExternalButton from '../components/classexternalbutton';

const path = require('path');
const { readdirSync, lstatSync } = require('fs');

const stylePage = css`
  margin-left:200px;
  position: fixed;
  width: calc(100% - 200px);
  height: 100%;
`;

const stylePageBody = css`
  width: 100%;
  height: calc(100% - 80px);
  display: inline-block;
`;
const stylePageTitle = css`
  width:100%;
  height: 80px;
  line-height: 80px;
  background-color: #e2e2e2;
  cursor: default;
  box-shadow: 0 2px 0 #cecece;
`;
const stylePageTitleIcon = css`
  height: 48px;
  width: 48px;
  display:inline-block;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  vertical-align: middle;
  float: left;
`;
const stylePageTitleText = css`
  color: black;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content:flex-start;
  font-size: 25px;
  float: left;
`;

// TODO put this on a settings menu of some sort
const documentsPath = 'D:\\Carlos\\Documents\\';
// const documentsPath = '/media/carlos/Data/Carlos/Documents/';

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

export default class ClassPage extends React.Component {

  render() {
    const linkBtns = [];
    let keyid = 0;

    // Add links to top of page
    if (this.props.links) {
      this.props.links.forEach((link) => {
        linkBtns.push(<ClassExternalButton
          key={keyid++}
          link={link.url}
          name={link.name}
        />,
        );
      });
    }

    // Add the FileContainers according to the number of folders
    const fconts = []; // Divs storage array
    const paths = path.join(documentsPath, 'ThunderHub', this.props.name);

    // Get folders inside this dir
    const folders = getDirectories(paths);
    let id = 0;

    // TODO Windows needs a final \\

    folders.forEach((folder) => {
      const folderName = path.basename(folder);
      fconts.push(<FileContainer name={folderName} path={path.join(paths, folderName)} key={id++} />);
    });

    return (
      <div css={stylePage}>
        <div css={stylePageTitle}>
          <img alt="Page Icon" src={path.join('img/subjects', this.props.icon)} css={stylePageTitleIcon} />
          <div css={stylePageTitleText}>{this.props.name}</div>
          {linkBtns}
        </div>
        <div css={stylePageBody}>
          {fconts}
        </div>
      </div>
    );
  }
}
