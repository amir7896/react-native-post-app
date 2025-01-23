import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Posts from './screens/posts/post';

function App(): React.ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        <Posts />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});

export default App;
