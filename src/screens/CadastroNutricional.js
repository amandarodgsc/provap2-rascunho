// CadastroNutricional.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const CadastroNutricional = () => {
  const [informacoesNutricionais, setInformacoesNutricionais] = useState([]);
  const [novaInformacao, setNovaInformacao] = useState({ crianca: '', peso: '', altura: '' });

  const adicionarInformacaoNutricional = () => {
    // Implemente a lógica para adicionar novas informações nutricionais à lista
    // Certifique-se de realizar a validação dos campos antes de adicionar
    // Adicione a informação usando setInformacoesNutricionais([...informacoesNutricionais, novaInformacao])
  };

  const editarInformacaoNutricional = (id) => {
    // Implemente a lógica para editar uma informação nutricional na lista
    // Atualize a informação usando setInformacoesNutricionais([...informacoesNutricionais])
  };

  const excluirInformacaoNutricional = (id) => {
    // Implemente a lógica para excluir uma informação nutricional da lista
    // Remova a informação usando setInformacoesNutricionais(informacoesNutricionais.filter(item => item.id !== id))
  };

  return (
    <View>
      {/* Formulário para adicionar nova informação nutricional */}
      <View>
        <Text>Nova Informação Nutricional</Text>
        <TextInput
          placeholder="Nome da Criança"
          value={novaInformacao.crianca}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, crianca: text })}
        />
        <TextInputMask
          placeholder="Peso (kg)"
          type="money"
          options={{
            precision: 3,
            separator: ',',
            delimiter: '.',
            unit: '',
            suffixUnit: ''
          }}
          value={novaInformacao.peso}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, peso: text })}
        />
        <TextInputMask
          placeholder="Altura (cm)"
          type="only-numbers"
          value={novaInformacao.altura}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, altura: text })}
        />
        <TouchableOpacity onPress={adicionarInformacaoNutricional}>
          <Text>Adicionar Informação Nutricional</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de informações nutricionais cadastradas */}
      <View>
        <Text>Lista de Informações Nutricionais</Text>
        <FlatList
          data={informacoesNutricionais}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.crianca}</Text>
              <Text>{item.peso} kg</Text>
              <Text>{item.altura} cm</Text>
              <TouchableOpacity onPress={() => editarInformacaoNutricional(item.id)}>
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirInformacaoNutricional(item.id)}>
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CadastroNutricional;
