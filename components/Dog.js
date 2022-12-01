import { StyleSheet, Image } from 'react-native'
import React from 'react'

const Dog = () => {
  return (
   <Image source={require("../assets/ShakeUp.png")} resizeMode={"contain"} style={styles.img} />
  )
}

export default Dog

const styles = StyleSheet.create({
    img:{
        width: "100%",
        height: "100%",
        // position: "absolute",
        bottom: 0
    }
})