import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
// Get screen dimensions
const { width, height } = Dimensions.get('window');
import { doc } from 'firebase/firestore';
const TradingViewSymbolSearch = () => {
  const widgetHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <style>
          html, body, #tradingview_widget {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-color: #000; /* Dark theme */
            overflow: hidden; /* Prevent scrollbars */
            display: flex;
            justify-content: center;
            align-items: center;
            

          }
            
            
        </style>
      </head>
      <body>
        <div id="tradingview_widget"></div>
        <script type="text/javascript">
          new TradingView.widget({
            container_id: "tradingview_widget",
            width: "100%",
            height: "100%",
            symbol: "EURUSD",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#000",
            enable_publishing: false,
            allow_symbol_change: true,
            save_image: false,
            studies: ["RSI@tv-basicstudies"],
            overrides: {
              // Adjusting axis label size and other important text
              "scalesProperties.textSize": 8, // Increase the axis label size
              "scalesProperties.fontSize": 18, // Increase font size for axis numbers
              "symbolWatermarkProperties.fontSize": 20, // Increase the symbol watermark size
              "symbolWatermarkProperties.transparency": 90, // Less transparency for symbol watermark
              "mainSeriesProperties.candleStyle.upColor": "#26A69A", // Green color for up candles
              "mainSeriesProperties.candleStyle.downColor": "#EF5350", // Red color for down candles
              "paneProperties.legendProperties.showLegend": true, // Ensure legend shows
              "paneProperties.topMargin": 25, // Adjust top margin to prevent clipping
              "mainSeriesProperties.candleStyle.borderColor": "#FF0000", // Border color for candles
              "mainSeriesProperties.candleStyle.borderUpColor": "#66BB6A", // Up border color
              "mainSeriesProperties.candleStyle.borderDownColor": "#EF5350", // Down border color
            },
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: widgetHTML }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center the WebView horizontally and vertically
    backgroundColor: '#000',
  },
  webview: {
    width: width , // Adjust to 90% of screen width
    height: height , // Adjust to 70% of screen height
  },
});

export default TradingViewSymbolSearch;
