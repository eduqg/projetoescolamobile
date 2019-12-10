import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import dataInfo from '../../services/bilheteescolarserver.json';
import Background from '../../components/Background';
import { Body } from '../../components/Body';
import Modal from '../../components/Modal';
import Selector from '../../components/Selector';

import {
  Container,
  BodyTop,
  NewClass,
  BodyButtom,
  ButtonClass,
  TitleView,
  TitleText,
  ListClass,
  Item,
  CardItem,
  TextItem,
  TextItemStudent,
  NoData,
  NoDataText,
} from './styles';
import { Title, TitleEdit, ModalLabel } from '../../components/Modal/styles';

const classesToPick = [
  { id: 0, name: '1º A Matutino' },
  { id: 1, name: '2º A Matutino' },
  { id: 2, name: '1º C Matutino' },
  { id: 3, name: '4º B Vespertino' },
  { id: 4, name: '3º B Vespertino' },
];

function Classroom({ isFocused }) {
  const [dataVisualization, setDataVisualization] = useState([]);
  const { classes } = dataInfo;
  const [pickedClass, setPickedClass] = useState('');

  // States to Class Modal
  const [editingClass, setEditingClass] = useState(false);
  const [showModalClass, setShowModalClass] = useState(false);
  const [currentClass, setCurrentClass] = useState(false);
  const [className, setClassName] = useState('');

  // States to Students Modal
  const [editingStudent, setEditingStudent] = useState(false);
  const [showModalStudent, setShowModalStudent] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Map items from json-server
  function handleVisualization(id) {
    classes.map(item => {
      if (item.id === id) {
        setDataVisualization(item.students);
        setCurrentClass(item.name);
      }
      return null;
    });
  }

  // Sets New Class Modal
  function handleModalNewClass() {
    setEditingClass(false);
    setClassName('');
    setShowModalClass(true);
  }

  // Sets Edit Class Modal
  function handleModalEditClass(item) {
    setEditingClass(true);
    setClassName(item.name);
    setShowModalClass(true);
  }

  // Sets New Student Modal
  function handleModalNewStudent() {
    setEditingStudent(false);
    setStudentName('');
    setParentName('');
    setPhoneNumber('');
    setShowModalStudent(true);
  }

  // Sets Edit Student Modal
  function handleModalEditStudent(item, studentClass) {
    setEditingStudent(true);
    setStudentName(item.name);
    setParentName(item.parent.name);
    setPhoneNumber(item.parent.phone);
    setPickedClass(studentClass);
    setShowModalStudent(true);
  }

  // Close Modal
  function modalClose() {
    setShowModalClass(false);
    setShowModalStudent(false);
  }

  // Button to delete class or student
  function handleRemove() {
    Alert.alert('Warning', 'Not work in Demo App!');
  }

  useEffect(() => {
    setDataVisualization([]);
    setCurrentClass('');
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <Body style={{ justifyContent: 'space-between' }}>
          <BodyTop>
            <TitleText active>Classes</TitleText>
            <ListClass
              data={classes}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Item clicable>
                  <View>
                    <ButtonClass onPress={() => handleVisualization(item.id)}>
                      <TextItem>{item.name}</TextItem>
                    </ButtonClass>
                  </View>
                  <CardItem>
                    <TouchableOpacity
                      onPress={() => handleModalEditClass(item)}
                      style={{ margin: 10 }}
                    >
                      <Icon name="edit" size={25} color="#024f83" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRemove}>
                      <Icon name="clear" size={25} color="#FF0000" />
                    </TouchableOpacity>
                  </CardItem>
                </Item>
              )}
            />
            <NewClass onPress={handleModalNewClass}>New Class</NewClass>
          </BodyTop>

          {currentClass !== '' ? (
            <BodyButtom>
              <TitleView>
                <TitleText active>Students</TitleText>
                <TitleText active={false}>
                  {currentClass === '' ? 'Select a class' : currentClass}
                </TitleText>
              </TitleView>
              <ListClass
                data={dataVisualization}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <Item clicable={false}>
                    <View>
                      <TextItemStudent>{item.name}</TextItemStudent>
                    </View>
                    <CardItem>
                      <TouchableOpacity
                        onPress={() =>
                          handleModalEditStudent(item, currentClass)
                        }
                        style={{ margin: 10 }}
                      >
                        <Icon name="edit" size={25} color="#024f83" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleRemove}>
                        <Icon name="clear" size={25} color="#FF0000" />
                      </TouchableOpacity>
                    </CardItem>
                  </Item>
                )}
              />
            </BodyButtom>
          ) : (
            <NoData>
              <NoDataText>Please, select a class to show students.</NoDataText>
            </NoData>
          )}
          <View style={{ marginHorizontal: 20 }}>
            <NewClass onPress={handleModalNewStudent}>New Student</NewClass>
          </View>
        </Body>
      </Container>
      {showModalClass && (
        <Modal
          visible={showModalClass}
          editable={editingClass}
          dismiss={modalClose}
        >
          <Title>{editingClass ? 'Class Edit' : 'New Class'}</Title>
          <ModalLabel>Class</ModalLabel>
          <TitleEdit
            autoCorrect={false}
            placeholder="Class Name"
            placeholderTextColor="rgba(0,0,0,0.3)"
            disableUnderline
            value={className}
            onChangeText={setClassName}
          />
        </Modal>
      )}
      {showModalStudent && (
        <Modal
          visible={showModalStudent}
          editable={editingStudent}
          dismiss={modalClose}
        >
          <Title>{editingStudent ? 'Student Edit' : 'New Student'}</Title>
          <ModalLabel>Student Name</ModalLabel>
          <TitleEdit
            autoCorrect={false}
            placeholder="Student name"
            placeholderTextColor="rgba(0,0,0,0.3)"
            disableUnderline
            value={studentName}
            onChangeText={setStudentName}
          />
          <ModalLabel>Parent Name</ModalLabel>
          <TitleEdit
            autoCorrect={false}
            placeholder="Parent Name"
            placeholderTextColor="rgba(0,0,0,0.3)"
            disableUnderline
            value={parentName}
            onChangeText={setParentName}
          />
          <ModalLabel>Phone</ModalLabel>
          <TitleEdit
            autoCorrect={false}
            placeholder="(XX) 91234-91244"
            placeholderTextColor="rgba(0,0,0,0.3)"
            disableUnderline
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />
          <ModalLabel>Class</ModalLabel>
          <Selector
            selectedValue={pickedClass}
            onValueChange={value => setPickedClass(value)}
            soptions={classesToPick}
            icon="keyboard-arrow-down"
            mode="dialog"
            name="pickclass"
          />
        </Modal>
      )}
    </Background>
  );
}

Classroom.propTypes = {
  isFocused: PropTypes.bool,
};

Classroom.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(Classroom);
