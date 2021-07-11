import React from 'react';
import PropTypes from 'prop-types';
import compose from '../../utils/compose';
import { withRouter } from '../Router';
import withAuthentication from '../withAuthentication';

class Guard extends React.Component {
  componentDidMount() {
    this.preCheck();
  }

  componentDidUpdate(prevProps) {
    const { authentication } = this.props;
    if (prevProps.authentication.initialized !== authentication.initialized) {
      this.preCheck();
    }
  }

  preCheck() {
    const { authentication, router } = this.props;

    if (!authentication.initialized) {
      return;
    }

    if (!authentication.user) {
      router.push('/');
    }
  }

  render() {
    const { authentication, children } = this.props;

    if (!authentication.user) {
      return null;
    }

    return children;
  }
}

Guard.propTypes = {
  authentication: PropTypes.shape({
    user: PropTypes.shape({}),
    initialized: PropTypes.bool,
  }).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

const EnhancedGuard = compose(
  withAuthentication,
  withRouter,
)(Guard);

export default EnhancedGuard;
