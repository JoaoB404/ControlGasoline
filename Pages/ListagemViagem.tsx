import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import Button from "../Components/Button";
import { DataTable } from "react-native-paper";

const db = SQLite.openDatabase("banco.db");
const optionsPerPage = [2, 3, 4];

export default function Listagem() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const navigation = useNavigation();
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  function Editar(registroId: number): void {
    navigation.navigate("CadastroViagem", {
      registroId,
    });
  }

  function Excluir(registroId: number): void {
    console.log("Excluindo");

    db.transaction((tx) => {
      tx.executeSql(`delete from viagem where id = ?;`, [registroId]);
      CarregarRegistros();
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      CarregarRegistros();
    }, [])
  );

  function CarregarRegistros(): void {
    db.transaction((tx) => {
      tx.executeSql("select * from viagem", [], (_, { rows }) => {
        setViagens((rows as any)._array);
      });
    });

    setPage(0);
  }

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Destino</DataTable.Title>
          <DataTable.Title numeric>Vl. Combustivel</DataTable.Title>
          <DataTable.Title numeric>KM</DataTable.Title>
          <DataTable.Title numeric>Vl. Por KM</DataTable.Title>
        </DataTable.Header>

        {viagens.length > 0 ? (
          viagens.map((item) => {
            var valorPorKM =
              (item.litros * parseFloat(item.valor as any)) /
              item.quilometragem;
            return (
              <DataTable.Row
                key={item.id}
                onPress={() => {
                  Editar(item.id);
                }}
                onLongPress={() => {
                  Excluir(item.id);
                }}
              >
                <DataTable.Cell>{item.destino}</DataTable.Cell>
                <DataTable.Cell numeric>R$ {item.valor.toFixed(2)}</DataTable.Cell>
                <DataTable.Cell numeric>{item.quilometragem.toFixed(2)}</DataTable.Cell>
                <DataTable.Cell numeric>R$ {valorPorKM.toFixed(2)}</DataTable.Cell>
              </DataTable.Row>
            );
          })
        ) : (
          <DataTable.Row>
            <DataTable.Cell>Nenhuma viagem foi encontrada</DataTable.Cell>
          </DataTable.Row>
        )}

        <DataTable.Pagination
          page={page}
          numberOfPages={25}
          onPageChange={(page) => setPage(page)}
          label={`25 de ${viagens.length}`}
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={"Rows per page"}
        />
      </DataTable>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("CadastroViagem")}
        style={{ marginTop: 24 }}
      >
        Cadastrar Nova Viagem
      </Button>
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
