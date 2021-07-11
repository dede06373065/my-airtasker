import React from 'react';
import PropTypes from 'prop-types';
import RouterContext from './RouterContext';

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: window.location.pathname,
    };

    this.push = this.push.bind(this);
  }

  push(target) {
    this.setState({
      path: target,
    }, () => {
      window.history.pushState(undefined, undefined, target);
    });
  }

  render() {
    const { children } = this.props;
    const { path } = this.state;

    const value = {
      path,
      push: this.push,
      replace: this.replace,
    };

    return (
      <RouterContext.Provider value={value}>
        {children}
      </RouterContext.Provider>
    );
  }
}

Router.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Router;
