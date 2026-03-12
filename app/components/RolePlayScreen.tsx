"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  scenarioId: string;
  scenarioLabel: string;
  onExit: () => void;
}

/* 시나리오별 팀원 데이터 */
const teamMembers: Record<string, { name: string; type: string; difficulty: string }> = {
  goal: { name: "이다은", type: "협조적인 팀원", difficulty: "하" },
  oneonone: { name: "박서준", type: "소극적인 팀원", difficulty: "중" },
  performance: { name: "최윤호", type: "반발하는 팀원", difficulty: "상" },
};

/* OPEN 가이드라인 */
const guidelines = [
  {
    key: "O",
    title: "Opening (대화 열기)",
    examples: [
      '"요즘 컨디션은 어떠세요?"',
      '"최근에 가장 에너지를 얻은 순간은 뭐였나요?"',
      '"오늘 이 시간, 어떤 이야기부터 나누면 좋을까요?"',
    ],
  },
  {
    key: "P",
    title: "Progress Review (업무 현황 파악)",
    examples: [
      '"최근 진행한 일 중 가장 잘된 부분은 무엇인가요?"',
      '"이번 주에 성과를 냈다고 느낀 순간이 있었나요?"',
      '"잘 진행된 이유는 무엇이라고 생각하나요?"',
    ],
  },
  {
    key: "E",
    title: "Exploring Obstacles (걸림돌 확인)",
    examples: [
      '"이번 일에서 가장 어려웠던 부분은 무엇인가요?"',
      '"진행이 막혔던 이유를 하나만 꼽는다면 무엇일까요?"',
      '"제가 어떤 지원을 하면 도움이 될까요?"',
    ],
  },
  {
    key: "N",
    title: "Nurturing Organizational Growth (조직 성장 의견 청취)",
    examples: [
      '"이번 일은 팀의 어떤 목표와 연결되어 있을까요?"',
      '"팀이 이 분기에 가장 집중해야 할 것은 무엇이라고 생각하나요?"',
      '"우리 조직이 더 잘되기 위해 시도할 수 있는 건 무엇일까요?"',
    ],
  },
];

/* 캐릭터 정보 */
const characterInfoMap: Record<string, { personality: string; workStyle: string; background: string; motivation: string }> = {
  goal: {
    personality: "밝고 긍정적이며, 팀 분위기를 중시합니다. 갈등을 피하려는 경향이 있으나 본인의 성장에 대한 열의가 높습니다.",
    workStyle: "체계적으로 업무를 정리하며, 마감을 잘 지킵니다. 새로운 도전보다는 안정적인 업무를 선호합니다.",
    background: "입사 2년차 프론트엔드 개발자. 최근 새로운 프로젝트에 배정되어 목표 설정이 필요한 상황입니다.",
    motivation: "명확한 목표와 인정을 통해 동기부여 됩니다.",
  },
  oneonone: {
    personality: "내성적이고 조용한 편이며, 자기 의견을 적극적으로 표현하지 않습니다. 신뢰가 쌓이면 서서히 마음을 엽니다.",
    workStyle: "꼼꼼하지만 의사결정이 느린 편입니다. 혼자 일하는 것을 선호합니다.",
    background: "입사 3년차 백엔드 개발자. 최근 팀 내 커뮤니케이션 이슈로 스트레스를 받고 있습니다.",
    motivation: "자율성과 조용한 업무 환경에서 동기부여 됩니다.",
  },
  performance: {
    personality: "자존심이 강하고 자기 능력에 대한 확신이 있습니다. 직설적이며 불합리하다고 느끼면 바로 반발합니다.",
    workStyle: "성과 지향적이며 빠른 실행력을 가지고 있습니다. 하지만 팀워크보다 개인 성과를 우선시합니다.",
    background: "입사 5년차 시니어 개발자. 이번 성과평가 결과에 불만을 가지고 있으며, 평가 기준의 공정성에 의문을 제기합니다.",
    motivation: "공정한 평가와 성장 기회에 의해 동기부여 됩니다.",
  },
};

