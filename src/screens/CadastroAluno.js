import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList
} from 'react-native';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';



// Função para formatar o CPF com máscara
const formatCPF = (value) => {
  const cpf = value.replace(/\D/g, '');

  if (cpf.length <= 11) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    return cpf.slice(0, 14);
  }
};

const CadastroAluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({
    id: Date.now(),
    nome: '',
    sobrenome: '',
    idade: '',
    dataNascimento: '',
    uf: '',
    cpf: '',
  });

  useEffect(() => {
    loadAlunos();
  }, []);

  const loadAlunos = async () => {
    try {
      const alunosData = await AsyncStorage.getItem('alunos');
      if (alunosData) {
        setAlunos(JSON.parse(alunosData));
      }
    } catch (error) {
      console.error('Error loading alunos: ', error);
    }
  };

  const saveAlunos = async () => {
    try {
      await AsyncStorage.setItem('alunos', JSON.stringify(alunos));
    } catch (error) {
      console.error('Error saving alunos: ', error);
    }
  };

  const adicionarAluno = () => {
    if (!novoAluno.nome || !novoAluno.sobrenome || !novoAluno.idade || !novoAluno.dataNascimento || !novoAluno.uf || !novoAluno.cpf) {
      return alert('Todos os campos são obrigatórios.');
    }

    setAlunos([...alunos, novoAluno]);
    saveAlunos();

    setNovoAluno({
      id: Date.now(),
      nome: '',
      sobrenome: '',
      idade: '',
      dataNascimento: '',
      uf: '',
      cpf: '',
    });
  };

  const editarAluno = (id) => {
    const alunoParaEditar = alunos.find((aluno) => aluno.id === id);

    // Atualiza os dados do novoAluno com os dados do aluno selecionado para edição
    setNovoAluno(alunoParaEditar);

    // Remove o aluno da lista após ser selecionado para edição
    setAlunos(alunos.filter((aluno) => aluno.id !== id));
    saveAlunos();
  };

  const excluirAluno = (id) => {
    // Remove o aluno da lista com base no ID
    setAlunos(alunos.filter((aluno) => aluno.id !== id));
    saveAlunos();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Cadastro de Aluno" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={novoAluno.nome}
            onChangeText={(text) => setNovoAluno({ ...novoAluno, nome: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Sobrenome"
            value={novoAluno.sobrenome}
            onChangeText={(text) => setNovoAluno({ ...novoAluno, sobrenome: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Idade"
            value={novoAluno.idade}
            onChangeText={(text) => setNovoAluno({ ...novoAluno, idade: text })}
            keyboardType="numeric"
          />
          <TextInputMask
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/YYYY)"
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            value={novoAluno.dataNascimento}
            onChangeText={(text) => setNovoAluno({ ...novoAluno, dataNascimento: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="UF"
            value={novoAluno.uf}
            onChangeText={(text) => setNovoAluno({ ...novoAluno, uf: text })}
          />
          <TextInputMask
            style={styles.input}
            placeholder="CPF"
            type={'cpf'}
            value={novoAluno.cpf}
            onChangeText={(text) => setNovoAluno({ ...novoAluno, cpf: text })}
            keyboardType="numeric"
            secureTextEntry // Adicionando esta propriedade para mascarar com bolinhas
          />

          <Button style={styles.button} icon="account-plus" mode="contained" onPress={adicionarAluno}>
            Adicionar Aluno
          </Button>

          <FlatList
            data={alunos}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => (
              <Card style={styles.headerCard}>
                <Card.Content>
                  <Title style={styles.headerTitle}>Alunos Cadastrados</Title>
                </Card.Content>
              </Card>
            )}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Content>
                  <Title>{`Nome: ${item.nome} ${item.sobrenome}`}</Title>
                  <Paragraph>{`Idade: ${item.idade}`}</Paragraph>
                  <Paragraph>{`Data de Nascimento: ${item.dataNascimento}`}</Paragraph>
                  <Paragraph>{`UF: ${item.uf}`}</Paragraph>
                  <Paragraph>{`CPF: ${formatCPF(item.cpf)}`}</Paragraph>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Centraliza o conteúdo verticalmente
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    width: 300,
  },

  buttonContainer: {
    marginVertical: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CadastroAluno;
