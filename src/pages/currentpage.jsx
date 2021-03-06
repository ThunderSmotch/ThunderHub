import * as React from 'react';
import PropTypes from 'prop-types';

import { dataSubjects } from '../data.js';

import HomePage from './home';
import EmailPage from './email';
import CalendarPage from './calendar';
import ClassPage from './classpage';
import SpotifyPage from './spotify';
import NotepadPage from './notepad';

export default class CurrentPage extends React.Component {

  render() {
      // Set Default page as homepage
    let curPage = <HomePage />;

    const sub = dataSubjects[0].subjects;

    // Select current page
    const cp = this.props.page;
	console.log(cp);
    if (cp === 0) {
      curPage = <HomePage />;
    } else if (cp === 1) {
      curPage = <EmailPage />;
    } else if (cp === 2) {
      curPage = <CalendarPage />;
    } else if (cp === 3) {
      curPage = <SpotifyPage />;
    } else if (cp === 4) {
      curPage = <NotepadPage />;
    }
	else if (cp > 6) {
      curPage = (<ClassPage
        name={sub[cp - 7].name}
        icon={sub[cp - 7].icon}
        links={sub[cp - 7].links}
      />);
    } else {
      curPage = <HomePage />;
    }

    return curPage;
  }
}

CurrentPage.propTypes = {
  page: PropTypes.number,
};

CurrentPage.defaultProps = {
  page: 0,
};
