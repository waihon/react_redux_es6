import React, { Component, PropTypes } from 'react';

class LoadingDots extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { frame: 1 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        // frame is increated by 1 during every interval
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // This method will be called first before componentDidMount
  render() {
    // frame has an initial value of 1 nad will be incremented by 1
    // in compoinentDidMount for every interval.
    // Assuming dots is set to 20,
    // 1 % 21 = 1, 2 % 21 = 2, ... 20 % 21 = 20, 21 % 21 = 0, 22 % 21 = 1, ...
    let dots = this.state.frame % (this.props.dots + 1);
    let text = '';
    while (dots > 0) {
      text += '.';
      dots--;
    }
    return <span {...this.props}>{text}&nbsp;</span>;
  }
}

LoadingDots.defaultProps = {
  interval: 300,
  dots: 3
};

LoadingDots.propTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number
};

export default LoadingDots;