/* 성격 유형 */
const personalityTypes: Record<string, { mbti: string; disc: string; strengths: string[]; weaknesses: string[]; tips: string[] }> = {
  goal: {
    mbti: "ISFJ (수호자형)",
    disc: "S (안정형)",
    strengths: ["책임감이 강함", "팀 조화를 중시", "꼼꼼한 업무 처리"],
    weaknesses: ["변화에 대한 저항", "자기 주장이 약함", "과도한 배려로 소진"],
    tips: ["안전한 분위기에서 목표를 함께 설정하세요", "구체적인 기대치를 명확히 전달하세요", "작은 성취에 대한 인정을 자주 해주세요"],
  },
  oneonone: {
    mbti: "INTJ (전략가형)",
    disc: "C (신중형)",
    strengths: ["분석적 사고", "높은 전문성", "독립적 업무 수행"],
    weaknesses: ["소통 부족", "감정 표현 미흡", "팀 활동 회피"],
    tips: ["충분한 시간을 주고 경청하세요", "논리적 근거와 데이터를 활용하세요", "1:1 환경에서 소통하세요"],
  },
  performance: {
    mbti: "ENTJ (통솔자형)",
    disc: "D (주도형)",
    strengths: ["강한 실행력", "목표 지향적", "리더십 잠재력"],
    weaknesses: ["타인 의견 경시", "감정적 반발", "팀워크 부족"],
    tips: ["감정을 먼저 수용하고 공감하세요", "객관적 데이터로 피드백하세요", "성장 기회를 함께 논의하세요"],
  },
};

/* 시나리오별 시스템 프롬프트 */
function buildSystemPrompt(scenarioId: string): string {
  const member = teamMembers[scenarioId] || teamMembers.goal;
  const charInfo = characterInfoMap[scenarioId] || characterInfoMap.goal;

  return `당신은 "${member.name}"이라는 팀원 역할을 연기합니다. 이것은 코칭대화 롤플레이 훈련입니다.
사용자는 당신의 팀 리더(관리자)입니다. 1on1 면담 상황에서 자연스럽게 대화하세요.

[캐릭터 정보]
- 이름: ${member.name}
- 유형: ${member.type} (난이도: ${member.difficulty})
- 성격: ${charInfo.personality}
- 업무 스타일: ${charInfo.workStyle}
- 배경: ${charInfo.background}
- 동기부여 요인: ${charInfo.motivation}

[규칙]
- 항상 ${member.name}으로서 1인칭으로 대화하세요.
- 캐릭터의 성격과 상황에 맞게 자연스럽게 반응하세요.
- 답변은 실제 면담처럼 간결하게 (2~4문장) 하세요.
- 한국어로 대화하세요.`;
}

