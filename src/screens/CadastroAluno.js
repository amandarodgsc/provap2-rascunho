import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const CadastroAluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({ id: Date.now(), nome: '', idade: '', observacoes: '' });
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const adicionarAluno = () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!novoAluno.nome || !novoAluno.idade) {
      // Exibe uma mensagem de erro, caso algum campo esteja vazio
      return alert('Nome e Idade são campos obrigatórios.');
    }

    // Adiciona o novo aluno à lista
    setAlunos([...alunos, novoAluno]);

    // Limpa o formulário após adicionar o aluno
    setNovoAluno({ id: Date.now(), nome: '', idade: '', observacoes: '' });
  };

  const editarAluno = (id) => {
    // Encontra o aluno na lista com base no ID
    const alunoParaEditar = alunos.find((aluno) => aluno.id === id);

    // Atualiza os estados do formulário com as informações do aluno para edição
    setNome(alunoParaEditar.nome);
    setIdade(alunoParaEditar.idade);

    // Remove o aluno da lista após ser selecionado para edição
    setAlunos(alunos.filter((aluno) => aluno.id !== id));
  };

  const excluirAluno = (id) => {
    // Remove o aluno da lista com base no ID
    setAlunos(alunos.filter((aluno) => aluno.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Aluno</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={(text) => setIdade(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={adicionarAluno}>
        <Text style={styles.buttonText}>Adicionar Aluno</Text>
      </TouchableOpacity>

      {/* Lista de alunos cadastrados */}
      <View>
        <Text>Lista de Alunos</Text>
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nome}</Text>
              <Text>{item.idade}</Text>
              <Text>{item.observacoes}</Text>
              <TouchableOpacity onPress={() => editarAluno(item.id)}>
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirAluno(item.id)}>
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

export default CadastroAluno;
