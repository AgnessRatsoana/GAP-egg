import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Lock, CheckCheck } from 'lucide-react';

export const BeneficiaryMessagesView: React.FC = () => {
  const { currentBeneficiaryMessages, sendMessage, currentBeneficiary } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentBeneficiaryMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim(), 'admin');
    setInputText('');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '840px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)' }}>Care Circle Chat</h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Private, encrypted messaging with Sarah Jenkins and your Gap a Month care team.
        </p>
      </div>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '580px',
          overflow: 'hidden',
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: 'var(--primary-forest)',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '13px',
              }}
            >
              SJ
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                Sarah Jenkins (Lead Care Coordinator)
              </div>
              <div style={{ fontSize: '11px', color: '#DCE8E0' }}>
                Gap a Month Care Circle • Active
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FFFFFF',
            }}
          >
            <Lock size={12} /> Confidential
          </div>
        </div>

        {/* Message Thread Area */}
        <div
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            backgroundColor: 'var(--bg-page)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {currentBeneficiaryMessages.map((msg) => {
            const isMe = msg.senderRole === 'beneficiary';
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginBottom: '4px', fontWeight: 600 }}>
                  {isMe ? 'You' : msg.senderName}
                </div>

                <div
                  style={{
                    backgroundColor: isMe ? 'var(--primary-forest)' : '#FFFFFF',
                    color: isMe ? '#FFFFFF' : 'var(--text-main)',
                    padding: '13px 18px',
                    borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '14px',
                    lineHeight: 1.55,
                    border: isMe ? 'none' : '1px solid var(--border-color)',
                  }}
                >
                  {msg.content}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: 'var(--text-subtle)',
                    marginTop: '4px',
                  }}
                >
                  <span>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {isMe && <CheckCheck size={12} color="var(--primary-forest)" />}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '16px 20px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            placeholder="Type your message to Sarah..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              padding: '11px 18px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-page)',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: 'var(--primary-forest)',
              color: '#FFFFFF',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
