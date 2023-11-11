import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Contato = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const enviarMensagem = async () => {
    // Realize a validação dos campos antes de enviar
    if (!nome || !email || !mensagem) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você pode adicionar a lógica para enviar a mensagem (por exemplo, enviar para um servidor)
    try {
      // Simulando o envio da mensagem para um servidor fictício
      const respostaServidor = await fetch('URL_DO_SEU_BACKEND', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          mensagem: mensagem,
        }),
      });

      if (respostaServidor.ok) {
        // Exemplo de mensagem de sucesso:
        Alert.alert('Sucesso', 'Mensagem enviada com sucesso!');
        // Limpeza dos campos:
        setNome('');
        setEmail('');
        setMensagem('');
      } else {
        Alert.alert('Erro', 'Falha ao enviar a mensagem. Por favor, tente novamente.');
      }
    } catch (erro) {
      console.error('Erro ao enviar a mensagem:', erro);
      Alert.alert('Erro', 'Algo deu errado. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre em Contato</Text>
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
        placeholder="Mensagem"
        value={mensagem}
        onChangeText={(text) => setMensagem(text)}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={enviarMensagem}>
        <Text style={styles.buttonText}>Enviar Mensagem</Text>
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

export default Contato;
