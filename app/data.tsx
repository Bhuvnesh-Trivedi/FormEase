

import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as XLSX from "xlsx";

export default function DataPage() {
  const params = useLocalSearchParams();

  const [formList, setFormList] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);

  // ✅ When a new record comes from Form Tab
  useEffect(() => {
    if (params.newRecord) {
      try {
        const parsed = JSON.parse(params.newRecord as string);
        if (!formList.find((item) => item.id === parsed.id)) {
          setFormList((prev) => [...prev, parsed]);
        }
      } catch (e) {
        console.log("Invalid JSON params");
      }
    }
  }, [params.newRecord]);

  const handleDelete = (id: number) => {
    setFormList((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredList = useMemo(() => {
    return formList.filter((item) => {
      const genderMatch =
        selectedGender === "All" || item.gender === selectedGender;
      const stateMatch = selectedState === "All" || item.state === selectedState;
      return genderMatch && stateMatch;
    });
  }, [formList, selectedGender, selectedState]);

  const allStates = ["All", ...new Set(formList.map((d) => d.state))];
  const allGenders = ["All", "Male", "Female", "Other"];

  // ✅ Open Edit Modal
  const openEditModal = (record: any) => {
    setEditRecord({ ...record }); // clone to avoid direct mutation
    setEditModalVisible(true);
  };

  // ✅ Save changes
  const saveEdit = () => {
    setFormList((prev) =>
      prev.map((item) => (item.id === editRecord.id ? editRecord : item))
    );
    setEditModalVisible(false);
    setEditRecord(null);
  };

  // ✅ Cross-platform Excel download
  const downloadExcel = async () => {
    if (formList.length === 0) {
      alert("No records to export!");
      return;
    }

    try {
      // Convert JSON → Excel sheet
      const worksheet = XLSX.utils.json_to_sheet(formList);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Submitted Records");

      if (Platform.OS === "web") {
        // ✅ WEB → Blob & trigger browser download
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });

        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "submitted_records.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        // ✅ MOBILE → Save to file system & share
        const excelBase64 = XLSX.write(workbook, {
          type: "base64",
          bookType: "xlsx",
        });

        const fileUri = FileSystem.documentDirectory + "submitted_records.xlsx";

        await FileSystem.writeAsStringAsync(fileUri, excelBase64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(fileUri);
      }
    } catch (error) {
      console.error("Excel Export Error:", error);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
        <ScrollView style={styles.container}>
          {/* ✅ Heading + Download Button */}
          <View style={styles.headingRow}>
            <Text style={styles.heading}>Submitted Records</Text>
            <TouchableOpacity style={styles.downloadButton} onPress={downloadExcel}>
              <Ionicons name="download-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* ✅ Filter Section */}
          {formList.length > 0 && (
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Filter by State:</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={selectedState} onValueChange={setSelectedState}>
                  {allStates.map((s) => (
                    <Picker.Item key={s} label={s} value={s} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.filterTitle}>Filter by Gender:</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={selectedGender} onValueChange={setSelectedGender}>
                  {allGenders.map((g) => (
                    <Picker.Item key={g} label={g} value={g} />
                  ))}
                </Picker>
              </View>
            </View>
          )}

          {filteredList.length === 0 ? (
            <Text style={styles.noData}>
              {formList.length === 0
                ? "No data submitted yet."
                : "No records match your filters."}
            </Text>
          ) : (
            filteredList.map((data) => (
              <View key={data.id} style={styles.card}>
                <Text style={styles.item}>👤 Name: {data.name}</Text>
                <Text style={styles.item}>🎂 Age: {data.age}</Text>
                <Text style={styles.item}>🚻 Gender: {data.gender}</Text>
                <Text style={styles.item}>🏙️ City: {data.city}</Text>
                <Text style={styles.item}>🗺️ State: {data.state}</Text>
                <Text style={styles.item}>📱 Mobile: {data.mobile}</Text>
                <Text style={styles.item}>📝 Description: {data.description}</Text>

                {/* ✅ Edit + Delete Buttons in Row */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => openEditModal(data)}
                  >
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(data.id)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>

      {/* ✅ Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Edit Record</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editRecord?.name}
              onChangeText={(t) => setEditRecord((p: any) => ({ ...p, name: t }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Age"
              keyboardType="numeric"
              value={editRecord?.age?.toString()}
              onChangeText={(t) => setEditRecord((p: any) => ({ ...p, age: t }))}
            />

            {/* Gender Picker */}
            <Picker
              selectedValue={editRecord?.gender}
              onValueChange={(v) => setEditRecord((p: any) => ({ ...p, gender: v }))}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="City"
              value={editRecord?.city}
              onChangeText={(t) => setEditRecord((p: any) => ({ ...p, city: t }))}
            />

            {/* State Picker */}
            <Picker
              selectedValue={editRecord?.state}
              onValueChange={(value) =>
                setEditRecord((prev: any) => ({ ...prev, state: value }))
              }
            >
              <Picker.Item label="Select State" value="" />
              {[
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttar Pradesh",
                "Uttarakhand",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli and Daman and Diu",
                "Delhi",
                "Jammu and Kashmir",
                "Ladakh",
                "Lakshadweep",
                "Puducherry",
              ].map((state) => (
                <Picker.Item key={state} label={state} value={state} />
              ))}
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Mobile"
              keyboardType="numeric"
              value={editRecord?.mobile}
              onChangeText={(t) => setEditRecord((p: any) => ({ ...p, mobile: t }))}
            />

            <TextInput
              style={[styles.input, { height: 60 }]}
              placeholder="Description"
              multiline
              value={editRecord?.description}
              onChangeText={(t) =>
                setEditRecord((p: any) => ({ ...p, description: t }))
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 16 },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E88E5",
  },
  downloadButton: {
    backgroundColor: "#1E88E5",
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  filterSection: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  filterTitle: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fdfdfd",
  },
  noData: { fontSize: 16, color: "gray", textAlign: "center", marginTop: 20 },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  item: { fontSize: 16, marginBottom: 6, color: "#333" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  editButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    flex: 0.45,
    alignItems: "center",
  },
  editText: { color: "white", fontWeight: "bold" },
  deleteButton: {
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 8,
    flex: 0.45,
    alignItems: "center",
  },
  deleteText: { color: "white", fontWeight: "bold" },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: "90%",
    padding: 16,
    borderRadius: 12,
  },
  modalHeading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    flex: 0.45,
    alignItems: "center",
  },
  saveText: { color: "white", fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 8,
    flex: 0.45,
    alignItems: "center",
  },
  cancelText: { color: "white", fontWeight: "bold" },
});
