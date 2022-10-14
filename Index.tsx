import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  useAdaDataMutation,
  useUpdatedataMutation,
  useDeleteDataMutation,
  useGetDataQuery,
} from "./src/pokemon";
export default function Index() {
  const [name, setName] = useState("");
  const [ini, setIniti] = useState(true);
  const [id, setid] = useState("");
  const [attendence, setattendence] = useState("");

  const names = {
    attendence: name,
  };
  const user = {
    ids: id,
    attendences: name,
  };

  const updates = useCallback(
    (index: any, namee: any) => {
      setName(namee);
      setid(index);
      setattendence(name);
    },
    [name, id, attendence]
  );

  const { data, isLoading, error, isFetching, refetch } =
    useGetDataQuery("data");

  const [deleteData] = useDeleteDataMutation();
  const [adaData] = useAdaDataMutation();
  const [updatedata] = useUpdatedataMutation();

  const handleaddata = useCallback(() => {
    adaData(names);
    setName("");
  }, [name]);

  const handleupdate = useCallback(
    (user: any) => {
      setIniti(true);
      console.log("user ----:", user);

      updatedata(user);
      console.log("update", id, attendence);
    },
    [name, attendence, ini]
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 20,
          height: 100,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "skyblue",
        }}
      >
        <Text style={{ color: "red", alignSelf: "flex-start", marginLeft: 35 }}>
          Enter THe Attendence
        </Text>
        <TextInput
          style={{
            width: "80%",
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "white",
            padding: 5,
          }}
          value={name}
          onChangeText={setName}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "lightblue",
              marginTop: 10,
              width: 60,
              height: 30,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              ini == true ? handleaddata() : handleupdate(user);
            }}
          >
            <Text>{ini == false ? "Update" : "Add"}</Text>
          </TouchableOpacity>
          {ini == false ? (
            <TouchableOpacity
              style={{
                backgroundColor: "lightblue",
                marginTop: 10,
                width: 60,
                height: 30,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setIniti(true);
              }}
            >
              <Text>canccel</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={{ backgroundColor: "aqua", flex: 1, width: "100%" }}>
        {error ? (
          <Text>There was an error</Text>
        ) : isLoading ? (
          <Text>Loading...</Text>
        ) : data ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    height: 50,
                    width: "100%",
                  }}
                >
                  {item.attendence}
                </Text>
                <TouchableOpacity
                  onPress={
                    ini == false
                      ? () => {
                          deleteData({ id });
                          setIniti(true);
                          refetch();
                        }
                      : () => {
                          updates(item._id, item.attendence);
                          setIniti(false);
                        }
                  }
                >
                  {ini == false ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        position: "absolute",
                        top: 3,
                        right: 0,
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="delete-restore"
                        size={24}
                        color="seegreen"
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        position: "absolute",
                        top: 3,
                        right: 0,
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="select"
                        size={24}
                        color="black"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
