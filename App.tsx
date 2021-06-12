import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import Listagem from "./Pages/ListagemViagem";
import AplicacaoRoutes from "./Routes/route";

interface Viagem {
  id: number;
  quilometragem: number;
  valor: number;
  litros: number;
}

const db = SQLite.openDatabase("banco.db");

db.transaction((tx) => {
  tx.executeSql(
    "create table if not exists viagem (id integer primary key not null, destino text, quilometragem real, valor real, litros real);"
  );
});

export default function App() {
  return AplicacaoRoutes();
}
