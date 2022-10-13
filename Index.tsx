import React, { useCallback, useEffect, useState } from "react";
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
  useGetDataMutation,
} from "./src/pokemon";
export default function Index() {
  const [name, setName] = useState("");
  const [ini, setIniti] = useState(true);
  const [id, setid] = useState("");
  const [attendence, setattendence] = useState("");

  const names = {
    attendence: name,
  };

  const updates = useCallback(
    (index: any, namee: any) => {
      setName(namee);
      setid(index);
      setattendence(name);
      console.log("id:", index);
    },
    [name, id, attendence]
  );

  const [
    deleteData,
    { data: deldata, isLoading: delLoading, error: delerror },
  ] = useDeleteDataMutation();

  const [getData, { data: get, isLoading: getLoading, error: getError }] =
    useGetDataMutation();
  const [adaData, { data: adData, isLoading: adLoading, error: adError }] =
    useAdaDataMutation();
  const [updatedata, { data: updat, isLoading: upLoading, error: upError }] =
    useUpdatedataMutation();

  React.useEffect(() => {
    getData({});
  }, [deldata, adData, updat]);

  const handleaddata = useCallback(() => {
    adaData(names);
    setName("");
  }, [name]);

  const handleupdate = useCallback(() => {
    setIniti(true);
    updatedata({ id, attendence });
    console.log("update", id, attendence);
  }, [name, attendence, ini]);

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
              ini == true ? handleaddata() : handleupdate();
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
        {getError ? (
          <Text>There was an error</Text>
        ) : getLoading ? (
          <Text>Loading...</Text>
        ) : get ? (
          <FlatList
            data={get}
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
                          getData({});
                        }
                      : () => {
                          updates(item._id, item.attendence);
                          setIniti(false);

                          // handelset(item._id, item.attendence);
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
