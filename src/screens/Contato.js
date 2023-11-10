// Contato.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const Contato = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const enviarMensagem = () => {
    // Implemente a lógica para enviar a mensagem
    // Realize a validação dos campos antes de enviar
    if (!nome || !email || !mensagem) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você pode adicionar a lógica para enviar a mensagem (por exemplo, enviar para um servidor)
    // Após enviar, pode limpar os campos ou exibir uma mensagem de sucesso
    // Limpeza dos campos:
    setNome('');
    setEmail('');
    setMensagem('');

    // Exemplo de mensagem de sucesso:
    Alert.alert('Sucesso', 'Mensagem enviada com sucesso!');
  };

  return (
    <View>
      <Text>Entre em Contato</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Mensagem"
        value={mensagem}
        onChangeText={(text) => setMensagem(text)}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity onPress={enviarMensagem}>
        <Text>Enviar Mensagem</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contato;
