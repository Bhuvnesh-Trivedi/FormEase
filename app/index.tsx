// import { Picker } from "@react-native-picker/picker";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const STATES = [
//   // ✅ States
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttar Pradesh",
//   "Uttarakhand",
//   "West Bengal",

//   // ✅ Union Territories
//   "Andaman and Nicobar Islands",
//   "Chandigarh",
//   "Dadra and Nagar Haveli and Daman and Diu",
//   "Delhi",
//   "Jammu and Kashmir",
//   "Ladakh",
//   "Lakshadweep",
//   "Puducherry"
// ];

// export default function FormPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState(STATES[0]);
//   const [mobile, setMobile] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = () => {
//     if (!name || !age || !city || !mobile) {
//       alert("⚠️ Please fill all required fields!");
//       return;
//     }

//     // Pass data as JSON string in query params
//     const newRecord = {
//     id: Date.now(), // unique id
//     name,
//     age,
//     gender,
//     city,
//     state,
//     mobile,
//     description,
//   };

//     router.replace({
//       pathname: "/data",
//       params: {  newRecord: JSON.stringify(newRecord) },
//     });

//     alert("✅ Form submitted! Check Data Tab.");
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
//     <ScrollView style={styles.container}>
//       <Text style={styles.heading}>User Information Form</Text>

//       <Text style={styles.label}>Name</Text>
//       <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter name" />

//       <Text style={styles.label}>Age</Text>
//       <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Enter age" keyboardType="numeric" />

//       <Text style={styles.label}>Gender</Text>
//       <View style={styles.radioGroup}>
//         {["Male", "Female", "Other"].map((g) => (
//           <TouchableOpacity
//             key={g}
//             style={[styles.radioOption, gender === g && styles.radioSelected]}
//             onPress={() => setGender(g)}
//           >
//             <Text style={{ color: gender === g ? "white" : "#333" }}>{g}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Text style={styles.label}>City</Text>
//       <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="Enter city" />

//       <Text style={styles.label}>State</Text>
//       <View style={styles.pickerWrapper}>
//         <Picker selectedValue={state} onValueChange={setState}>
//           {STATES.map((s) => (
//             <Picker.Item key={s} label={s} value={s} />
//           ))}
//         </Picker>
//       </View>

//       <Text style={styles.label}>Mobile</Text>
//       <TextInput
//         style={styles.input}
//         value={mobile}
//         onChangeText={(t) => setMobile(t.replace(/[^0-9]/g, ""))}
//         placeholder="Enter mobile number"
//         keyboardType="phone-pad"
//       />

//       <Text style={styles.label}>Description</Text>
//       <TextInput
//         style={[styles.input, { height: 80 }]}
//         value={description}
//         onChangeText={setDescription}
//         placeholder="Enter description"
//         multiline
//       />

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitText}>Submit</Text>
//       </TouchableOpacity>
//     </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f8f9fa", padding: 16 },
//   heading: { fontSize: 22, fontWeight: "bold", color: "#1E88E5", textAlign: "center", marginBottom: 20 },
//   label: { fontSize: 16, fontWeight: "600", marginVertical: 8, color: "#333" },
//   input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, backgroundColor: "white" },
//   radioGroup: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
//   radioOption: { flex: 1, marginHorizontal: 5, padding: 10, borderRadius: 8, backgroundColor: "#e0e0e0", alignItems: "center" },
//   radioSelected: { backgroundColor: "#1E88E5" },
//   pickerWrapper: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, backgroundColor: "white" },
//   submitButton: { backgroundColor: "#1E88E5", padding: 15, borderRadius: 8, marginTop: 20, alignItems: "center" },
//   submitText: { color: "white", fontWeight: "bold", fontSize: 16 },
// });





import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

export default function FormPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [city, setCity] = useState("");
  const [state, setState] = useState(STATES[0]);
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");

  // ✅ NEW: Switch & Checkbox states
  const [enableNotifications, setEnableNotifications] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const handleSubmit = () => {
    // ✅ Validation
    if (!name || !age || !city || !mobile) {
      Alert.alert("⚠️ Missing Fields", "Please fill all required fields!");
      return;
    }
    if (!isChecked) {
      Alert.alert("⚠️ Terms Not Accepted", "Please agree to the terms before submitting.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      name,
      age,
      gender,
      city,
      state,
      mobile,
      description,
      enableNotifications, // ✅ include switch state
      agreedTerms: isChecked // ✅ include checkbox state
    };

    router.replace({
      pathname: "/data",
      params: { newRecord: JSON.stringify(newRecord) },
    });

    Alert.alert("✅ Form Submitted!", "Check the Data tab for details.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.heading}>User Information Form</Text>

        {/* ✅ Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
        />

        {/* ✅ Age */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Enter age"
          keyboardType="numeric"
        />

        {/* ✅ Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioGroup}>
          {["Male", "Female", "Other"].map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.radioOption, gender === g && styles.radioSelected]}
              onPress={() => setGender(g)}
            >
              <Text style={{ color: gender === g ? "white" : "#333" }}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ✅ City */}
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter city"
        />

        {/* ✅ State */}
        <Text style={styles.label}>State</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={state} onValueChange={setState}>
            {STATES.map((s) => (
              <Picker.Item key={s} label={s} value={s} />
            ))}
          </Picker>
        </View>

        {/* ✅ Mobile */}
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={(t) => setMobile(t.replace(/[^0-9]/g, ""))}
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
        />

        {/* ✅ Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
        />

        {/* ✅ SWITCH for Notifications */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Notifications?</Text>
          <Switch
            value={enableNotifications}
            onValueChange={setEnableNotifications}
            thumbColor={enableNotifications ? "#1E88E5" : "#ccc"}
          />
        </View>

        {/* ✅ CHECKBOX for Terms */}
        <View style={styles.checkboxContainer}>
          <Checkbox value={isChecked} onValueChange={setChecked} />
          <Text style={{ marginLeft: 8 }}>
             I agree to the terms & conditions
          </Text>
        </View>

        {/* ✅ Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 16 },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E88E5",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "white",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  radioOption: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  radioSelected: { backgroundColor: "#1E88E5" },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "white",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  switchLabel: { fontSize: 16, fontWeight: "600", color: "#333" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: "#1E88E5",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
