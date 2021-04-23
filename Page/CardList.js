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
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CardList = props => {
  const db = new Database();
  let bouncyCheckboxRef: BouncyCheckbox | null = null;
  const [checkboxState, setCheckboxState] = React.useState(false);

  const [data, setData] = useState(null);
  const [language, setLanguage] = useState();
  const [selectedValue, setSelectedValue] = useState('French');
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(false);
  const [dataCart, setDataCart] = useState([]);
  const idx = useState(dataCart.indexOf(dataCart));
  const [colorCard, setColorCard] = useState();

  const HandleRefresh2 = value => {
    setSelectedValue(value);
    db.listCardByLanguage(value, page, colorCard).then(result => {
      setData(result);
    });
  };
  const cartSetting = value => {
    dataCart.push({id: value});
    console.log(dataCart);
    console.log(Object.keys(dataCart));
  };

  const removeItem = value => {
    // eslint-disable-next-line no-undef
    delete dataCart[1];
    console.log(dataCart);
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
    HandleRefresh2(selectedValue, page);
  };

  const list = data => {
    return data.map((element, index) => {
      return (
        <View key={element.key} style={{margin: 10, backgroundColor: 'white'}}>
          <ListItem thumbnail>
            <Left>
              <Thumbnail
                square
                style={{width: 100, height: 150}}
                source={{
                  uri:
                    'https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=' +
                    element.multiverseid,
                }}
              />
            </Left>
            <Body>
              <Text>{element.name}</Text>
              <Text note numberOfLines={30}>
                {element.text}
              </Text>
              <Text note numberOfLines={30}>
                {element.flavorText}
              </Text>
            </Body>
            <Right>
              <Button
                alert
                key={element}
                onPress={() => cartSetting(element.id)}>
                <Text>Text</Text>
              </Button>
              <Button
                alert
                key={element}
                onPress={() => removeItem(element.id)}>
                <Text>Text</Text>
              </Button>
            </Right>
          </ListItem>
        </View>
      );
    });
  };
  if (data === null) {
    return (
      <ScrollView>
        <View>
          <Container>
            <View style={styles.titre}>
              <H1>Liste des cartes Magic</H1>
              <H3>Merci de selectionner une langue</H3>
            </View>
            <View style={styles.titre}>
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
              <View style={{margin: 8}}>
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  textStyle={{fontFamily: 'JosefinSans-Regular'}}
                  iconStyle={{borderColor: 'red'}}
                  unfillColor="#FFFFFF"
                  text="Custom Checkbox"
                  onPress={(isChecked: boolean) => {
                    setColorCard('W');
                  }}
                />
              </View>
              <View style={{margin: 8}}>
                <BouncyCheckbox
                  isChecked={true}
                  iconStyle={{borderColor: 'blue', borderRadius: 10}}
                  textStyle={{fontFamily: 'JosefinSans-Regular'}}
                  unfillColor="white"
                  borderRadius={10}
                  text="Custom Disabled Checkbox Example"
                  onPress={(isChecked: boolean) => {
                    setColorCard('B');
                  }}
                />
              </View>
              <Button
                info
                onPress={() => HandleRefresh2(selectedValue)}
                style={{height: 50, width: 400}}>
                <Text>Afficher</Text>
              </Button>
            </View>
          </Container>
        </View>
      </ScrollView>
    );
  } else {
    if (page <= 1) {
      return (
        <ScrollView>
          <View style={styles.titre}>
            <H1>Liste des cartes Magic</H1>
            <H3>Merci de selectionner une langue</H3>
          </View>
          <View style={styles.titre}>
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
          </View>
          <Button
            info
            onPress={() => HandleRefresh2(selectedValue)}
            style={{height: 50, width: 400}}>
            <Text>Afficher</Text>
          </Button>
          <View style={{backgroundColor: 'black'}}>{list(data)}</View>
          <View style={{backgroundColor: 'black'}}>
            <Button primary onPress={() => changePage(2)}>
              <Text> Suivant </Text>
            </Button>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.titre}>
            <H1>Liste des cartes Magic</H1>
            <H3>Merci de selectionner une langue</H3>
          </View>
          <View style={styles.titre}>
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
          </View>
          <View>
            <Button
              info
              onPress={() => HandleRefresh2(selectedValue)}
              style={{height: 50, width: 400}}>
              <Text>Afficher</Text>
            </Button>
          </View>
          <View style={{backgroundColor: 'black'}}>{list(data)}</View>
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
  }
};

export default CardList;
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
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'green',
    width: '40%',
    height: 40,
  },
  titre: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
