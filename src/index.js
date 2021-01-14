/**
 * react-native-parabolic
 * @author Lei
 * @repo https://github.com/stoneWeb/react-native-parabolic
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ViewPropTypes, Animated} from 'react-native';

export default class extends Component {
  static propTypes = {
    renderChildren: PropTypes.func,
    animateEnd: PropTypes.func,
    curvature: PropTypes.number,
    duration: PropTypes.number,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    curvature: 0.003,
    duration: 350,
    animateEnd: function () {},
    renderChildren: function () {},
  };
  constructor(props) {
    super(props);
    this.state = {
      animateBtnX: 0,
      animateBtnY: 0,
      runAnim: new Animated.Value(0),
    };
  }
  run(position = [], data = {}) {
    if (position.length !== 4) {
      return;
    }
    this.state.runAnim.setValue(0);
    const {inputRange, outputX, outputY} = this.getPaths(position);
    this.setState({
      animateBtnX: this.state.runAnim.interpolate({
        inputRange,
        outputRange: outputX,
      }),
      animateBtnY: this.state.runAnim.interpolate({
        inputRange,
        outputRange: outputY,
      }),
    });
    Animated.timing(this.state.runAnim, {
      toValue: inputRange.length,
      duration: this.props.duration,
      useNativeDriver: true,
    }).start(() => {
      this.props.animateEnd(data);
    });
  }
  getPaths(position) {
    const inputRange=[0, 1, 2, 3, 4, 5, 6]
    const outputX=[-44, -88, -132, -176, -220, -264, -300.46946742441236]
    const outputY=[-34.68190910006727, -34.51581820013455, 0.49827269979817856, 70.3603635997309, 175.07045449966358, 314.62854539959636, 456.7135904851068]
    return {inputRange, outputX, outputY};
  }
  render() {
    return (
      <Animated.View
        style={[
          this.props.style,
          {
            transform: [
              {translateX: this.state.animateBtnX},
              {translateY: this.state.animateBtnY},
            ],
          },
        ]}>
        {this.props.renderChildren()}
      </Animated.View>
    );
  }
}
