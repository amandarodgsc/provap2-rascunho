import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const TrabalheConosco = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [curriculo, setCurriculo] = useState('');

  const enviarCurriculo = async () => {
    // Realiza a validação dos campos antes de enviar
    if (!nome || !email || !curriculo) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você pode adicionar a lógica para enviar o currículo (por exemplo, enviar para um servidor)
    try {
      const respostaServidor = await fetch('URL_DO_SEU_BACKEND', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          curriculo: curriculo,
        }),
      });

      if (respostaServidor.ok) {
        // Exemplo de mensagem de sucesso:
        Alert.alert('Sucesso', 'Currículo enviado com sucesso!');
        // Limpeza dos campos:
        setNome('');
        setEmail('');
        setCurriculo('');
      } else {
        Alert.alert('Erro', 'Falha ao enviar o currículo. Por favor, tente novamente.');
      }
    } catch (erro) {
      console.error('Erro ao enviar o currículo:', erro);
      Alert.alert('Erro', 'Algo deu errado. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trabalhe Conosco</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Currículo"
        value={curriculo}
        onChangeText={(text) => setCurriculo(text)}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={enviarCurriculo}>
        <Text style={styles.buttonText}>Enviar Currículo</Text>
      </TouchableOpacity>
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
  multilineInput: {
    height: 80,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default TrabalheConosco;
