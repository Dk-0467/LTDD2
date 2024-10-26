import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const DetailsScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
    <Text style={{fontSize:50}}>DetailsScreen</Text>
    <Button title="Go to Home"onPress={() => navigation.navigate('Home')}/>
        <Button title="Go to Signin"onPress={() => navigation.navigate('Signin')}/>
        <Button title="Go back" onPress={() => navigation.goBack()} />
  </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({ 
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#08487c',
    },
})