/**
 * @providesModule ExNavigationTabBar
 */

import React, { PropTypes } from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Text,
  View,
} from 'react-native';

import TabBadge from 'ExNavigationBadge';

export default class ExNavigationTabBar extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    renderTitleComponent: PropTypes.func,
    style: View.propTypes.style,
    tabItemContainerStyle: View.propTypes.style,
    badgeStyle: View.propTypes.style,
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={[styles.itemContainer, this.props.tabContainerStyle]}>
          {this.renderTabItems()}
        </View>
      </View>
    );
  }

  renderTabItems() {
    if (!this.props.items) {
      return null;
    }

    return this.props.items.map((item, index) => {
      let title = null;
      if (item.title) {
        title = <Text>{item.title}</Text>;
      }

      let { renderIcon } = item;
      let isSelected = this.props.selectedTab === item.id;

      const icon = renderIcon && renderIcon(isSelected);

      let badge = null;
      if (item.badgeText) {
        badge = (
          <TabBadge
            badgeTextStyle={this.props.badgeTextStyle}
            style={[styles.badge, this.props.badgeStyle]}>{item.badgeText}
          </TabBadge>
        );
      }

      if (item.showsTouches) {
        return (
          <TouchableNativeFeedback
            key={index}
            onPress={item.onPress}
            onLongPress={item.onPress}
            delayPressIn={0}
            style={[styles.tabItem, isSelected ? item.selectedStyle : item.style]}
            background={item.nativeFeedbackBackground}>
            {title}
            {icon}
            {badge}
          </TouchableNativeFeedback>
        );
      } else {
        return (
          <TouchableWithoutFeedback key={index} onPress={item.onPress}>
            <View style={[styles.tabItem, isSelected ? item.selectedStyle : item.style]}>
              {title}
              {icon}
              {badge}
            </View>
          </TouchableWithoutFeedback>
        );
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: '#fefefe',
    borderTopColor: '#b2b2b2',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  badge: {
    position: 'absolute',
    top: 3,
    right: 18,
    backgroundColor: 'black',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
