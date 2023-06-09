import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DeliverHistoryTable from './DeliverHistoryTable';
import DraggableMarker from '../../maps/googlemap';
import ChartComponent from './chartComponent';
import CollapsibleTable from './dataTableDetail';

const SideMenu = ({ onButtonPress }) => {
  return (
    <View style={styles.sideMenu}>
      <TouchableOpacity style={styles.menuButton} onPress={() => onButtonPress(0)}>
        <Text style={styles.buttonText}>Harita Durumu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => onButtonPress(1)}>
        <Text style={styles.buttonText}>Dağıtım Tablosu ve Günlük Grafik</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => onButtonPress(2)}>
        <Text style={styles.buttonText}> ATM Tablo Bilgisi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => onButtonPress(3)}>
        <Text style={styles.buttonText}>Button 4</Text>
      </TouchableOpacity>
    </View>
  );
};

const Content1 = () => {
  return (
    <View style={styles.contentContainer}>
     <View style={styles.draggableContainer}>
          <DraggableMarker />
        </View>

    </View>
  );
};

const Content2 = () => {
  return (
    <View style={styles.contentContainer}>
            <View style={styles.tableContainer}>
          <DeliverHistoryTable />
        </View>
        <View >
          <ChartComponent />
        </View>
    </View>
  );
};

const Content3 = () => {
  return (
    <View style={styles.contentContainer}>
       <View style={styles.tableContainer}>
          <CollapsibleTable />
        </View>
    </View>
  );
};

const MainScreen = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const onButtonPress = (index) => {
    setSelectedButtonIndex(index);
  };

  let selectedContent;
  switch (selectedButtonIndex) {
    case 0:
      selectedContent = <Content1 />;
      break;
    case 1:
      selectedContent = <Content2 />;
      break;
    case 2:
      selectedContent = <Content3 />;
      break;
    case 3:
      // ...
      break;
    default:
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sideMenuContainer}>
        <SideMenu onButtonPress={onButtonPress} />
      </View>
      <View style={styles.contentContainer}>
        {selectedContent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sideMenuContainer: {

    flex: 2,
    backgroundColor: '#ddd',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  sideMenu: {
    paddingTop: 75,
    flex: 1,
  },
  menuButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
   
    flex: 8,
    backgroundColor: '#fff',
  },
  contentText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  draggableContainer: {
    flex: 1,
    backgroundColor: 'darkgrey',
  },
  tableContainer: {
    paddingTop: 75,
    width:"50%",
    flex: 1,
    backgroundColor: 'darkgrey',
  },
});

export default MainScreen;
