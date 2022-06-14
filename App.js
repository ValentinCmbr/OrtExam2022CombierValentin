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
  const [newState, setNewState] = useState(false);
  const [number, onChangeNumber] = useState(null);

  const getSimpson = () => {
    fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=1`)
        .then(response => response.json())
        .then(data => {
          setListe(data);
        })}

    const reload = () => {
        fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${number}`)
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

    useEffect(() => {
            (async () => {
                reload()
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
      <FlatList data={liste} renderItem={renderItem}></FlatList>
      <TouchableOpacity style={styles.button} onPress={reload}><Text>Reload</Text></TouchableOpacity>
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
        backgroundColor: "#DDDDDD",
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
