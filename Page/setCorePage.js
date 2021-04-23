import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Picker,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Title,
  H1,
  H3,
} from 'native-base';
import Database from '../Database/Database';


const SetCorePage = () => {
  const [selectedValue, setSelectedValue] = useState('French');
  const [selectedCore, setSelectedCore] = useState('10E');
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const db = new Database();
  const HandleRefresh = (language, number) => {
    db.setCore(language, number, page).then(result => {
      setData(result);
    });
  };
  const changePage = value => {
    let count;
    if (value === 1) {
      count = page - 4;
      setPage(count);
    }
    if (value === 2) {
      count = page + 4;
      setPage(count);
    }
    if (page === 0) {
      count = page + 4;
      setPage(count);
    }
    HandleRefresh(selectedValue, selectedCore, page);
  };
  const list = data => {
    return data.map((element, index) => {
      return (
        <View
          style={{flex: 1, flexDirection: 'row', backgroundColor: 'black'}}
          key={index}>
          <View
            style={{
              flex: 2,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              style={{width: 200, height: 300}}
              source={{
                uri:
                  'https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=' +
                  element.multiverseid,
              }}
            />
          </View>
        </View>
      );
    });
  };
  if (data === null) {
    return (
      <ScrollView>
        <View>
          <Container>
            <H1>Liste des cartes Magic</H1>
            <H3>Merci de selectionner une langue</H3>
            <Content>
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: 250}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="French" value="French" />
                <Picker.Item label="German" value="German" />
                <Picker.Item label="Spanish" value="Spanish" />
                <Picker.Item label="Italian" value="Italian" />
                <Picker.Item label="Japanese" value="Japanese" />
                <Picker.Item
                  label="Portuguese (Brazil)"
                  value="Portuguese (Brazil)"
                />
                <Picker.Item label="Russian" value="Russian" />
                <Picker.Item
                  label="Chinese Simplified"
                  value="Chinese Simplified"
                />
              </Picker>

              <H1>Liste des cartes Magic</H1>
              <H3>Merci de selectionner une langue</H3>
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: 250}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCore(itemValue)
                }>
                <Picker.Item label="Dixième édition" value="10E" />
                <Picker.Item label="German" value="German" />
                <Picker.Item label="Spanish" value="Spanish" />
                <Picker.Item label="Italian" value="Italian" />
                <Picker.Item label="Japanese" value="Japanese" />
                <Picker.Item
                  label="Portuguese (Brazil)"
                  value="Portuguese (Brazil)"
                />
                <Picker.Item label="Russian" value="Russian" />
                <Picker.Item
                  label="Chinese Simplified"
                  value="Chinese Simplified"
                />
              </Picker>

              <Button
                info
                onPress={() => HandleRefresh(selectedValue, selectedCore)}
                style={{height: 50, width: 250}}>
                <Text>Afficher</Text>
              </Button>
            </Content>
          </Container>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{flex: 1}}>
        {list(data)}
        <View style={styles.container}>
          <Button primary onPress={() => changePage(1)}>
            <Text> Retour </Text>
          </Button>
          <Button primary onPress={() => changePage(2)}>
            <Text> Suivant </Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
};

export default SetCorePage;
const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 450,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'green',
    width: '40%',
    height: 40,
  },
});
