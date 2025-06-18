import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const StockInformation = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [100, 200, 300, 400, 500, 600],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Tabs */}
      <View style={styles.tabs}>
        {['All Market', 'Watchlist', 'Orders', 'Price Alerts'].map((tab) => (
          <TouchableOpacity key={tab} style={styles.tabButton}>
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stock Price and Info */}
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.ticker}>AMZN</Text>
          <Text style={styles.company}>Amazon Inc</Text>
          <Text style={styles.currency}>Euro/USD 🇺🇸</Text>
        </View>
        <Text style={styles.price}>$1250.71</Text>
        <Text style={styles.profitLoss}>+9.77% +9.01</Text>
        <Text style={styles.positionPL}>Position P/L = + $240</Text>
        <TouchableOpacity style={styles.depositButton}>
          <Text style={styles.depositText}>Make a deposit</Text>
        </TouchableOpacity>
      </View>

      {/* Low, High, and S Values Box */}
      <View style={styles.lowHighBox}>
        <Text style={styles.lowHighText}>Low: 123</Text>
        <Text style={styles.lowHighText}>High: 1240</Text>
        <Text style={styles.lowHighText}>S: 0.2</Text>
      </View>

      {/* Graph Section with Stock Chart */}
      <View style={styles.graphSection}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40} // Full width minus padding
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#333',
            backgroundGradientFrom: '#444',
            backgroundGradientTo: '#555',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
       
      </View>

      {/* Key Statistics */}
      <View style={styles.keyStatistics}>
        <Text style={styles.sectionTitle}>Key Statistics</Text>

        <View style={styles.statsRow}>
          <Text style={styles.text1}>Market Cap:</Text>
          <Text style={styles.text1}>10.436 B</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.text1}>Current share outstanding:</Text>
          <Text style={styles.text1}>10.436 B</Text>
        </View>

        {/* Period Data Table */}
        <View style={styles.periodTable}>
        <View style={[styles.periodDataRow, styles.tableRow]}>
            <Text style={[styles.periodHeader, styles.tableCell]}>PERIOD</Text>
            {['2022', '2021', '2020'].map((year) => (
            <Text key={year} style={[styles.periodHeader, styles.tableCell]}>{year}</Text>
            ))}
        </View>
        {[
            { period: 'Q1', data: ['454 B', '448 B', '439 B'] },
            { period: 'Q2', data: ['362 B', '355 B', '331 B'] },
            { period: 'Q3', data: ['-', '46 B', '329 B'] },
            { period: 'Annual', data: ['1.631 B', '1.523 B', '1.489 B'] },
            { period: 'TTM (Q2)', data: ['1.535 B', '1.522 B', '1.330 B'] }
        ].map((row, index) => (
            <View key={index} style={[styles.periodDataRow, styles.tableRow]}>
            <Text style={[styles.periodLabel, styles.tableCell]}>{row.period}</Text>
            {row.data.map((data, i) => (
                <Text key={i} style={[styles.periodData, styles.tableCell]}>{data}</Text>
            ))}
            </View>
        ))}
        </View>



        {/* Valuation Section */}
        <View style={styles.valuation}>
          <Text style={styles.sectionTitle}>Valuation</Text>
          <View style={styles.statsRow}>
            <Text style={styles.text1}>Current PE Ratio (Annualised):</Text>
            <Text style={styles.text1}>6.40</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.text1}>Current PE Ratio (TTM):</Text>
            <Text style={styles.text1}>6.80</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.text1}>Forward PE Ratio:</Text>
            <Text style={styles.text1}>-</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.text1}>Current Price to Sales (TTM):</Text>
            <Text style={styles.text1}>1.53</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.text1}>Current Price to Book Value:</Text>
            <Text style={styles.text1}>0.98</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.text1}>Current Price to Cashflow (TTM):</Text>
            <Text style={styles.text1}>4.82</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.text1}>Current Price to Free Cashflow (TTM):</Text>
            <Text style={styles.text1}>5.18</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    padding: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'rgba(0, 50, 80, 0.5)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticker: {
    fontSize: 22,
    color: '#fff',
  },
  company: {
    color: '#fff',
  },
  currency: {
    color: '#fff',
  },
  price: {
    fontSize: 32,
    color: '#fff',
    marginVertical: 10,
  },
  profitLoss: {
    color: '#4caf50',
  },
  positionPL: {
    color: '#4caf50',
    marginBottom: 10,
  },
  depositButton: {
    backgroundColor: '#1e88e5',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  depositText: {
    color: '#fff',
    textAlign: 'center',
  },
  lowHighBox: {
    backgroundColor: 'rgba(0, 50, 80, 0.5)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lowHighText: {
    color: '#fff',
    fontSize: 16,
  },
  graphSection: {
    backgroundColor: '#444',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  timeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  timeButton: {
    backgroundColor: '#666',
    padding: 5,
    borderRadius: 5,
  },
  timeButtonText: {
    color: '#fff',
  },
  keyStatistics: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',  // Text color changed to white
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  periodTable: {
    marginTop: 20,
  },
  periodHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodHeader: {
    color: '#fff',  // Header text color changed to white
    flex: 1,
    textAlign: 'center',
  },
  periodDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  periodLabel: {
    color: '#fff',  // Period label text color changed to white
    flex: 1,
  },
  periodData: {
    color: '#fff',  // Period data text color changed to white
    flex: 1,
    textAlign: 'center',
  },
  valuation: {
    marginTop: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  statsRowText: {
    color: '#fff',  // Stat row text color changed to white
  },
  text1:{
    color: '#fff',
  },
  periodTable: {
    marginTop: 20,
    borderWidth: 1,           // Outer border for the table
    borderColor: '#fff',      // White border color
    borderRadius: 5,          // Rounded border for the table
  },
  periodDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableRow: {
    borderBottomWidth: 1,     // Border between rows
    borderColor: '#fff',
  },
  periodHeader: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  periodLabel: {
    color: '#fff',
    flex: 1,
    paddingLeft: 10,
  },
  periodData: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    borderWidth: 1,           // Add border to each cell
    borderColor: '#fff',      // White border color
    padding: 10,              // Padding for better appearance
  },
});

export default StockInformation;
