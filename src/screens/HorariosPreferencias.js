import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Title,
  Text,
  IconButton,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';

const TransparentLabelInput = ({ label, value, onChangeText, ...props }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={label}
      placeholderTextColor="grey"
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  </View>
);

const HorariosPreferencias = () => {
  const [informacoesPais, setInformacoesPais] = useState([]);
  const [novaInformacao, setNovaInformacao] = useState({
    id: Date.now(),
    crianca: '',
    horario: '',
    preferencia: '',
    horarioSaida: '',
    responsavelBuscar: '',
  });

  useEffect(() => {
    // Código adicional para carregar dados do AsyncStorage pode ser adicionado aqui, se necessário
  }, []);

  const saveInformacoesPais = async () => {
    try {
      await AsyncStorage.setItem('informacoesPais', JSON.stringify(informacoesPais));
    } catch (error) {
      console.error('Erro ao salvar informacoesPais: ', error);
    }
  };

  const adicionarInformacaoPais = () => {
    if (
      !novaInformacao.crianca ||
      !novaInformacao.horario ||
      !novaInformacao.preferencia ||
      !novaInformacao.horarioSaida ||
      !novaInformacao.responsavelBuscar
    ) {
      return alert(
        'Nome da Criança, Horário, Preferência, Horário de Saída e Responsável por Buscar são campos obrigatórios.'
      );
    }

    setInformacoesPais([...informacoesPais, novaInformacao]);
    saveInformacoesPais();

    setNovaInformacao({
      id: Date.now(),
      crianca: '',
      horario: '',
      preferencia: '',
      horarioSaida: '',
      responsavelBuscar: '',
    });
  };

  const editarInformacaoPais = (id) => {
    const informacaoParaEditar = informacoesPais.find((item) => item.id === id);
    setNovaInformacao({
      id: informacaoParaEditar.id,
      crianca: informacaoParaEditar.crianca,
      horario: informacaoParaEditar.horario,
      preferencia: informacaoParaEditar.preferencia,
      horarioSaida: informacaoParaEditar.horarioSaida,
      responsavelBuscar: informacaoParaEditar.responsavelBuscar,
    });

    // Remove a informacaoPais da lista após ser selecionada para edição
    setInformacoesPais(informacoesPais.filter((item) => item.id !== id));
    saveInformacoesPais();
  };

  const excluirInformacaoPais = (id) => {
    // Remove a informacaoPais da lista com base no ID
    setInformacoesPais(informacoesPais.filter((item) => item.id !== id));
    saveInformacoesPais();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Horários e Preferências dos Pais" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TransparentLabelInput
          label="Nome da Criança"
          value={novaInformacao.crianca}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, crianca: text })}
        />
        <TransparentLabelInput
          label="Horário de Entrada"
          options={{
            format: 'HH:mm',
          }}
          value={novaInformacao.horario}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, horario: text })}
        />
        <TransparentLabelInput
          label="Preferência"
          value={novaInformacao.preferencia}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, preferencia: text })}
        />
        <TransparentLabelInput
          label="Horário de Saída"
          options={{
            format: 'HH:mm',
          }}
          value={novaInformacao.horarioSaida}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, horarioSaida: text })}
        />
        <TransparentLabelInput
          label="Responsável por Buscar"
          value={novaInformacao.responsavelBuscar}
          onChangeText={(text) =>
            setNovaInformacao({ ...novaInformacao, responsavelBuscar: text })
          }
        />
        <Button
          style={styles.button}
          icon="account-plus"
          mode="contained"
          onPress={adicionarInformacaoPais}
        >
          Adicionar Informação dos Pais
        </Button>

        <Card style={styles.headerCard}>
                <Card.Content>
                  <Title style={styles.headerTitle}>Alunos Cadastrados</Title>
                </Card.Content>
              </Card>
        <FlatList
  data={informacoesPais}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.crianca}</Title>
        <Text>{item.horario}</Text>
        <Text>{item.preferencia}</Text>
        <Text>{item.horarioSaida}</Text>
        <Text>{item.responsavelBuscar}</Text>
      </Card.Content>
      <Card.Actions>
                  <Button icon="account-edit" onPress={() => editarAluno(item.id)}>
                    Editar
                  </Button>
                  <Button icon="delete" onPress={() => excluirAluno(item.id)}>
                    Excluir
                  </Button>
                </Card.Actions>
    </Card>
  )}
/>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 0,
    width: '50%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: '70%',
  },
  card: {
    marginBottom: 100,
    width: '100%',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HorariosPreferencias;
