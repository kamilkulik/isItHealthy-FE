import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import ImagePicker from '../components/ImagePicker'
import Colors from '../constants/Colors';
import Card from '../components/Card';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory-native';
import adjustPadding from '../utils/adjustPadding';

export default function isItHealthy({ route, navigation }) {
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
      for (let i = 0; i < 5; i++) {
        probs.push(Number.parseFloat(probArray[i][1]).toPrecision(2)*100)
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
      for (let i = 0; i < 5; i++) {
        data.push({ key: apiLabels[i], value: apiProbs[i] })
      }
  }

  return (
    <React.Fragment>
      {apiLabels ? (
        <View style={styles.container}>
          <Card>
            <Text style={styles.checking}>You snapped:</Text>
            <VictoryChart 
              width={380}
              height={300}
              padding={{left: adjustPadding(apiLabels), top: 30, bottom: 50, right: 40}}
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
                barRatio={1.0}
                cornerRadius={{ topLeft: 6, topRight: 6 }}
                data={data} 
                x="key" 
                y="value" 
                sortKey='value'
                sortOrder='ascending'
                labels={({datum}) => `${Number.parseFloat(datum._y).toPrecision(2)}%`}
                horizontal={true}
                style={{
                  data: {
                    fill: Colors.brigthGreen,
                    stroke: Colors.brigthGreen,
                    strokeWidth: 2
                  },
                  labels: {
                    fill: ({ datum }) => (datum._x === 5 ? Colors.brigthGreen : Colors.black),
                    fontSize: ({ datum }) => (datum._x === 5 ? 25 : 15),
                    strokeWidth: 50,
                  }
                }}
                animate={{
                  duration: 3000,
                  onLoad: { duration: 2000 }
                }}
              />
            </VictoryChart>
          </Card>
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
  }
});

/*



<Text style={styles.checking}>You snapped:</Text>
        <View style={{ flex: 0.4}}>
          <View style={{ flexDirection: 'row' }}>
            <Picker
              selectedValue={result}
              style={{ height: 30, width: 200 }}
              onValueChange={(itemValue) => setResult(itemValue)}
              >
              {Object.entries(apiRes).map(item => {
                return (
                  <Picker.Item key={item[0]} label={item[1]} value={item[1]} />
                )
              })
              }
            </Picker>
          </View>
        </View>


<Text style={styles.result}>{ result }</Text>
          <TouchableOpacity 
            style={styles.arrow} 
            onPress={() => picker}>
            <Icon 
              name='keyboard-arrow-down'
              type='material'
              size={38}
              color="#616161"
              containerStyle={styles.arrow}
              />
          </TouchableOpacity>

                    

*/