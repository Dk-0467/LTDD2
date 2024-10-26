import * as React from 'react';
import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FirstRoute from './profiletab/FirstRoute';
import SecondRoute from './profiletab/SecondRoute';

export default class Profile extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'User Profile' }, // Thay đổi tiêu đề tab cho phù hợp
      { key: 'second', title: 'Second' },
    ],
    userId: 1, // Giả sử bạn đã có userId ở đây, có thể là từ props hoặc state khác
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => <FirstRoute userId={this.state.userId} />, // Truyền userId cho FirstRoute
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
});
