// TrabalheConosco.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const TrabalheConosco = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [curriculo, setCurriculo] = useState('');

  const enviarCurriculo = () => {
    // Implemente a lógica para enviar o currículo
    // Realize a validação dos campos antes de enviar
    if (!nome || !email || !curriculo) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você pode adicionar a lógica para enviar o currículo (por exemplo, enviar para um servidor)
    // Após enviar, pode limpar os campos ou exibir uma mensagem de sucesso
    // Limpeza dos campos:
    setNome('');
    setEmail('');
    setCurriculo('');

    // Exemplo de mensagem de sucesso:
    Alert.alert('Sucesso', 'Currículo enviado com sucesso!');
  };

  return (
    <View>
      <Text>Trabalhe Conosco</Text>
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
        placeholder="Currículo"
        value={curriculo}
        onChangeText={(text) => setCurriculo(text)}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity onPress={enviarCurriculo}>
        <Text>Enviar Currículo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrabalheConosco;
