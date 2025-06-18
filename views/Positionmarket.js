import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

const TradingViewCurrencyPairsWidget = () => {
  // List of currency pairs
  const currencyPairs = [
    "FX:EURUSD",
    "FX:USDJPY",
    "FX:GBPUSD",
    "FX:AUDUSD",
    "FX:USDCHF",
    "FX:USDCAD",
    "FX:EURGBP",
    "FX:EURJPY",
    "FX:NZDUSD",
    "FX:GBPJPY",
    "FX:AUDJPY",
    "FX:CADJPY",
  ];

  // Generate HTML dynamically with all pairs
  const tradingViewHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TradingView Multi-Widget</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: rgb(26, 26, 29);
                color: white;
                font-family: Arial, sans-serif;
                pointer-events: none; /* Disable all pointer events globally */
            }
            .widget-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
                padding: 15px;
            }
            .tradingview-widget-container {
                background-color: #2A2A2D;
                border-radius: 12px;
                padding: 10px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                width: 100%;
                height: 300px;
                overflow: hidden;
                pointer-events: none; /* Disable pointer events inside widgets */
            }
            .tradingview-widget-container iframe {
                border-radius: 8px;
            }
        </style>
    </head>
    <body>
        <div class="widget-container">
            ${currencyPairs
              .map(
                (pair) => `
                <div class="tradingview-widget-container">
                    <div id="tradingview_${pair.replace(":", "_")}"></div>
                    <script type="text/javascript"
                        src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" 
                        async>
                    {
                      "symbol": "${pair}",
                      "width": "100%",
                      "height": "300",
                      "locale": "en",
                      "dateRange": "1D",
                      "colorTheme": "dark",
                      "isTransparent": true,
                      "autosize": true,
                      "timeZone": "Asia/Kolkata"
                    }
                    </script>
                </div>
              `
              )
              .join("")}
        </div>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: tradingViewHTML }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={styles.webview}
          scrollEnabled={false} // Disable default WebView scrolling
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(26, 26, 29)',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  webview: {
    flex: 1,
    height: 9000, // Adjust to allow for proper spacing between widgets
  },
});

export default TradingViewCurrencyPairsWidget;
