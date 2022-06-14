import { StatusBar } from 'expo-status-bar';
import {useEffect, useState, useCallback} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaViewComponent
} from 'react-native';


export default function App() {

  const [liste, setListe] = useState(null)
  const [number, onChangeNumber] = useState(null);
  const [texte, onChangeTexte] = useState(null)

  const getSimpson = () => {
      fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=1`)
        .then(response => response.json())
        .then(data => {
          setListe(data);
        })}

    const reload = () => {
        fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${number}&character=${texte}`)
            .then(response => response.json())
            .then(data => {
                setListe(data);
            })}

  useEffect(() => {
        (async () => {
          getSimpson()
        })();
      },
      []);

  const Item = ({title}) => (
    <View>
      <Text style={styles.name}>{title.character}</Text>
      <Text>{title.quote}</Text>
       <Image style={styles.tinyLogo} source={{uri: title.image}}/>
    </View>
);

  const renderItem = ({ item }) => (
    <Item title={item} />
  );
  return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput style={styles.input} onChangeText={onChangeNumber} value={number} placeholder="Choisir nombre" keyboardType="numeric"/>
        <TextInput style={styles.input} onChangeText={onChangeTexte} value={texte} placeholder="Choisir un personnage" keyboardType="ascii-capable"></TextInput>
          <TouchableOpacity style={styles.button} onPress={reload}><Text>Confirmer la recherche</Text></TouchableOpacity>
      <FlatList data={liste} renderItem={renderItem}></FlatList>
      </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    tinyLogo: {
        width: 120,
        height: 120,
        borderRadius:4,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#e5bdf0",
        padding: 10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    name: {
      color:"#36b6d9",
    }

});
