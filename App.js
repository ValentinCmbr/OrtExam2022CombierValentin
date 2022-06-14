import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {useEffect, useState} from "react";


export default function App() {

  const [liste, setListe] = useState(null)
  const [newState, setNewState] = useState(false);

  const getSimpson = () => {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
        .then(response => response.json())
        .then(data => {
          setListe(data);
        })}

    const reload = () => React.useCallback(() => {
        setNewState(true);
        wait(2000).then(() => setNewState(false));
    }, []);

  useEffect(() => {
        (async () => {
          getSimpson()
        })();
      },
      []);

  const Item = ({title}) => (
    <View>
      <Text>{title.character}</Text>
      <Text>{title.quote}</Text>
        <Image style={styles.tinyLogo} source={{uri: title.image}}/>
    </View>
);

  const renderItem = ({ item }) => (
    <Item title={item} />
  );
  return (
    <View style={styles.container}>
      <FlatList data={liste} renderItem={renderItem}></FlatList>
    </View>
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
});
