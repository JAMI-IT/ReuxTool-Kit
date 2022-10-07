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
  useGetDataMutation,
} from "./src/pokemon";
export default function Index() {
  const [name, setName] = useState("");
  const [ini, setIniti] = useState();
  const names = {
    attendence: name,
  };

  const { data, isLoading, error } = useGetPokemonByNameQuery<any>("bulbasaur");
  const [getData, { data: get, isLoading: getLoading, error: getError }] =
    useGetDataMutation();
  const [adaData, { data: adData, isLoading: adLoading, error: adError }] =
    useAdaDataMutation();

  React.useEffect(() => {
    getData({});
  }, [adData]);

  const addata = () => {
    adaData(names);
  };

  const handleDelete = (Index: any) => {
    setName(Index);
    setIniti(Index);
    console.log(Index);
  };

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
          onPress={() => addata()}
        >
          <Text>Add</Text>
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
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <View
                  style={{
                    flexDirection: "row",
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

                    {ini ? (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "white",
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
                    ) : null}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : null}
      </View>
      {/* <View
        style={{
          marginTop: 30,
          backgroundColor: "teal",
          height: "100%",
          width: "100%",
        }}
      >
        {getError ? (
          <Text>There was an error</Text>
        ) : getLoading ? (
          <Text>Loading...</Text>
        ) : get ? (
          <FlatList
            data={get}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Text style={{ borderWidth: 1, height: 50 }}>
                {item.attendence}
              </Text>
            )}
          />
        ) : null}
      </View> */}
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
