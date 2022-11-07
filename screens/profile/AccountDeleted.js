import { Text, TouchableOpacity, View } from "react-native";
import CustomScreen from "../../components/CustomScreen";
import Header from "../../components/Header";
import { COLORS } from "../../Theme";

const AccountDeleted = () => {
  return (
    <CustomScreen>
      <Header />
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 36,
            fontFamily: "Truculenta-Regular",
          }}
        >
          Account Deleted
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontFamily: "Truculenta-Regular",
            color: "#000000DE",
            paddingVertical: 30,
          }}
        >
          Cheers!
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            width: "80%",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontFamily: "Truculenta-Regular",
              color: "#fff",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <View  style={{flex: 0.6}}/>
      </View>
    </CustomScreen>
  );
};

export default AccountDeleted;


{/* <Entypo name="graduation-cap" size={24} color="black" /> */}
{/* <MaterialCommunityIcons name="cards" size={24} color="black" /> */}
{/* <MaterialCommunityIcons name="cards-outline" size={24} color="black" /> */}
{/* <FontAwesome5 name="user" size={24} color="black" /> */}