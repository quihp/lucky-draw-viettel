// @flow

import * as React from 'react';
import './SiteWrapper.css';

class SiteWrapper extends React.Component {
  render() {
    return (
      <>
        <div className="container main-section">{this.props.children}</div>
      </>
    );
  }
}

export default SiteWrapper;
