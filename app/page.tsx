"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PersonaScreen from "./components/PersonaScreen";
import ReportScreen from "./components/ReportScreen";
import ScenarioSelectScreen from "./components/ScenarioSelectScreen";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "오류가 발생했습니다. 다시 시도해주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!started) {
    return (
      <div className="home-container">
        <div className="home-bg">
          <Image
            src="/coaching-bg.jpg"
            alt="코칭대화"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="home-overlay" />
        </div>
        <div className="home-content">
          <h1 className="home-title">코칭대화 롤플레이 챗봇</h1>
          <p className="home-subtitle">
            AI와 함께 1on1 코칭대화를 연습해보세요
          </p>
          <button className="home-start-btn" onClick={() => setStarted(true)}>
            시작하기
          </button>
        </div>
        <div className="home-logo">
          <Image
            src="/shinhan-ds-logo.png"
            alt="신한DS"
            width={120}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: "👤", label: "팀원 페르소나" },
    { icon: "📝", label: "시나리오 생성" },
    { icon: "📊", label: "분석 리포트" },
    { icon: "📖", label: "가이드 라인" },
  ];

  const scenarioNames: Record<string, string> = {
    goal: "목표설정 면담",
    oneonone: "1 on 1 면담",
    performance: "성과평가 면담",
  };

  const renderContent = () => {
    if (activeMenu === "팀원 페르소나") {
      return <PersonaScreen />;
    }

    if (activeMenu === "분석 리포트") {
      return <ReportScreen />;
    }

    // 시나리오가 아직 선택되지 않았으면 시나리오 선택 화면 표시
    if (!selectedScenario && !activeMenu) {
      return (
        <ScenarioSelectScreen
          onSelect={(id) => {
            setSelectedScenario(id);
            setActiveMenu(null);
            setMessages([]);
          }}
        />
      );
    }

    return (
      <div className="chat-container">
        <header className="chat-header">
          <h1>{selectedScenario ? scenarioNames[selectedScenario] + " AI 롤플레잉" : "코칭대화 롤플레이 챗봇"}</h1>
          {selectedScenario && (
            <button className="chat-back-btn" onClick={() => { setSelectedScenario(null); setMessages([]); }}>
              ← 시나리오 선택
            </button>
          )}
        </header>
        <div className="messages">
          {messages.length === 0 && (
            <div className="empty-state">메시지를 입력해서 대화를 시작하세요!</div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-label">
                {msg.role === "user" ? "나" : "코치"}
              </div>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="message-label">코치</div>
              <div className="message-content typing">생각 중...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="메시지를 입력하세요..."
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}>
            전송
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="chat-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo">💬</span>
          <h2>1on1 Mate</h2>
          <button className="sidebar-home-btn" onClick={() => { setStarted(false); setSelectedScenario(null); setActiveMenu(null); }} title="홈으로">
            🏠
          </button>
        </div>
        <p className="sidebar-menu-label">MENU</p>
        <nav className="sidebar-nav">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className={`sidebar-item ${activeMenu === item.label ? "active" : ""}`}
              onClick={() => setActiveMenu(item.label)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">AD</div>
            <div>
              <div className="sidebar-user-name">김관리 님</div>
              <div className="sidebar-user-role">Engineering Manager</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}
