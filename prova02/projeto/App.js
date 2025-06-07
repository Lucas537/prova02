import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, Appbar, Card, Button, List, FAB, Text, Snackbar, Avatar, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Dados simulados
const treinos = [
  { id: '1', nome: 'Treino A - Peito e Tríceps', descricao: 'Foco em peitoral e tríceps' },
  { id: '2', nome: 'Treino B - Costas e Bíceps', descricao: 'Foco em costas e bíceps' },
  { id: '3', nome: 'Treino C - Pernas', descricao: 'Agachamento, leg press, etc.' },
];

const exerciciosPorTreino = {
  '1': [
    { id: '1', nome: 'Supino Reto', series: 4, repeticoes: 10 },
    { id: '2', nome: 'Tríceps Pulley', series: 3, repeticoes: 12 },
  ],
  '2': [
    { id: '1', nome: 'Puxada na Barra', series: 4, repeticoes: 8 },
    { id: '2', nome: 'Rosca Direta', series: 3, repeticoes: 12 },
  ],
  '3': [
    { id: '1', nome: 'Agachamento', series: 4, repeticoes: 10 },
    { id: '2', nome: 'Leg Press', series: 4, repeticoes: 12 },
  ],
};

function TreinosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Treinos" subtitle="Escolha seu treino" />
      </Appbar.Header>
      
      <FlatList
        data={treinos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('DetalhesTreino', { treinoId: item.id, nome: item.nome })}>
            <Card.Title title={item.nome} subtitle={item.descricao} left={(props) => <Avatar.Icon {...props} icon="dumbbell" />} />
          </Card>
        )}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        label="Novo Treino"
        onPress={() => alert('Funcionalidade futura para adicionar treino')}
      />
    </View>
  );
}

function DetalhesTreinoScreen({ route }) {
  const { treinoId, nome } = route.params;
  const exercicios = exerciciosPorTreino[treinoId] || [];

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => route.navigation.goBack()} />
        <Appbar.Content title={nome} />
      </Appbar.Header>

      <List.Section title="Exercícios">
        {exercicios.map(exercicio => (
          <List.Item
            key={exercicio.id}
            title={exercicio.nome}
            description={`${exercicio.series} séries de ${exercicio.repeticoes} repetições`}
            left={props => <List.Icon {...props} icon="run" />}
          />
        ))}
      </List.Section>
    </View>
  );
}

function AlimentacaoScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Alimentação" subtitle="Dicas e registros" />
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Title title="Dica de Hoje" left={(props) => <Avatar.Icon {...props} icon="food-apple" />} />
        <Card.Content>
          <Text>Inclua mais proteínas e vegetais na sua dieta para melhores resultados.</Text>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={() => alert('Registrar refeição')} style={{ margin: 16 }}>
        Registrar Refeição
      </Button>
    </View>
  );
}

function ProgressoScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Progresso" subtitle="Acompanhe sua evolução" />
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Title title="Peso Atual" left={(props) => <Avatar.Icon {...props} icon="weight-kilogram" />} />
        <Card.Content>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>75 kg</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Metas" left={(props) => <Avatar.Icon {...props} icon="target" />} />
        <Card.Content>
          <Text>Perder 3 kg em 2 meses</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

function ConfiguracoesScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Configurações" />
      </Appbar.Header>

      <List.Section title="Preferências">
        <List.Item title="Perfil" left={props => <List.Icon {...props} icon="account" />} />
        <List.Item title="Notificações" left={props => <List.Icon {...props} icon="bell" />} />
        <List.Item title="Sobre o App" left={props => <List.Icon {...props} icon="information" />} />
      </List.Section>
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Treinos': iconName = 'dumbbell'; break;
            case 'Alimentação': iconName = 'food-apple'; break;
            case 'Progresso': iconName = 'chart-line'; break;
            case 'Configurações': iconName = 'cog'; break;
            default: iconName = 'circle'; break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Treinos" component={TreinosScreen} />
      <Tab.Screen name="Alimentação" component={AlimentacaoScreen} />
      <Tab.Screen name="Progresso" component={ProgressoScreen} />
      <Tab.Screen name="Configurações" component={ConfiguracoesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="DetalhesTreino" component={DetalhesTreinoScreen} options={{ title: 'Detalhes do Treino' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { margin: 16 },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
