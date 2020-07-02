import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChartComponent from './component/LineChart/LineChartComponent';
import Select from 'react-select';
import states from './utils/StatesEnum';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [dataId, setDataId] = useState(0);
  const [selectedOption, selectOption] = useState('us');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(`https://covidtracking.com/api/v1/${selectedOption}/daily.json`)
    setIsLoading(false);
    setData(response.data);
  }

  const selectNewArea = (value) => {
    setDataId(dataId + 1);
    selectOption(value);
  }

  useEffect(() => {
    fetchData();
  }, [dataId])

  return (
    <div className="App">
      <h1 className="App-header">
        Covid Charts
      </h1>

      <div className="App">
        <h3 className="chart-title">Showing chart for {states.filter((state) => state.value === selectedOption)[0].label}</h3>
        {isLoading ? <Spinner animation="border" /> :
          <Container>
            <Row>
              <Col md={3} xs={12}>
                <Container>
                  <Row>
                    <Col md={12}>
                      <Select
                        options={states}
                        onChange={event => selectNewArea(event.value)}
                        value={states.filter((state) => state.value === selectedOption)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total # of Positive Cases: {data[0] ? data[0].positive : ''}
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col>
                <LineChartComponent covidData={data} />
              </Col>
            </Row>
          </Container>
        }
      </div>
    </div>
  );
}

export default App;
