import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import Button from "../Components/Button";
import TextInput from "../Components/TextInput";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Loading from "../Components/Loading";

const db = SQLite.openDatabase("banco.db");

interface RouteParamsType {
  registroId: number;
}

export default function CadastroViagem() {
  const navigation = useNavigation();
  const routeParams = useRoute().params as RouteParamsType;

  const [buscando, setBuscando] = useState(true);
  const [destino, setDestino] = useState("");
  const [quilometragem, setQuilometragem] = useState("");
  const [valor, setValor] = useState("");
  const [litros, setLitros] = useState("");
  const [registro, setRegistro] = useState<Viagem>({} as Viagem);

  useFocusEffect(() => {
    async function Init() {
      if (routeParams != null) {
        db.transaction((tx) => {
          tx.executeSql(
            `select * from viagem where id = ${routeParams.registroId};`,
            [],
            (_, { rows }) => {
              setRegistro((rows as any)._array[0]);

              if (registro.destino) setDestino(registro.destino);
              if (registro.litros) setLitros(`${registro.litros}`);
              if (registro.valor) setValor(registro.valor.toString());
              if (registro.quilometragem)
                setQuilometragem(registro.quilometragem.toString());

              setBuscando(false);
            }
          );
        });
      } else {
        setBuscando(false);
      }
    }

    Init();
  });

  async function SalvarViagem() {
    if (routeParams == null)
      db.transaction((tx) => {
        tx.executeSql(
          `insert into viagem (destino, quilometragem, valor, litros) values ('${destino}', '${quilometragem}', '${valor}', '${litros}')`
        );
      });
    else
      db.transaction((tx) => {
        tx.executeSql(
          `update viagem set destino = '${destino}', quilometragem = '${quilometragem}', valor = '${valor}', litros = '${litros}' where id = ?;`,
          [routeParams.registroId]
        );

        console.log(destino);
      });

    navigation.navigate("ListagemViagem");
  }

  return (
    <View style={styles.container}>
      {buscando ? (
        <Loading />
      ) : (
        <View>
          <TextInput
            label="Destino"
            returnKeyType="next"
            value={destino}
            onChangeText={(text: string) => setDestino(text)}
            autoCapitalize="none"
          />

          <TextInput
            label="Quilometragem"
            returnKeyType="next"
            value={quilometragem}
            onChangeText={(text: string) => setQuilometragem(text)}
            autoCapitalize="none"
          />

          <TextInput
            label="Valor por Litro"
            returnKeyType="next"
            value={valor}
            onChangeText={(text: string) => setValor(text)}
            autoCapitalize="none"
          />

          <TextInput
            label="Litros"
            returnKeyType="next"
            value={litros}
            onChangeText={(text: string) => setLitros(text)}
            autoCapitalize="none"
          />

          <Button
            mode="contained"
            onPress={() => SalvarViagem()}
            style={{ marginTop: 24 }}
          >
            Salvar
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
});
