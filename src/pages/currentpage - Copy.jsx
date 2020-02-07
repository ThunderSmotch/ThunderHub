import * as React from 'react';
import PropTypes from 'prop-types';

import { dataSubjects } from '../data.js';

import HomePage from './home';
import EmailPage from './email';
import CalendarPage from './calendar';
import ClassPage from './classpage';

export default class CurrentPage extends React.Component {

  render() {
      // Set Default page as homepage
    let curPage = <HomePage />;

    const sub = dataSubjects[0].subjects;

    // Select current page
    const cp = this.props.page;

    if (cp === 0) {
      curPage = <HomePage />;
    } else if (cp === 1) {
      curPage = <EmailPage />;
    } else if (cp === 2) {
      curPage = <CalendarPage />;
    } else if (cp > 3) {
      curPage = (<ClassPage
        name={sub[cp - 4].name}
        icon={sub[cp - 4].icon}
        links={sub[cp - 4].links}
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
