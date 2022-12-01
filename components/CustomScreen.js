import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS } from '../Theme'

const CustomScreen = ({children}) => {
  return (
    <SafeAreaView style={styles.main}>
      {children}
    </SafeAreaView>
  )
}

export default CustomScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
        position: "relative"
    }
})