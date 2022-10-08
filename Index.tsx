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
  useGetPokemonByNameQuery,
  useAdaDataMutation,
  useUpdatedataMutation,
  useGetDataMutation,
} from "./src/pokemon";
export default function Index() {
  const [name, setName] = useState("");
  const [ini, setIniti] = useState(0);
  const [id, setid] = useState();

  const names = {
    attendence: name,
  };

  const info = {
    ides: id,
    Attendence: name,
  };

  const [getData, { data: get, isLoading: getLoading, error: getError }] =
    useGetDataMutation();
  const [adaData, { data: adData, isLoading: adLoading, error: adError }] =
    useAdaDataMutation();
  const [updatedata, { data: updat, isLoading: upLoading, error: upError }] =
    useUpdatedataMutation();

  React.useEffect(() => {
    getData({});
  }, [adData]);

  const addata = () => {
    adaData(names);
  };
  const update = () => {
    updatedata(info);
    setIniti(0);
  };

  const handleDelete = (Index: any, atend: any) => {
    setid(Index);
    setName(atend);
    setIniti(1);
    console.log(Index);
  };
  console.log(info);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 40,
          height: 100,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "orange",
        }}
      >
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
        <TouchableOpacity
          style={{
            backgroundColor: "skyblue",
            marginTop: 20,
            width: 60,
            height: 30,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            ini == 0 ? addata() : update();
          }}
        >
          <Text>{ini ? "Update" : "Add"}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "teal", flex: 1, width: "100%" }}>
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
                  onPress={() => handleDelete(item._id, item.attendence)}
                >
                  {ini ? (
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
