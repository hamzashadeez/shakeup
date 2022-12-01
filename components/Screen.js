import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS } from '../Theme'

const Screen = ({children}) => {
  return (
    <SafeAreaView style={styles.main}>
      {children}
    </SafeAreaView>
  )
}

export default Screen

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLORS.primary,
        position: "relative"
    }
})