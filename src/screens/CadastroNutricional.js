import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const CadastroNutricional = () => {
  const [informacoesNutricionais, setInformacoesNutricionais] = useState([]);
  const [novaInformacao, setNovaInformacao] = useState({
    id: Date.now(),
    crianca: '',
    alergias: '',
    preferencias: '',
    horarioAlmoco: '',
    horarioLanche: '',
  });

  useEffect(() => {
    loadInformacoesNutricionais();
  }, []);

  const loadInformacoesNutricionais = async () => {
    try {
      const informacoesNutricionaisData = await AsyncStorage.getItem('informacoesNutricionais');
      if (informacoesNutricionaisData) {
        setInformacoesNutricionais(JSON.parse(informacoesNutricionaisData));
      }
    } catch (error) {
      console.error('Error loading informacoesNutricionais: ', error);
    }
  };

  const saveInformacoesNutricionais = async () => {
    try {
      await AsyncStorage.setItem('informacoesNutricionais', JSON.stringify(informacoesNutricionais));
    } catch (error) {
      console.error('Error saving informacoesNutricionais: ', error);
    }
  };

  const adicionarInformacaoNutricional = () => {
    if (!novaInformacao.crianca || !novaInformacao.alergias || !novaInformacao.preferencias || !novaInformacao.horarioAlmoco || !novaInformacao.horarioLanche) {
      return alert('Todos os campos são obrigatórios.');
    }

    setInformacoesNutricionais([...informacoesNutricionais, novaInformacao]);
    saveInformacoesNutricionais();

    setNovaInformacao({
      id: Date.now(),
      crianca: '',
      alergias: '',
      preferencias: '',
      horarioAlmoco: '',
      horarioLanche: '',
    });
  };

  const editarInformacaoNutricional = (id) => {
    const informacaoParaEditar = informacoesNutricionais.find((item) => item.id === id);

    // Atualiza os dados da novaInformacao com os dados da informacaoNutricional selecionada para edição
    setNovaInformacao(informacaoParaEditar);

    // Remove a informacaoNutricional da lista após ser selecionada para edição
    setInformacoesNutricionais(informacoesNutricionais.filter((item) => item.id !== id));
    saveInformacoesNutricionais();
  };

  const excluirInformacaoNutricional = (id) => {
    // Remove a informacaoNutricional da lista com base no ID
    setInformacoesNutricionais(informacoesNutricionais.filter((item) => item.id !== id));
    saveInformacoesNutricionais();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Cadastro Nutricional" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TransparentLabelInput
          label="Nome da Criança"
          value={novaInformacao.crianca}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, crianca: text })}
        />
        <TransparentLabelInput
          label="Alergias"
          value={novaInformacao.alergias}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, alergias: text })}
        />
        <TransparentLabelInput
          label="Preferências"
          value={novaInformacao.preferencias}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, preferencias: text })}
        />
        <TransparentLabelInput
          label="Horário de Almoço"
          value={novaInformacao.horarioAlmoco}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, horarioAlmoco: text })}
        />
        <TransparentLabelInput
          label="Horário de Lanche"
          value={novaInformacao.horarioLanche}
          onChangeText={(text) => setNovaInformacao({ ...novaInformacao, horarioLanche: text })}
        />
        <Button style={styles.button} icon="account-plus" mode="contained" onPress={adicionarInformacaoNutricional}>
          Adicionar Informação Nutricional
        </Button>

        <FlatList
          data={informacoesNutricionais}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => (
            <Card style={styles.headerCard}>
              <Card.Content>
                <Title style={styles.headerTitle}>Informações Nutricionais Cadastradas</Title>
              </Card.Content>
            </Card>
          )}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph>{`Nome da Criança: ${item.crianca}`}</Paragraph>
                <Paragraph>{`Alergias: ${item.alergias}`}</Paragraph>
                <Paragraph>{`Preferências: ${item.preferencias}`}</Paragraph>
                <Paragraph>{`Horário de Almoço: ${item.horarioAlmoco}`}</Paragraph>
                <Paragraph>{`Horário de Lanche: ${item.horarioLanche}`}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button icon="account-edit" onPress={() => editarInformacaoNutricional(item.id)}>
                  Editar
                </Button>
                <Button icon="delete" onPress={() => excluirInformacaoNutricional(item.id)}>
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
  inputContainer: {
    marginBottom: 20,
    width: 200,
  },
  input: {
    height: 40,
    borderColor: '2196F3',
    borderWidth: 1,
    marginBottom: 4,
    padding: 6,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#F0F0F0', // Cor de fundo cinza
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    width: 300,
  },
  headerCard: {
    marginBottom: 10,
    width: 300,
    backgroundColor: '#fffff0',
  },
  headerTitle: {
    color: '#black',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default CadastroNutricional;
