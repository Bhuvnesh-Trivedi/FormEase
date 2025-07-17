

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import "react-native-reanimated";


export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "orange",  // active tab color
        tabBarInactiveTintColor: "gray",  // inactive tab color
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Form",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: "Data",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}



