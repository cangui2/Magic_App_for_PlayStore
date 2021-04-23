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
  Alert,
  Button,
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
  Title,
  H1,
  H3,
  Picker,
} from 'native-base';
import Database from '../Database/Database';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import White from '../Assets/images/white.png';
import {white} from 'react-native-paper/lib/typescript/styles/colors';
import RNPickerSelect from 'react-native-picker-select';

const CardList = ({navigation}) => {
  const db = new Database();
  let bouncyCheckboxRef: BouncyCheckbox | null = null;
  const [checkboxState, setCheckboxState] = React.useState(false);
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState(null);
  const [language, setLanguage] = useState();
  const [selectedValue, setSelectedValue] = useState('French');
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(false);
  const [dataCart, setDataCart] = useState([]);
  const idx = useState(dataCart.indexOf(dataCart));
  const [colorCard, setColorCard] = useState('R');

  const HandleRefresh2 = value => {
    setSelectedValue(value);
    db.listCardByLanguage(value, page, colorCard).then(result => {
      setData(result);
    });
  };
  const cartSetting = value => {
    console.log('bouton valide');
    const index = dataCart.indexOf(value);
    console.log(index);
    if (index === -1) {
      dataCart.push(value);

      console.log(Object.keys(dataCart));
    } else {
      dataCart.splice(index, 1);
      console.log('supp');
    }
    console.log(dataCart);

    navigation.push('Home', {
      data: dataCart,
    });
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
        <View style={{margin: 10, backgroundColor: 'white'}} key={index}>
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
              <BouncyCheckbox
                text=""
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                onPress={(checked: boolean) => {
                  cartSetting(element.id);
                }}
              />
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
          <View>
            <View style={styles.titre}>
              <H1>Liste des cartes Magic</H1>
              <H3>Merci de selectionner une langue</H3>
            </View>
            <View style={styles.titre}>
              <View
                style={{height: 50, borderWidth: 1, borderColor: '#20232a'}}>
                <Picker
                  selectedValue={selectedValue}
                  style={{width: 250}}
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
              <View style={{flex: 1, justifyContent: 'center', paddingTop: 20}}>
                <View
                  style={{
                    width: '75%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <BouncyCheckbox
                      style={{width: '25%', padding: 1}}
                      size={25}
                      fillColor="beige"
                      textStyle={{fontFamily: 'JosefinSans-Regular'}}
                      iconStyle={{borderColor: 'red'}}
                      unfillColor="#FFFFFF"
                      text={''}
                      onPress={(isChecked: boolean) => {
                        setColorCard('W');
                      }}
                    />
                    <Image
                      style={{width: '35%', height: '130%', padding: 1}}
                      source={require('../Assets/images/white.png')}
                    />

                    <BouncyCheckbox
                      style={{width: '25%', padding: 1}}
                      isChecked={true}
                      fillColor="red"
                      iconStyle={{borderColor: 'red', borderRadius: 10}}
                      textStyle={{fontFamily: 'JosefinSans-Regular'}}
                      unfillColor="white"
                      borderRadius={10}
                      text=" "
                      onPress={(isChecked: boolean) => {
                        setColorCard('R');
                      }}
                    />
                    <Image
                      style={{width: '35%', height: '130%', padding: 1}}
                      source={require('../Assets/images/red.png')}
                    />
                    <BouncyCheckbox
                      style={{width: '35%', padding: 1, margin: -5}}
                      size={25}
                      fillColor="black"
                      textStyle={{fontFamily: 'JosefinSans-Regular'}}
                      iconStyle={{borderColor: 'black'}}
                      unfillColor="#FFFFFF"
                      text=""
                      onPress={(isChecked: boolean) => {
                        setColorCard('B');
                      }}
                    />
                    <Image
                      style={{
                        width: '35%',
                        height: '130%',
                        padding: 1,
                        margin: -5,
                      }}
                      source={require('../Assets/images/black.png')}
                    />
                    <BouncyCheckbox
                      style={{width: '35%', padding: 0, margin: 0}}
                      size={25}
                      fillColor="green"
                      textStyle={{fontFamily: 'JosefinSans-Regular'}}
                      iconStyle={{borderColor: 'green'}}
                      unfillColor="#FFFFFF"
                      text=""
                      onPress={(isChecked: boolean) => {
                        setColorCard('G');
                      }}
                    />
                    <Image
                      style={{
                        width: '35%',
                        height: '130%',
                        padding: 0,
                        margin: -10,
                      }}
                      source={require('../Assets/images/green.png')}
                    />
                  </View>
                </View>
              </View>
              <View />
            </View>
          </View>
        </View>
        <View style={{paddingTop: 30}}>
          <Button
            title="Rechercher"
            onPress={() => HandleRefresh2(selectedValue)}
          />
        </View>
      </ScrollView>
    );
  } else {
    if (page <= 1) {
      return (
        <ScrollView>
          <View>
            <View>
              <View style={styles.titre}>
                <H1>Liste des cartes Magic</H1>
                <H3>Merci de selectionner une langue</H3>
              </View>
              <View style={styles.titre}>
                <View
                  style={{height: 50, borderWidth: 1, borderColor: '#20232a'}}>
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
                <View
                  style={{flex: 1, justifyContent: 'center', paddingTop: 20}}>
                  <View
                    style={{
                      width: '75%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <BouncyCheckbox
                        style={{width: '25%', padding: 1}}
                        size={25}
                        fillColor="beige"
                        textStyle={{fontFamily: 'JosefinSans-Regular'}}
                        iconStyle={{borderColor: 'red'}}
                        unfillColor="#FFFFFF"
                        text={''}
                        onPress={(isChecked: boolean) => {
                          setColorCard('W');
                        }}
                      />
                      <Image
                        style={{width: '35%', height: '130%', padding: 1}}
                        source={require('../Assets/images/white.png')}
                      />

                      <BouncyCheckbox
                        style={{width: '25%', padding: 1}}
                        isChecked={true}
                        fillColor="red"
                        iconStyle={{borderColor: 'red', borderRadius: 10}}
                        textStyle={{fontFamily: 'JosefinSans-Regular'}}
                        unfillColor="white"
                        borderRadius={10}
                        text=" "
                        onPress={(isChecked: boolean) => {
                          setColorCard('R');
                        }}
                      />
                      <Image
                        style={{width: '35%', height: '130%', padding: 1}}
                        source={require('../Assets/images/red.png')}
                      />
                      <BouncyCheckbox
                        style={{width: '35%', padding: 1, margin: -5}}
                        size={25}
                        fillColor="black"
                        textStyle={{fontFamily: 'JosefinSans-Regular'}}
                        iconStyle={{borderColor: 'black'}}
                        unfillColor="#FFFFFF"
                        text=""
                        onPress={(isChecked: boolean) => {
                          setColorCard('B');
                        }}
                      />
                      <Image
                        style={{
                          width: '35%',
                          height: '130%',
                          padding: 1,
                          margin: -5,
                        }}
                        source={require('../Assets/images/black.png')}
                      />
                      <BouncyCheckbox
                        style={{width: '35%', padding: 0, margin: 0}}
                        size={25}
                        fillColor="green"
                        textStyle={{fontFamily: 'JosefinSans-Regular'}}
                        iconStyle={{borderColor: 'green'}}
                        unfillColor="#FFFFFF"
                        text=""
                        onPress={(isChecked: boolean) => {
                          setColorCard('G');
                        }}
                      />
                      <Image
                        style={{
                          width: '35%',
                          height: '130%',
                          padding: 0,
                          margin: -10,
                        }}
                        source={require('../Assets/images/green.png')}
                      />
                    </View>
                  </View>
                </View>
                <View />
                <View style={{paddingTop: 30}}>
                  <Button
                    title="Learn More"
                    onPress={() => HandleRefresh2(selectedValue)}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: 'black'}}>{list(data)}</View>
          <View style={{backgroundColor: 'black'}}>
            <Button primary title={'Suivant'} onPress={() => changePage(2)} />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View>
            <View>
              <View style={styles.titre}>
                <H1>Liste des cartes Magic</H1>
                <H3>Merci de selectionner une langue</H3>
              </View>
              <View style={styles.titre}>
                <View
                  style={{height: 50, borderWidth: 1, borderColor: '#20232a'}}>
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
                <View
                  style={{flex: 1, justifyContent: 'center', paddingTop: 20}}>
                  <View
                    style={{
                      width: '75%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <BouncyCheckbox
                        style={{width: '25%', padding: 1}}
                        size={25}
                        fillColor="beige"
                        textStyle={{fontFamily: 'JosefinSans-Regular'}}
                        iconStyle={{borderColor: 'red'}}
                        unfillColor="#FFFFFF"
                        text={''}
                        onPress={(isChecked: boolean) => {
                          setColorCard('W');
                        }}
                      />
                      <Image
                        style={{width: '35%', height: '130%', padding: 1}}
                        source={require('../Assets/images/white.png')}
                      />

                      <BouncyCheckbox
                        style={{width: '25%', padding: 1}}
                        isChecked={true}
                        fillColor="red"
                        iconStyle={{borderColor: 'red', borderRadius: 10}}
                        textStyle={{fontFamily: 'JosefinSans-Regular'}}
                        unfillColor="white"
                        borderRadius={10}
                        text=" "
                        onPress={(isChecked: boolean) => {
                          setColorCard('R');
                        }}
                      />
                      <Image
                        style={{width: '35%', height: '130%', padding: 1}}
                        source={require('../Assets/images/red.png')}
                      />
                      <BouncyCheckbox
                        style={{width: '35%', padding: 1, margin: -5}}
                        size={25}
                        fillColor="black"
                        textStyle={{fontFamily: 'JosefinSans-Regular'}}
                        iconStyle={{borderColor: 'black'}}
                        unfillColor="#FFFFFF"
                        text=""
                        onPress={(isChecked: boolean) => {
                          setColorCard('B');
                        }}
                      />
                      <Image
                        style={{
                          width: '35%',
                          height: '130%',
                          padding: 1,
                          margin: -5,
                        }}
                        source={require('../Assets/images/black.png')}
                      />
                      <BouncyCheckbox
                        style={{width: '35%', padding: 0, margin: 0}}
                        size={25}
                        fillColor="green"
                        textStyle={{fontFamily: 'JosefinSans-Regular'}}
                        iconStyle={{borderColor: 'green'}}
                        unfillColor="#FFFFFF"
                        text=""
                        onPress={(isChecked: boolean) => {
                          setColorCard('G');
                        }}
                      />
                      <Image
                        style={{
                          width: '35%',
                          height: '130%',
                          padding: 0,
                          margin: -10,
                        }}
                        source={require('../Assets/images/green.png')}
                      />
                    </View>
                  </View>
                </View>
                <View />
              </View>
            </View>
            <View style={{paddingTop: 30}}>
              <Button
                title="Learn More"
                onPress={() => HandleRefresh2(selectedValue)}
              />
            </View>
          </View>
          <View style={{backgroundColor: 'black'}}>{list(data)}</View>
          <View style={styles.container}>
            <Button title={'Retour'} primary onPress={() => changePage(1)} />
            <Button title={'Suivant'} primary onPress={() => changePage(2)} />
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
