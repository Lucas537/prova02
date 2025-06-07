import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Card, Divider, Text } from "react-native-paper";

// Importações das imagens
const imagemClientes = require("../../assets/ClientesFavicon.png");
const imagemFuncionarios = require("../../assets/FuncionariosFavicon.jpg");
const imagemPecas = require("../../assets/imagemPecas.png"); 

export default function InicioScreen({ navigation }) {
  return (
    <ScrollView style={styles.fundo}>
      {/* Card de Clientes */}
      <Card
        style={styles.card}
        onPress={() =>
          navigation.navigate("Cadastros", {
            screen: "Clientes",
            params: { screen: "ClienteListaScreen" },
          })
        }
      >
        <Card.Content>
          <Card.Title
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
            title="clientes"
            left={() => (
              <Avatar.Image
                source={imagemClientes}
                size={50}
                style={styles.avatarRetangular}
              />
            )}
          />
        </Card.Content>
        <Divider style={{ width: "80%", alignSelf: "center" }} />
        <Card.Content>
          <Text style={styles.descricao}>Descrição:</Text>
          <Text style={styles.lorem}>
            Construímos relacionamentos duradouros com nossos clientes,
            entendendo suas necessidades e oferecendo as melhores soluções em
            autopeças. Nosso foco é sua satisfação, com atendimento ágil e
            personalizado. Venha descobrir a diferença!
          </Text>
        </Card.Content>
      </Card>

      {/* Card de Funcionários */}
      <Card
        style={styles.card}
        onPress={() =>
          navigation.navigate("Cadastros", {
            screen: "Funcionarios",
          })
        }
      >
        <Card.Content>
          <Card.Title
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
            title="funcionários"
            left={() => (
              <Avatar.Image
                source={imagemFuncionarios}
                size={50}
                style={styles.avatarRetangular}
              />
            )}
          />
        </Card.Content>
        <Divider style={{ width: "80%", alignSelf: "center" }} />
        <Card.Content>
          <Text style={styles.descricao}>Descrição:</Text>
          <Text style={styles.lorem}>
            Nossa equipe de funcionários é o coração do nosso negócio, dedicada
            a oferecer um serviço de excelência. Selecionamos e capacitamos
            profissionais que garantem a qualidade e a eficiência em todas as
            etapas do nosso atendimento.
          </Text>
        </Card.Content>
      </Card>

      {/* Card de Treinadores */}
      <Card
        style={styles.card}
        onPress={() =>
          navigation.navigate("Cadastros", {
            screen: "Treinadores",
          })
        }
      >
        <Card.Content>
          <Card.Title
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
            title="Treinadores"
            left={() => (
              <Avatar.Image
                source={imagemPecas}
                size={50}
                style={styles.avatarRetangular}
              />
            )}
          />
        </Card.Content>
        <Divider style={{ width: "80%", alignSelf: "center" }} />
        <Card.Content>
          <Text style={styles.descricao}>Descrição:</Text>
          <Text style={styles.lorem}>
          Treinadores são profissionais altamente qualificados e preparados
  para auxiliar você em sua jornada de transformação física. Com foco em
  saúde, desempenho e bem-estar, eles oferecem treinos personalizados,
  acompanhamento constante e motivação para alcançar seus objetivos de forma
  segura e eficaz.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatarRetangular: {
    backgroundColor: "transparent",
    height: "auto",
    width: "auto",
  },
  title: {
    fontWeight: "900",
    left: 20,
    fontSize: 18,
    textTransform: "capitalize",
  },
  subtitle: {
    left: 20,
    textTransform: "capitalize",
  },
  card: {
    marginVertical: "5%",
    marginHorizontal: 20,
  },
  lorem: {
    left: 7,
    marginBottom: 10,
    textAlign: "justify",
  },
  descricao: {
    left: 7,
    marginBottom: 5,
    fontWeight: "700",
  },
  fundo: {
    backgroundColor: "rgba(200, 162, 121, 0.5)",
  },
});
