import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const TradingViewTimelineWidget = () => {
  // TradingView Timeline widget HTML content
  const tradingViewHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TradingView Timeline Widget</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: rgb(26, 26, 29);
                height: 100vh; /* Full height */
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }
            .tradingview-widget-container {
                width: 100%;
                height: 100%;
                pointer-events: none; /* Disable all pointer events */
            }
            table {
                pointer-events: auto; /* Enable pointer events for table */
                overflow-y: scroll; /* Allow vertical scrolling */
            }
        </style>
    </head>
    <body>
        <div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget"></div>
            <div class="tradingview-widget-copyright" style="pointer-events: none;">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <
                </a>
            </div>
            <script type="text/javascript" 
                src="https://s3.tradingview.com/external-embedding/embed-widget-screener.js" 
                async>
            {
                "feedMode": "all_symbols",
                "isTransparent": false,
                "displayMode": "regular",
                "width": "100%",
                "height": "100%",
                "colorTheme": "dark",
                "locale": "en"
            }
            </script>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    // Ensure only table is interactive
                    const table = document.querySelector('table');
                    if (table) {
                        table.style.pointerEvents = 'auto';
                    }
                });
            </script>
        </div>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: tradingViewHTML }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
        scrollEnabled={false} // Disable global scrolling, only allow table scrolling
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(26, 26, 29)',
  },
  webview: {
    flex: 1,
    height:3000
  },
});

export default TradingViewTimelineWidget;
