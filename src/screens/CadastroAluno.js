import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, AsyncStorage } from 'react-native';

const CadastroAluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({ id: Date.now(), nome: '', idade: '', observacoes: '' });
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  useEffect(() => {
    // Carrega os alunos do AsyncStorage ao iniciar o componente
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
    // Validação dos campos
    if (!novoAluno.nome || !novoAluno.idade || !novoAluno.observacoes) {
      // Exibe uma mensagem de erro, caso algum campo esteja vazio
      return alert('Nome, Idade e Observações são campos obrigatórios.');
    }
  
    // Adiciona o novo aluno à lista
    setAlunos([...alunos, novoAluno]);
    saveAlunos();
  
    // Limpa o formulário após adicionar o aluno
    setNovoAluno({ id: Date.now(), nome: '', idade: '', observacoes: '' });
  };
  
  const editarAluno = async (id) => {
    // Encontra o aluno na lista com base no ID
    const alunoParaEditar = alunos.find((aluno) => aluno.id === id);

    // Atualiza os estados do formulário com as informações do aluno para edição
    setNome(alunoParaEditar.nome);
    setIdade(alunoParaEditar.idade);

    // Remove o aluno da lista após ser selecionado para edição
    setAlunos(alunos.filter((aluno) => aluno.id !== id));
    saveAlunos();
  };

  const excluirAluno = async (id) => {
    // Remove o aluno da lista com base no ID
    setAlunos(alunos.filter((aluno) => aluno.id !== id));
    saveAlunos();
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

// Adicionando CadastroNutricional

const CadastroNutricional = () => {
  const [informacoesNutricionais, setInformacoesNutricionais] = useState([]);
  const [novaInformacao, setNovaInformacao] = useState({ id: Date.now(), crianca: '', peso: '', altura: '' });
  const [crianca, setCrianca] = useState('');

  useEffect(() => {
    // Carrega as informações nutricionais do AsyncStorage ao iniciar o componente
    loadInformacoesNutricionais();
  }, []);

  const loadInformacoesNutricionais = async () => {
    try {
      const informacoesNutricionaisData = await AsyncStorage.getItem('informacoesNutricionais');
      if (informacoesNutricionaisData) {
        setInformacoesNutricionais(JSON.parse(informacoesNutricionaisData));
      }
    } catch (error) {
      console.error('Error loading informacoes nutricionais: ', error);
    }
  };

  const saveInformacoesNutricionais = async () => {
    try {
      await AsyncStorage.setItem('informacoesNutricionais', JSON.stringify(informacoesNutricionais));
    } catch (error) {
      console.error('Error saving informacoes nutricionais: ', error);
    }
  };

  const adicionarInformacaoNutricional = () => {
    // Validação dos campos
    if (!novaInformacao.crianca || !novaInformacao.peso || !novaInformacao.altura) {
      // Exibe uma mensagem de erro, caso algum campo esteja vazio
      return alert('Criança, Peso e Altura são campos obrigatórios.');
    }

    // Adiciona a nova informação nutricional à lista
    setInformacoesNutricionais([...informacoesNutricionais, novaInformacao]);
    saveInformacoesNutricionais();

    // Limpa o formulário após adicionar a informação nutricional
    setNovaInformacao({ id: Date.now(), crianca: '', peso: '', altura: '' });
  };

  const editarInformacaoNutricional = async (id) => {
    // Encontra a informação nutricional na lista com base no ID
    const informacaoParaEditar = informacoesNutricionais.find((info) => info.id === id);

    // Atualiza os estados do formulário com as informações da informação nutricional para edição
    setCrianca(informacaoParaEditar.crianca);

    // Remove a informação nutricional da lista após ser selecionada para edição
    setInformacoesNutricionais(informacoesNutricionais.filter((info) => info.id !== id));
    saveInformacoesNutricionais();
  };

  const excluirInformacaoNutricional = async (id) => {
    // Remove a informação nutricional da lista com base no ID
    setInformacoesNutricionais(informacoesNutricionais.filter((info) => info.id !== id));
    saveInformacoesNutricionais();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro Nutricional</Text>
      <TextInput
        style={styles.input}
        placeholder="Criança"
        value={crianca}
        onChangeText={(text) => setCrianca(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={novaInformacao.peso}
        onChangeText={(text) => setNovaInformacao({ ...novaInformacao, peso: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        value={novaInformacao.altura}
        onChangeText={(text) => setNovaInformacao({ ...novaInformacao, altura: text })}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarInformacaoNutricional}>
        <Text style={styles.buttonText}>Adicionar Informação Nutricional</Text>
      </TouchableOpacity>

      {/* Lista de informações nutricionais cadastradas */}
      <View>
        <Text>Lista de Informações Nutricionais</Text>
        <FlatList
          data={informacoesNutricionais}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.crianca}</Text>
              <Text>{item.peso} kg</Text>
              <Text>{item.altura} cm</Text>
              <TouchableOpacity onPress={() => editarInformacaoNutricional(item.id)}>
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirInformacaoNutricional(item.id)}>
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

// Adicionando HorariosPreferencias

const HorariosPreferencias = () => {
  const [informacoesPais, setInformacoesPais] = useState([]);
  const [novaInformacao, setNovaInformacao] = useState({ id: Date.now(), crianca: '', horario: '', preferencia: '' });
  const [crianca, setCrianca] = useState('');

  useEffect(() => {
    // Carrega as informações dos pais do AsyncStorage ao iniciar o componente
    loadInformacoesPais();
  }, []);

  const loadInformacoesPais = async () => {
    try {
      const informacoesPaisData = await AsyncStorage.getItem('informacoesPais');
      if (informacoesPaisData) {
        setInformacoesPais(JSON.parse(informacoesPaisData));
      }
    } catch (error) {
      console.error('Error loading informacoes pais: ', error);
    }
  };

  const saveInformacoesPais = async () => {
    try {
      await AsyncStorage.setItem('informacoesPais', JSON.stringify(informacoesPais));
    } catch (error) {
      console.error('Error saving informacoes pais: ', error);
    }
  };

  const adicionarInformacaoPais = () => {
    // Validação dos campos
    if (!novaInformacao.crianca || !novaInformacao.horario || !novaInformacao.preferencia) {
      // Exibe uma mensagem de erro, caso algum campo esteja vazio
      return alert('Criança, Horário e Preferência são campos obrigatórios.');
    }

    // Adiciona a nova informação dos pais à lista
    setInformacoesPais([...informacoesPais, novaInformacao]);
    saveInformacoesPais();

    // Limpa o formulário após adicionar a informação dos pais
    setNovaInformacao({ id: Date.now(), crianca: '', horario: '', preferencia: '' });
  };

  const editarInformacaoPais = async (id) => {
    // Encontra a informação dos pais na lista com base no ID
    const informacaoParaEditar = informacoesPais.find((info) => info.id === id);

    // Atualiza os estados do formulário com as informações da informação dos pais para edição
    setCrianca(informacaoParaEditar.crianca);

    // Remove a informação dos pais da lista após ser selecionada para edição
    setInformacoesPais(informacoesPais.filter((info) => info.id !== id));
    saveInformacoesPais();
  };

  const excluirInformacaoPais = async (id) => {
    // Remove a informação dos pais da lista com base no ID
    setInformacoesPais(informacoesPais.filter((info) => info.id !== id));
    saveInformacoesPais();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horários e Preferências</Text>
      <TextInput
        style={styles.input}
        placeholder="Criança"
        value={crianca}
        onChangeText={(text) => setCrianca(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário"
        value={novaInformacao.horario}
        onChangeText={(text) => setNovaInformacao({ ...novaInformacao, horario: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Preferência"
        value={novaInformacao.preferencia}
        onChangeText={(text) => setNovaInformacao({ ...novaInformacao, preferencia: text })}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarInformacaoPais}>
        <Text style={styles.buttonText}>Adicionar Informação dos Pais</Text>
      </TouchableOpacity>

      {/* Lista de informações dos pais cadastradas */}
      <View>
        <Text>Lista de Informações dos Pais</Text>
        <FlatList
          data={informacoesPais}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.crianca}</Text>
              <Text>{item.horario}</Text>
              <Text>{item.preferencia}</Text>
              <TouchableOpacity onPress={() => editarInformacaoPais(item.id)}>
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirInformacaoPais(item.id)}>
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

// Adicionando TrabalheConosco

const TrabalheConosco = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [curriculo, setCurriculo] = useState('');

  useEffect(() => {
    // Carrega os candidatos do AsyncStorage ao iniciar o componente
    loadCandidatos();
  }, []);

  const loadCandidatos = async () => {
    try {
      const candidatosData = await AsyncStorage.getItem('candidatos');
      if (candidatosData) {
        setCandidatos(JSON.parse(candidatosData));
      }
    } catch (error) {
      console.error('Error loading candidatos: ', error);
    }
  };

  const saveCandidatos = async () => {
    try {
      await AsyncStorage.setItem('candidatos', JSON.stringify(candidatos));
    } catch (error) {
      console.error('Error saving candidatos: ', error);
    }
  };

  const enviarCurriculo = () => {
    // Validação dos campos
    if (!nome || !email || !curriculo) {
      // Exibe uma mensagem de erro, caso algum campo esteja vazio
      return alert('Nome, E-mail e Currículo são campos obrigatórios.');
    }

    // Adiciona o novo candidato à lista
    setCandidatos([...candidatos, { nome, email, curriculo }]);
    saveCandidatos();

    // Limpa o formulário após adicionar o candidato
    setNome('');
    setEmail('');
    setCurriculo('');
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
        style={styles.input}
        placeholder="Currículo"
        value={curriculo}
        onChangeText={(text) => setCurriculo(text)}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={enviarCurriculo}>
        <Text style={styles.buttonText}>Enviar Currículo</Text>
      </TouchableOpacity>

      {/* Lista de candidatos */}
      <View>
        <Text>Lista de Candidatos</Text>
        <FlatList
          data={candidatos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nome}</Text>
              <Text>{item.email}</Text>
              <Text>{item.curriculo}</Text>
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
export { CadastroNutricional, HorariosPreferencias, TrabalheConosco };
