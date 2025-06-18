// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
// import { collection, getDocs, orderBy, query } from 'firebase/firestore';
// import { db } from '../firebaseCon'; // Import your Firebase config

// const Blotter = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const q = query(collection(db, 'news'), orderBy('timestamp', 'desc')); // Query to order by timestamp
//         const querySnapshot = await getDocs(q);
        
//         const fetchedArticles = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
        
//         setArticles(fetchedArticles);
//       } catch (error) {
//         console.error('Error fetching articles:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         {/* <ActivityIndicator size="large" color="#ffffff" /> */}
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {articles.map((article) => (
//         <View key={article.id} style={styles.card}>
//           <Text style={styles.title}>{article.title}</Text>
//           <Image source={{ uri: article.imageUrl }} style={styles.image} resizeMode="cover"/>
//           <Text style={styles.description}>{article.description}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#0c0c0c',
//     gap:3
//   },
//   card: {
//     backgroundColor: '#1b1b1b',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
    
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 20,
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 14,
//     color: '#b3b3b3',
//     marginTop:15,
//     marginBottom: 20,

//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#0c0c0c',
//   },
// });

// export default Blotter;


import React from 'react';
import { View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
            }
            .tradingview-widget-container {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget"></div>
            <div class="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    
                </a>
            </div>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async>
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
        </div>
    </body>
    </html>
  `;

  return (
    <ScrollView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: tradingViewHTML }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
      />
      {/* Transparent overlay to disable interaction */}
      <TouchableWithoutFeedback>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(26, 26, 29)',
  },
  webview: {
    flex: 1,
    height:2000
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire WebView
    backgroundColor: 'transparent',
  },
});

export default TradingViewTimelineWidget;
