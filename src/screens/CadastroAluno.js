// CadastroAluno.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

const CadastroAluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({ nome: '', idade: '', observacoes: '' });

  const adicionarAluno = () => {
    // Implemente a lógica para adicionar um novo aluno à lista
    // Certifique-se de realizar a validação dos campos antes de adicionar
    // Por exemplo, verifique se os campos obrigatórios estão preenchidos
    // Adicione o aluno usando setAlunos([...alunos, novoAluno])
  };

  const editarAluno = (id) => {
    // Implemente a lógica para editar um aluno na lista
    // Atualize o aluno usando setAlunos([...alunos])
  };

  const excluirAluno = (id) => {
    // Implemente a lógica para excluir um aluno da lista
    // Remova o aluno usando setAlunos(alunos.filter(aluno => aluno.id !== id))
  };

  return (
    <View>
      {/* Formulário para adicionar um novo aluno */}
      <View>
        <Text>Novo Aluno</Text>
        <TextInput
          placeholder="Nome"
          value={novoAluno.nome}
          onChangeText={(text) => setNovoAluno({ ...novoAluno, nome: text })}
        />
        <TextInput
          placeholder="Idade"
          value={novoAluno.idade}
          onChangeText={(text) => setNovoAluno({ ...novoAluno, idade: text })}
        />
        <TextInput
          placeholder="Observações"
          value={novoAluno.observacoes}
          onChangeText={(text) => setNovoAluno({ ...novoAluno, observacoes: text })}
        />
        <TouchableOpacity onPress={adicionarAluno}>
          <Text>Adicionar Aluno</Text>
        </TouchableOpacity>
      </View>

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

export default CadastroAluno;
