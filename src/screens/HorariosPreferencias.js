// HorariosPreferencias.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const HorariosPreferencias = () => {
  const [informacoesPais, setInformacoesPais] = useState([]);
  const [novaInformacao, setNovaInformacao] = useState({ crianca: '', horario: '', preferencia: '' });

  const adicionarInformacaoPais = () => {
    // Implemente a lógica para adicionar novas informações dos pais à lista
    // Certifique-se de realizar a validação dos campos antes de adicionar
    // Adicione a informação usando setInformacoesPais([...informacoesPais, novaInformacao])
  };

  const editarInformacaoPais = (id) => {
    // Implemente a lógica para editar uma informação dos pais na lista
    // Atualize a informação usando setInformacoesPais([...informacoesPais])
  };

  const excluirInformacaoPais = (id) => {
    // Implemente a lógica para excluir uma informação dos pais da lista
    // Remova a informação usando setInformacoesPais(informacoesPais.filter(item => item.id !== id))
  };

  return (
    <View>
      {/* Formulário para adicionar nova informação dos pais */}
      <View>
        <Text>Nova Informação dos Pais</Text>
        <TextInput
          placeholder="Nome da Criança"
          value={novaInformacao.crianca}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, crianca: text })}
        />
        <TextInputMask
          placeholder="Horário"
          type="datetime"
          options={{
            format: 'HH:mm',
          }}
          value={novaInformacao.horario}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, horario: text })}
        />
        <TextInput
          placeholder="Preferência"
          value={novaInformacao.preferencia}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, preferencia: text })}
        />
        <TouchableOpacity onPress={adicionarInformacaoPais}>
          <Text>Adicionar Informação dos Pais</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de informações dos pais cadastradas */}
      <View>
        <Text>Lista de Informações dos Pais</Text>
        <FlatList
          data={informacoesPais}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.crianca}</Text>
              <Text>{item.horario}</Text>
              <Text>{item.preferencia}</Text>
              <TouchableOpacity onPress={() => editarInformacaoPais(item.id)}>
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirInformacaoPais(item.id)}>
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HorariosPreferencias;
