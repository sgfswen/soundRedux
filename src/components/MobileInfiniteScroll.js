import React, { Component, PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  scrollFunc: PropTypes.func.isRequired,
};

class MobileInfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.scroll.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    this.scroll.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    const el = this.scroll;
    if (el.scrollTop >= (el.scrollHeight - el.offsetHeight - 200)) {
      this.props.dispatch(this.props.scrollFunc());
    }
  }

  render() {
    return (
      <div className={this.props.className} ref={(ref) => { this.scroll = ref; }}>
        { this.props.children }
      </div>
    );
  }
}

MobileInfiniteScroll.propTypes = propTypes;

export default MobileInfiniteScroll;
