import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from '../components/ImagePicker'
import Colors from '../constants/Colors';
import Card from '../components/Card';
import CustomButton from '../components/Button'
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory-native';
import adjustPadding from '../utils/adjustPadding';

export function isItHealthy({ route, navigation, photo }) {
  const { photoData } = route.params;

  const [apiProbs, setApiProbs] = useState('')
  const [apiLabels, setApiLabels] = useState('')

  useEffect(() => {
    if (photoData) {
      const { data : { description }} = photoData;
      const { data : { score }} = photoData;
      const probArray = Object.entries(score);
      const labelArray = Object.entries(description);
      let probs = [], labels = [];
      for (let i = 0; i < 5 && i < probArray.length; i++) {
        probs.push(Math.round(probArray[i][1]*100))
        labels.push(labelArray[i][1])
      }
      //probArray.map(item => (Number.parseFloat(item[1]).toPrecision(2)*100));
      //const labels = labelArray.map(item => (item[1]));
      setApiProbs(probs)
      setApiLabels(labels)
    } 
  }, [])

  let data = [];
  if (apiLabels) {
      for (let i = 0; i < 5 && i < apiProbs.length; i++) {
        data.push({ key: apiLabels[i], value: apiProbs[i] })
      }
  }

  return (
    <React.Fragment>
      {apiLabels ? (
        <View style={styles.container}>
          <View style={{ flex: 0.8}}>
          <Card style={{ alignItems: 'center' }}>
            <View style={{ flex: 0.4 }}>
              <Text style={styles.checking}>You snapped:</Text>
              <View style={styles.previewContainer}>
                <Image 
                  source={{ uri: photo.photoUri }}
                  style={styles.preview}
                  resizeMode='contain'
                />
              </View>
            </View>
            <View style={{ flex: 0.4}}>
            <VictoryChart 
              width={380}
              height={250}
              padding={{left: adjustPadding(apiLabels), top: 30, bottom: 50, right: 60}}
              domainPadding={{ x: [25, 20], y: [0, 10] }}
              domain={({y: [0, 100]})}
            >
              <VictoryAxis 
                dependentAxis={true}
                label='% of certainty'
              />
              <VictoryAxis 
                crossAxis={true}
                style={{
                  tickLabels: {
                    fontSize: 15,
                  }
                }}
              />
              <VictoryBar
                barRatio={0.8}
                cornerRadius={{ topLeft: 6, topRight: 6 }}
                data={data} 
                x="key" 
                y="value" 
                sortKey='value'
                sortOrder='ascending'
                labels={({datum}) => `${Math.round(datum._y)}%`}
                horizontal={true}
                style={{
                  data: {
                    fill: ({ datum }) => (
                      datum._x === 5 ? Colors.brigthGreen : 
                      datum._x === 4 ? Colors.brigthGreenTwo : 
                      datum._x === 3 ? Colors.brigthGreenThree : 
                      datum._x === 2 ? Colors.brigthGreenFour : 
                      datum._x === 1 ? Colors.brigthGreenFive : Colors.brigthGreen
                      ),
                    stroke: Colors.brigthGreen,
                    strokeWidth: 0
                  },
                  labels: {
                    fill: ({ datum }) => (datum._x === 5 ? Colors.brigthGreen : Colors.black),
                    fontSize: ({ datum }) => (datum._x === 5 ? 25 : 15),
                    strokeWidth: 50,
                  }
                }}
                animate={{
                  onLoad: { duration: 1500 }
                }}
              />
            </VictoryChart>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Camera')}
              >
                <CustomButton style={styles.button}>
                  <Text style={styles.text}>Camera</Text>
                </CustomButton>
              </TouchableOpacity>
              <ImagePicker 
                navigation={navigation}
                style={styles.buttonCamera}
                textStyle={styles.textCamera}
              />
            </View>
          </Card>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.error}>For some reason the server didn't like your photo. Try uploading another one</Text>
          <ImagePicker 
            navigation={navigation}
            textStyle={styles.buttonText}
            />
        </View>
      )
    }
    </React.Fragment>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checking: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.darkGray,
    fontWeight: '800',
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 50,
    marginBottom: 50
  },
  result: {
    fontSize: 38,
    textAlign: 'center'
  },
  arrow: {
    marginTop: 3
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.white,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  previewContainer: {
    width: 180,
    height: 130,
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 15,
    shadowOpacity: 0.6,
    elevation: 5,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 40,
    flex: 0.2,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 0,
  },
  button:{
    width: 170,
  },
  buttonCamera: {
    backgroundColor: Colors.white,
    width: 170,
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.white,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  textCamera: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.brigthGreen,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => ({
  photo: state.photo
})

export default connect(mapStateToProps)(isItHealthy);