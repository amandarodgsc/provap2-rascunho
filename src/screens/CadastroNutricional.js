import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const CadastroNutricional = () => {
  const [informacoesNutricionais, setInformacoesNutricionais] = useState([]);
  const [novaInformacao, setNovaInformacao] = useState({ id: Date.now(), crianca: '', peso: '', altura: '' });

  const adicionarInformacaoNutricional = () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!novaInformacao.crianca || !novaInformacao.peso || !novaInformacao.altura) {
      // Exibe uma mensagem de erro, caso algum campo esteja vazio
      return alert('Nome da Criança, Peso e Altura são campos obrigatórios.');
    }

    // Adiciona a nova informação nutricional à lista
    setInformacoesNutricionais([...informacoesNutricionais, novaInformacao]);

    // Limpa o formulário após adicionar a informação nutricional
    setNovaInformacao({ id: Date.now(), crianca: '', peso: '', altura: '' });
  };

  const editarInformacaoNutricional = (id) => {
    // Encontra a informação nutricional na lista com base no ID
    const informacaoParaEditar = informacoesNutricionais.find((item) => item.id === id);

    // Atualiza os estados do formulário com as informações para edição
    setNovaInformacao({
      id: informacaoParaEditar.id,
      crianca: informacaoParaEditar.crianca,
      peso: informacaoParaEditar.peso,
      altura: informacaoParaEditar.altura,
    });

    // Remove a informação nutricional da lista após ser selecionada para edição
    setInformacoesNutricionais(informacoesNutricionais.filter((item) => item.id !== id));
  };

  const excluirInformacaoNutricional = (id) => {
    // Remove a informação nutricional da lista com base no ID
    setInformacoesNutricionais(informacoesNutricionais.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro Nutricional</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Criança"
        value={novaInformacao.crianca}
        onChangeText={(text) => setNovaInformacao({ ...novaInformacao, crianca: text })}
      />
      <TextInputMask
        style={styles.input}
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
        style={styles.input}
        placeholder="Altura (cm)"
        type="only-numbers"
        value={novaInformacao.altura}
        onChangeText={(text) => setNovaInformacao({ ...novaInformacao, altura: text })}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarInformacaoNutricional}>
        <Text style={styles.buttonText}>Adicionar Informação Nutricional</Text>
      </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: 200,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CadastroNutricional;