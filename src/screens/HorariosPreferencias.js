import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const HorariosPreferencias = () => {
  const [informacoesPais, setInformacoesPais] = useState([]);
  const [novaInformacao, setNovaInformacao] = useState({ id: Date.now(), crianca: '', horario: '', preferencia: '' });

  const adicionarInformacaoPais = () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!novaInformacao.crianca || !novaInformacao.horario || !novaInformacao.preferencia) {
      // Exibe uma mensagem de erro, caso algum campo esteja vazio
      return alert('Nome da Criança, Horário e Preferência são campos obrigatórios.');
    }

    // Adiciona a nova informação dos pais à lista
    setInformacoesPais([...informacoesPais, novaInformacao]);

    // Limpa o formulário após adicionar a informação dos pais
    setNovaInformacao({ id: Date.now(), crianca: '', horario: '', preferencia: '' });
  };

  const editarInformacaoPais = (id) => {
    // Encontra a informação dos pais na lista com base no ID
    const informacaoParaEditar = informacoesPais.find((item) => item.id === id);

    // Atualiza os estados do formulário com as informações para edição
    setNovaInformacao({
      id: informacaoParaEditar.id,
      crianca: informacaoParaEditar.crianca,
      horario: informacaoParaEditar.horario,
      preferencia: informacaoParaEditar.preferencia,
    });

    // Remove a informação dos pais da lista após ser selecionada para edição
    setInformacoesPais(informacoesPais.filter((item) => item.id !== id));
  };

  const excluirInformacaoPais = (id) => {
    // Remove a informação dos pais da lista com base no ID
    setInformacoesPais(informacoesPais.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horários e Preferências dos Pais</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Criança"
        value={novaInformacao.crianca}
        onChangeText={(text) => setNovaInformacao({ ...novaInformacao, crianca: text })}
      />
      <TextInputMask
        style={styles.input}
        placeholder="Horário"
        type="datetime"
        options={{
          format: 'HH:mm',
        }}
        value={novaInformacao.horario}
        onChangeText={(text) => setNovaInformacao({ ...novaInformacao, horario: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Preferência"
        value={novaInformacao.preferencia}
        onChangeText={(text) => setNovaInformacao({ ...novaInformacao, preferencia: text })}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarInformacaoPais}>
        <Text style={styles.buttonText}>Adicionar Informação dos Pais</Text>
      </TouchableOpacity>

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

export default HorariosPreferencias;