export default function RolePlayScreen({ scenarioId, scenarioLabel, onExit }: Props) {
  const [rightTab, setRightTab] = useState<"guide" | "character" | "personality">("guide");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch(() => {});

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

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
        body: JSON.stringify({
          messages: newMessages,
          systemPrompt: buildSystemPrompt(scenarioId),
          conversationId,
          scenarioId,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }
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

  const member = teamMembers[scenarioId] || teamMembers.goal;
  const charInfo = characterInfoMap[scenarioId] || characterInfoMap.goal;
  const personType = personalityTypes[scenarioId] || personalityTypes.goal;

  return (
    <div className="roleplay-page">
      {/* 상단 헤더 */}
      <header className="roleplay-header">
        <div className="roleplay-header-left">
          <div className="roleplay-avatar-small">
            {member.name.charAt(0)}
          </div>
          <div>
            <h2 className="roleplay-header-title">{member.type} (난이도 {member.difficulty})</h2>
            <p className="roleplay-header-sub">{member.name}</p>
          </div>
        </div>
        <div className="roleplay-header-actions">
          <button className="roleplay-tab-btn active">시나리오</button>
          <button className="roleplay-tab-btn">대화 영상&보고서</button>
          <button className="roleplay-exit-btn" onClick={onExit}>나가기 ↗</button>
        </div>
      </header>

      {/* 본문 영역 */}
      <div className="roleplay-body">
        {/* 좌측 메인 */}
        <div className="roleplay-main">
          {/* 비디오 영역 */}
          <div className="roleplay-video-area">
            <div className="roleplay-video-card">
              <div className="roleplay-video-placeholder team-member">
                <div className="roleplay-person-icon">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="28" r="16" fill="#e0d4c8" />
                    <ellipse cx="40" cy="68" rx="24" ry="18" fill="#8b9dc3" />
                    <circle cx="40" cy="28" r="14" fill="#f5e6d3" />
                    <path d="M26 22c0-8 6-14 14-14s14 6 14 14" fill="#4a3728" />
                  </svg>
                </div>
              </div>
              <span className="roleplay-video-name">{member.name}</span>
            </div>
            <div className="roleplay-video-card">
              <div className="roleplay-video-placeholder manager">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="roleplay-webcam"
                />
              </div>
              <span className="roleplay-video-name manager-name">나</span>
            </div>
          </div>

          {/* 채팅 영역 */}
          <div className="roleplay-chat-area">
            <div className="roleplay-chat-messages">
              {messages.length === 0 && (
                <div className="roleplay-chat-empty">
                  {member.name}에게 먼저 말을 걸어보세요.
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`roleplay-chat-row ${msg.role}`}>
                  {msg.role === "assistant" && (
                    <div className="roleplay-chat-avatar">{member.name.charAt(0)}</div>
                  )}
                  <div className={`roleplay-chat-bubble ${msg.role}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="roleplay-chat-row assistant">
                  <div className="roleplay-chat-avatar">{member.name.charAt(0)}</div>
                  <div className="roleplay-chat-bubble assistant typing">
                    <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="roleplay-chat-input">
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
        </div>

        {/* 우측 사이드 패널 */}
        <aside className="roleplay-side">
          <div className="roleplay-side-tabs">
            <button
              className={`roleplay-side-tab ${rightTab === "guide" ? "active" : ""}`}
              onClick={() => setRightTab("guide")}
            >
              가이드라인
            </button>
            <button
              className={`roleplay-side-tab ${rightTab === "character" ? "active" : ""}`}
              onClick={() => setRightTab("character")}
            >
              캐릭터 정보
            </button>
            <button
              className={`roleplay-side-tab ${rightTab === "personality" ? "active" : ""}`}
              onClick={() => setRightTab("personality")}
            >
              성격 유형
            </button>
          </div>

          <div className="roleplay-side-content">
            {rightTab === "guide" && (
              <div className="roleplay-guidelines">
                {guidelines.map((g) => (
                  <div key={g.key} className="guideline-section">
                    <h4 className="guideline-title">
                      <span className="guideline-key">{g.key}</span> — {g.title}
                    </h4>
                    {g.examples.map((ex, i) => (
                      <p key={i} className="guideline-example">예: {ex}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {rightTab === "character" && (
              <div className="roleplay-character-info">
                <div className="char-info-section">
                  <h4 className="char-info-label">성격 특성</h4>
                  <p className="char-info-text">{charInfo.personality}</p>
                </div>
                <div className="char-info-section">
                  <h4 className="char-info-label">업무 스타일</h4>
                  <p className="char-info-text">{charInfo.workStyle}</p>
                </div>
                <div className="char-info-section">
                  <h4 className="char-info-label">배경</h4>
                  <p className="char-info-text">{charInfo.background}</p>
                </div>
                <div className="char-info-section">
                  <h4 className="char-info-label">동기부여 요인</h4>
                  <p className="char-info-text">{charInfo.motivation}</p>
                </div>
              </div>
            )}

            {rightTab === "personality" && (
              <div className="roleplay-personality">
                <div className="personality-badges">
                  <span className="personality-badge">{personType.mbti}</span>
                  <span className="personality-badge">{personType.disc}</span>
                </div>
                <div className="char-info-section">
                  <h4 className="char-info-label">강점</h4>
                  <ul className="personality-list strengths">
                    {personType.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div className="char-info-section">
                  <h4 className="char-info-label">약점</h4>
                  <ul className="personality-list weaknesses">
                    {personType.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
                <div className="char-info-section">
                  <h4 className="char-info-label">코칭 팁</h4>
                  <ul className="personality-list tips">
                    {personType.tips.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
