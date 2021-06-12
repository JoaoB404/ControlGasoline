import React from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import ListagemViagem from "../Pages/ListagemViagem";
import CadastroViagem from "../Pages/CadastroViagem";
import { NavigationContainer } from "@react-navigation/native";

const { Navigator, Screen } = createStackNavigator();

export default function AplicacaoRoutes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="ListagemViagem" component={ListagemViagem} options={{ title: 'Listagem de Viagens' }}/>
        <Screen name="CadastroViagem" component={CadastroViagem} options={{ title: 'Cadastro de Viagem' }}/>
      </Navigator>
    </NavigationContainer>
  );
}
