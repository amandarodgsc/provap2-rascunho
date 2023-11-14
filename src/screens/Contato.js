import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const TransparentLabelInput = ({ label, value, onChangeText, ...props }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={label}
      placeholderTextColor="grey"
      value={value}
      onChangeText={onChangeText}
      multiline={label === 'Mensagem'}
      {...props}
    />
  </View>
);

const Contato = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [telefoneFixo, setTelefoneFixo] = useState('');
  const [telefoneWhatsapp, setTelefoneWhatsapp] = useState('');

  const validarEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const formatarTelefone = (telefone) => {
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  };

  const enviarMensagem = async () => {
    if (!nome || !email || !mensagem || (!telefoneFixo && !telefoneWhatsapp)) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Digite um e-mail válido.');
      return;
    }

    try {
      const respostaServidor = await fetch('URL_DO_SEU_BACKEND', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          mensagem: mensagem,
          telefoneFixo: formatarTelefone(telefoneFixo),
          telefoneWhatsapp: formatarTelefone(telefoneWhatsapp),
        }),
      });

      if (respostaServidor.ok) {
        Alert.alert('Sucesso', 'Mensagem enviada com sucesso!');
        setNome('');
        setEmail('');
        setMensagem('');
        setTelefoneFixo('');
        setTelefoneWhatsapp('');
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
      <TransparentLabelInput label="Nome" value={nome} onChangeText={(text) => setNome(text)} />
      <TransparentLabelInput
        label="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TransparentLabelInput
        label="Telefone Fixo"
        value={telefoneFixo}
        onChangeText={(text) => setTelefoneFixo(text)}
        keyboardType="phone-pad"
      />
      <TransparentLabelInput
        label="Telefone WhatsApp"
        value={telefoneWhatsapp}
        onChangeText={(text) => setTelefoneWhatsapp(text)}
        keyboardType="phone-pad"
      />
      <TransparentLabelInput
        label="Mensagem"
        value={mensagem}
        onChangeText={(text) => setMensagem(text)}
        multiline
        numberOfLines={6}
      />
      <Button style={styles.button} mode="contained" onPress={enviarMensagem}>
        Enviar Mensagem
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '50%',  // Ocupar 80% da largura disponível
  },
  input: {
    height: 40,
    marginBottom: 4,
    padding: 6,
    width: '100%',  // Ocupar 100% da largura disponível
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    width: '50%',  // Ocupar 80% da largura disponível
  },
});

export default Contato;
