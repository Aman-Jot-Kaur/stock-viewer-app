import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, off, push } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HelpChat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const scrollViewRef = useRef(null);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const messageRef = ref(db, 'messages');

    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userEmailSA');
        if (!storedUserId) return;

        setId(storedUserId);

        const unsubscribe = onValue(messageRef, (snapshot) => {
          const data = snapshot.val();

          if (!data || typeof data !== 'object') {
            setMessages([]); // No messages
            return;
          }

          const filtered = Object.keys(data)
            .filter((key) => {
              const msg = data[key];
              return msg?.sender === storedUserId || msg?.receiver === storedUserId;
            })
            .map((key) => data[key])
            .sort((a, b) => a.timestamp - b.timestamp);

          setMessages(filtered);
        });

        // Cleanup listener
        return () => {
          off(messageRef);
        };
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const messageRef = ref(db, 'messages');
    await push(messageRef, {
      text,
      sender: id,
      receiver: 'support',
      timestamp: Date.now(),
    });
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.accountText}>Help and Support</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        style={styles.chatContainer}
      >
        {messages.map((message, index) => (
          <View key={index} style={message.sender === id ? styles.youMessage : styles.supportMessage}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sendMessageContainer}>
        <TextInput
          style={styles.sendMessageInput}
          value={text}
          onChangeText={setText}
          placeholder="Type your message"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendMessageButton}>
          <Icon name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c72b4',
    paddingVertical: 15,
    marginTop: 22,
  },
  accountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  supportMessage: {
    backgroundColor: '#1c72b4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  youMessage: {
    backgroundColor: '#3e8e41',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  sendMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  sendMessageInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  sendMessageButton: {
    marginLeft: 10,
    backgroundColor: '#1c72b4',
    padding: 10,
    borderRadius: 10,
  },
});

export default HelpChat;
