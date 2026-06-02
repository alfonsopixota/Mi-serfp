import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const App = () => {
  const [message, setMessage] = React.useState('');
  const [history, setHistory] = React.useState<Array<{ sender: string; text: string }>>([]);
  const [loading, setLoading] = React.useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setLoading(true);
      const newHistory = [...history, { sender: 'user', text: message }];
      setHistory(newHistory);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });

      const data = await response.json();
      
      if (data.error) {
        console.error('Error:', data.error);
      } else {
        setHistory([...newHistory, { sender: 'model', text: data.text }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setMessage('');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">SerFP - Orientación en FP</h1>
        <p className="text-sm text-gray-600 mt-1">Asesoría neutral e independiente sobre Formación Profesional</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">¡Hola! 👋</h2>
              <p className="text-gray-600 mb-4">Soy tu orientador en Formación Profesional. Puedo ayudarte con:</p>
              <ul className="text-left space-y-2 text-gray-600 text-sm">
                <li>✅ Grados Medios y Superiores</li>
                <li>✅ FP Dual</li>
                <li>✅ Empleabilidad y salarios reales</li>
                <li>✅ Acceso a la universidad desde FP</li>
              </ul>
            </div>
          </div>
        ) : (
          history.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="bg-white border-t border-gray-200 p-6">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
