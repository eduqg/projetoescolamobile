import React, { useState, useEffect } from 'react';
import Background from '../../components/Background';
import { Body } from '../../components/Body';
// import ModalNotes from '../../components/Modal';
import { Text, View, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import dataInfo from '../../services/bilheteescolarserver.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  BodyTop,
  NewClass,
  BodyMiddle,
  BodyButtom,
  TitleText,
  ListClass,
  Item,
  TextItem,
  VisualizationItem,
  VisualizationTitle,
  VisualizationBody,
  VisualizationFotter,
  NoData,
  NoDataText,
  ButtomExit,
} from './styles';
import { HeaderBar, HeaderButton, HeaderButtonText } from '../../styles/header';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Classroom({ isFocused }) {
  const [dataVisualization, setDataVisualization] = useState([]);
  const [dataEdition, setDataEdition] = useState([]);
  const [editable, setEditable] = useState(false);
  const [dataView, setDataView] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { classes } = dataInfo;

  function handleVisualization(id) {
    classes.map(item => {
      if (item.id === id) {
        setDataVisualization(item.students);
      }
    });
    setDataView(true);
  }

  function handleModalNew() {
    setEditable(false);
    setModalVisible(true);
  }

  function handleModalEdit(item) {
    setEditable(true);
    setDataEdition(item);
    setModalVisible(true);
  }

  // function modalClose() {
  //   setModalVisible(false);
  // }

  function handleRemove() {
    Alert.alert('Warning', 'Not work in Demo App!');
  }

  useEffect(() => {
    setDataVisualization([]);
    setDataView(false);
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <Body style={{ justifyContent: 'space-between' }}>
          <BodyTop>
            <TitleText>Bilhetes</TitleText>
            <ListClass
              data={classes}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Item>
                  <View>
                    <TouchableOpacity
                      onPress={() => handleVisualization(item.id)}
                    >
                      <TextItem>{`${item.grade}º ${item.letter} - ${item.shift}`}</TextItem>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity onPress={() => handleModalEdit(item)}>
                      <Text style={{ color: '#0000FF' }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRemove}>
                      <Icon name={'clear'} size={25} color={'#FF0000'} />
                    </TouchableOpacity>
                  </View>
                </Item>
              )}
            />
            <NewClass onPress={handleModalNew}>NOVA TURMA</NewClass>
          </BodyTop>
          <BodyButtom>
            <ListClass
              data={dataVisualization}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Item>
                  <View>
                    <TouchableOpacity
                      onPress={() => handleVisualization(item.id)}
                    >
                      <TextItem>{item.name}</TextItem>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity onPress={() => handleModalEdit(item)}>
                      <Text style={{ color: '#0000FF' }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRemove}>
                      <Icon name={'clear'} size={25} color={'#FF0000'} />
                    </TouchableOpacity>
                  </View>
                </Item>
              )}
            />
            <NewClass onPress={handleModalNew}>NOVO ALUNO</NewClass>
          </BodyButtom>
        </Body>
      </Container>
    </Background>
  );
}

Classroom.navigationOptions = ({ navigation }) => ({
  header: (
    <HeaderBar>
      <HeaderButton onPress={() => navigation.navigate('Send')}>
        <HeaderButtonText active={false}>Help</HeaderButtonText>
      </HeaderButton>

      <HeaderButton onPress={() => navigation.navigate('Dashboard')}>
        <HeaderButtonText active={false}>Status</HeaderButtonText>
      </HeaderButton>

      <HeaderButton onPress={() => navigation.navigate('Send')}>
        <HeaderButtonText active={false}>Send</HeaderButtonText>
      </HeaderButton>
    </HeaderBar>
  ),
});

export default withNavigationFocus(Classroom);
