import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { useState } from 'react'

interface Message {
  id: string
  text: string
  sender: string
  timestamp: Date
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Welcome to ChatSync! 👋', sender: 'system', timestamp: new Date() },
    { id: '2', text: 'Real-time messaging powered by Elixir & Socket.IO', sender: 'system', timestamp: new Date() },
  ])
  const [input, setInput] = useState('')
  const [username] = useState('User_' + Math.floor(Math.random() * 1000))

  const sendMessage = () => {
    if (!input.trim()) return
    const msg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: username,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, msg])
    setInput('')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ChatSync</Text>
        <View style={styles.onlineBadge}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        style={styles.messageList}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.sender === username ? styles.myMessage : styles.otherMessage
          ]}>
            {item.sender !== username && (
              <Text style={styles.senderName}>{item.sender}</Text>
            )}
            <Text style={[
              styles.messageText,
              item.sender === username && styles.myMessageText
            ]}>
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#666"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  onlineBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e' },
  onlineText: { color: '#22c55e', fontSize: 12 },
  messageList: { flex: 1 },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#1e1e2e',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#7c3aed',
    borderBottomRightRadius: 4
  },
  otherMessage: { alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  senderName: { color: '#7c3aed', fontSize: 11, fontWeight: '600', marginBottom: 4 },
  messageText: { color: '#e2e8f0', fontSize: 15, lineHeight: 20 },
  myMessageText: { color: '#fff' },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#333'
  },
  input: {
    flex: 1,
    backgroundColor: '#2d2d3d',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 15
  },
  sendButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 24,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  sendText: { color: '#fff', fontWeight: '600' }
})
