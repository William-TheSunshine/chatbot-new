"use client";

import { useState } from "react";

type Tab = "value" | "guide" | "process" | "questions" | "tips";

export default function GuidelineScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("value");

  return (
    <div className="guide-page">
      <header className="guide-header">
        <div>
          <h1 className="guide-header-title">리더의 필살기: 1on1 미팅 완벽 가이드</h1>
          <p className="guide-header-desc">팀과 팀원을 성장시키는 1on1 미팅의 모든 것</p>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div className="guide-tabs">
        <button className={`guide-tab ${activeTab === "value" ? "active" : ""}`} onClick={() => setActiveTab("value")}>
          핵심 가치
        </button>
        <button className={`guide-tab ${activeTab === "guide" ? "active" : ""}`} onClick={() => setActiveTab("guide")}>
          운영 가이드
        </button>
        <button className={`guide-tab ${activeTab === "process" ? "active" : ""}`} onClick={() => setActiveTab("process")}>
          미팅 프로세스
        </button>
        <button className={`guide-tab ${activeTab === "questions" ? "active" : ""}`} onClick={() => setActiveTab("questions")}>
          질문 뱅크
        </button>
        <button className={`guide-tab ${activeTab === "tips" ? "active" : ""}`} onClick={() => setActiveTab("tips")}>
          Dos &amp; Don&apos;ts
        </button>
      </div>

      <div className="guide-content">
        {activeTab === "value" && <ValueTab />}
        {activeTab === "guide" && <OperationGuideTab />}
        {activeTab === "process" && <ProcessTab />}
        {activeTab === "questions" && <QuestionBankTab />}
        {activeTab === "tips" && <DosDontsTab />}
      </div>
    </div>
  );
}

/* ===== 핵심 가치 탭 ===== */
function ValueTab() {
  return (
    <div className="guide-overview">
      {/* 섹션 타이틀 */}
      <div className="guide-section-banner">
        <h3>왜 1on1 미팅인가?</h3>
        <p>정기적인 1on1 미팅이 팀 성과와 구성원 성장에 미치는 핵심 가치</p>
      </div>

      {/* 핵심 수치 카드 */}
      <div className="guide-summary-cards">
        <div className="guide-summary-card">
          <div className="guide-summary-icon">📈</div>
          <h4>업무 몰입도 3배 증가</h4>
          <p>정기적인 1on1 미팅을 진행하는 팀의 구성원은 업무 몰입도가 약 3배 높은 것으로 나타났습니다.</p>
        </div>
        <div className="guide-summary-card">
          <div className="guide-summary-icon">📉</div>
          <h4>퇴사율 18~43% 감소</h4>
          <p>1on1 미팅을 통한 지속적인 관심과 피드백은 구성원의 퇴사 의향을 크게 줄여줍니다.</p>
        </div>
        <div className="guide-summary-card">
          <div className="guide-summary-icon">🤝</div>
          <h4>신뢰와 심리적 안정감 구축</h4>
          <p>정기적 대화를 통해 리더와 팀원 간 신뢰가 쌓이고, 심리적 안정감이 형성됩니다.</p>
        </div>
      </div>

      {/* 구성원 유형별 권장 미팅 */}
      <div className="guide-table-section">
        <h4 className="guide-table-title">구성원 유형별 권장 미팅</h4>
        <div className="guide-table-wrapper">
          <table className="guide-table">
            <thead>
              <tr>
                <th>구성원 유형</th>
                <th>권장 주기</th>
                <th>미팅 초점</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="guide-type-badge new-member">신입/저경력</span>
                </td>
                <td>주 1회</td>
                <td>업무 적응, 기본 역량 개발, 조직 문화 이해</td>
              </tr>
              <tr>
                <td>
                  <span className="guide-type-badge mid-member">중간 경력</span>
                </td>
                <td>격주 1회</td>
                <td>성과 점검, 역량 강화, 경력 개발 방향</td>
              </tr>
              <tr>
                <td>
                  <span className="guide-type-badge senior-member">고경력/자율형</span>
                </td>
                <td>월 1회</td>
                <td>전략적 논의, 리더십 개발, 조직 기여 확대</td>
              </tr>
              <tr>
                <td>
                  <span className="guide-type-badge issue-member">성과 이슈</span>
                </td>
                <td>주 1~2회</td>
                <td>문제 파악, 개선 계획 수립, 밀착 지원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===== 운영 가이드 탭 ===== */
function OperationGuideTab() {
  return (
    <div className="guide-structure">
      <div className="guide-section-banner">
        <h3>1on1 운영 가이드 (설계)</h3>
        <p>효과적인 1on1 미팅을 위한 운영 설계 원칙</p>
      </div>

      {/* 운영 원칙 카드 */}
      <div className="guide-operation-cards">
        <div className="guide-operation-card">
          <div className="guide-operation-icon">👥</div>
          <div className="guide-operation-info">
            <h4>적정 인원</h4>
            <p className="guide-operation-highlight">리더 1인당 6~8명이 적절</p>
            <p>1on1 미팅의 질을 유지하기 위해 직접 관리하는 팀원 수를 6~8명 이내로 유지하는 것이 이상적입니다.</p>
          </div>
        </div>
        <div className="guide-operation-card">
          <div className="guide-operation-icon">⏰</div>
          <div className="guide-operation-info">
            <h4>미팅 시간</h4>
            <p className="guide-operation-highlight">최소 30분, 방해받지 않는 시간</p>
            <p>충분한 대화를 위해 최소 30분을 확보하고, 중간에 방해받지 않도록 일정을 관리하세요.</p>
          </div>
        </div>
        <div className="guide-operation-card">
          <div className="guide-operation-icon">🏢</div>
          <div className="guide-operation-info">
            <h4>미팅 장소</h4>
            <p className="guide-operation-highlight">프라이빗한 공간 확보</p>
            <p>솔직한 대화를 위해 다른 팀원의 시선이나 소음으로부터 자유로운 별도 공간을 마련하세요.</p>
          </div>
        </div>
      </div>

      {/* 성숙도별 권장 주기 */}
      <div className="guide-table-section">
        <h4 className="guide-table-title">구성원 성숙도별 권장 주기</h4>
        <div className="guide-table-wrapper">
          <table className="guide-table">
            <thead>
              <tr>
                <th>성숙도</th>
                <th>특징</th>
                <th>권장 주기</th>
                <th>리더 역할</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="guide-maturity-badge low">낮음</span></td>
                <td>업무 역량과 의욕이 부족한 단계</td>
                <td>주 1회</td>
                <td>구체적 지시 + 격려</td>
              </tr>
              <tr>
                <td><span className="guide-maturity-badge mid">보통</span></td>
                <td>의욕은 있으나 역량 개발 중인 단계</td>
                <td>격주 1회</td>
                <td>코칭 + 방향 제시</td>
              </tr>
              <tr>
                <td><span className="guide-maturity-badge high">높음</span></td>
                <td>역량이 있으나 자신감이 부족한 단계</td>
                <td>월 1회</td>
                <td>참여 + 지원</td>
              </tr>
              <tr>
                <td><span className="guide-maturity-badge very-high">매우 높음</span></td>
                <td>역량과 의욕 모두 높은 단계</td>
                <td>월 1회 이상</td>
                <td>위임 + 권한 부여</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 운영 팁 배너 */}
      <div className="guide-dogood-banner">
        <div className="guide-dogood-icon">💡</div>
        <div>
          <h4>운영 핵심 원칙</h4>
          <p>1on1은 업무 보고가 아닌, 구성원의 성장과 고민을 다루는 시간입니다. 리더가 아닌 구성원이 주인공이 되어야 합니다.</p>
        </div>
      </div>
    </div>
  );
}

/* ===== 3단계 미팅 프로세스 탭 ===== */
function ProcessTab() {
  return (
    <div className="guide-structure">
      <div className="guide-section-banner">
        <h3>3단계 미팅 프로세스 (실행)</h3>
        <p>Plan → Do → See 단계별 실행 가이드</p>
      </div>

      {/* 3단계 프로세스 */}
      <div className="guide-process-steps">
        <div className="guide-process-card plan">
          <div className="guide-process-header">
            <span className="guide-process-number">1</span>
            <div>
              <h4>Plan (준비)</h4>
              <p className="guide-process-subtitle">아젠다 사전 공유</p>
            </div>
          </div>
          <div className="guide-process-body">
            <ul className="guide-process-list">
              <li>미팅 최소 1일 전, 아젠다를 공유하세요</li>
              <li>구성원이 먼저 이야기하고 싶은 주제를 제출하도록 안내하세요</li>
              <li>이전 미팅의 후속 조치 사항을 확인하세요</li>
              <li>구성원의 최근 상황과 성과를 사전에 파악하세요</li>
            </ul>
          </div>
        </div>

        <div className="guide-process-arrow">→</div>

        <div className="guide-process-card do">
          <div className="guide-process-header">
            <span className="guide-process-number">2</span>
            <div>
              <h4>Do (실행)</h4>
              <p className="guide-process-subtitle">80% 듣고, 20% 말하기</p>
            </div>
          </div>
          <div className="guide-process-body">
            <ul className="guide-process-list">
              <li>구성원이 먼저 이야기하도록 대화를 시작하세요</li>
              <li>경청하며 열린 질문으로 깊이 있는 대화를 이끌어가세요</li>
              <li>판단이나 조언보다 공감과 이해를 우선하세요</li>
              <li>구성원의 감정과 니즈를 파악하는 데 집중하세요</li>
            </ul>
          </div>
        </div>

        <div className="guide-process-arrow">→</div>

        <div className="guide-process-card see">
          <div className="guide-process-header">
            <span className="guide-process-number">3</span>
            <div>
              <h4>See (정리)</h4>
              <p className="guide-process-subtitle">대화 내용 기록과 후속 조치</p>
            </div>
          </div>
          <div className="guide-process-body">
            <ul className="guide-process-list">
              <li>대화 내용의 핵심 사항을 기록하세요</li>
              <li>합의된 액션 아이템을 명확히 정리하세요</li>
              <li>다음 미팅까지의 후속 조치를 설정하세요</li>
              <li>구성원에게 미팅 요약을 공유하세요</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 핵심 원칙 카드 */}
      <div className="guide-summary-cards">
        <div className="guide-summary-card">
          <div className="guide-summary-icon">👂</div>
          <h4>경청 중심</h4>
          <p>리더는 80% 듣고 20% 말하기를 실천합니다. 구성원의 이야기에 집중하세요.</p>
        </div>
        <div className="guide-summary-card">
          <div className="guide-summary-icon">📋</div>
          <h4>기록과 추적</h4>
          <p>모든 대화 내용과 합의 사항을 기록하고, 다음 미팅에서 반드시 추적합니다.</p>
        </div>
        <div className="guide-summary-card">
          <div className="guide-summary-icon">🔄</div>
          <h4>일관된 실행</h4>
          <p>1on1은 일회성이 아닌 지속적인 프로세스입니다. 정해진 주기를 반드시 지키세요.</p>
        </div>
      </div>
    </div>
  );
}

/* ===== 질문 뱅크 탭 ===== */
function QuestionBankTab() {
  const categories = [
    {
      icon: "📊",
      title: "성과 및 진행 상황 확인",
      color: "#4285f4",
      questions: [
        "이번 주에 가장 잘 진행된 업무는 무엇인가요?",
        "현재 진행 중인 프로젝트에서 가장 큰 도전은 무엇인가요?",
        "업무 목표 대비 현재 어느 정도 진행되었나요?",
        "제가 도와줄 수 있는 부분이 있을까요?",
        "업무 우선순위 중 조정이 필요한 것이 있나요?",
      ],
    },
    {
      icon: "🌱",
      title: "개인의 성장과 커리어",
      color: "#34a853",
      questions: [
        "최근에 새롭게 배운 것이 있나요?",
        "앞으로 어떤 역량을 더 키우고 싶은가요?",
        "1년 후, 3년 후 어떤 모습이고 싶은가요?",
        "현재 업무가 본인의 커리어 목표에 도움이 되고 있나요?",
        "도전해보고 싶은 새로운 업무나 역할이 있나요?",
      ],
    },
    {
      icon: "🔥",
      title: "동기부여 및 조직 문화",
      color: "#ea4335",
      questions: [
        "요즘 업무에서 가장 에너지를 얻는 순간은 언제인가요?",
        "팀 내에서 개선되었으면 하는 점이 있나요?",
        "동료들과의 협업에서 어려운 점은 없나요?",
        "업무 외적으로 힘든 부분은 없나요?",
        "우리 팀이 더 잘할 수 있는 것은 무엇일까요?",
      ],
    },
  ];

  return (
    <div className="guide-standards">
      <div className="guide-section-banner">
        <h3>리더를 위한 상황별 질문 뱅크</h3>
        <p>1on1 미팅에서 활용할 수 있는 상황별 핵심 질문 모음</p>
      </div>

      {categories.map((cat, i) => (
        <div key={i} className="guide-question-card">
          <div className="guide-question-header" style={{ borderLeftColor: cat.color }}>
            <span className="guide-question-icon">{cat.icon}</span>
            <h4 style={{ color: cat.color }}>{cat.title}</h4>
          </div>
          <div className="guide-question-body">
            {cat.questions.map((q, j) => (
              <div key={j} className="guide-question-item">
                <span className="guide-question-bullet" style={{ background: cat.color }}>{j + 1}</span>
                <p>{q}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===== Dos & Don'ts 탭 ===== */
function DosDontsTab() {
  const dosList = [
    {
      title: "칭찬과 인정은 구체적으로",
      desc: "\"잘했어\"보다 \"이번 프로젝트에서 고객 요구사항을 정확히 분석한 부분이 인상적이었어요\"처럼 구체적으로 말하세요.",
      icon: "👏",
    },
    {
      title: "열린 질문으로 대화하기",
      desc: "\"네/아니오\"로 답할 수 있는 닫힌 질문 대신, \"어떻게 생각하세요?\" \"무엇이 가장 도움이 될까요?\" 같은 열린 질문을 사용하세요.",
      icon: "💬",
    },
    {
      title: "감정을 먼저 수용하기",
      desc: "구성원이 불만이나 어려움을 표현할 때, 즉시 해결책을 제시하기보다 먼저 감정을 인정하고 공감해주세요.",
      icon: "❤️",
    },
    {
      title: "일정을 반드시 지키기",
      desc: "1on1 미팅은 리더의 우선순위 중 하나입니다. 급한 업무가 있더라도 가급적 취소하지 말고, 필요시 시간을 조정하세요.",
      icon: "📅",
    },
  ];

  const dontsList = [
    {
      title: "업무 보고만 받는 미팅",
      desc: "1on1은 업무 진행 보고의 시간이 아닙니다. 구성원의 성장, 고민, 커리어에 대한 대화에 집중하세요.",
      icon: "📝",
    },
    {
      title: "일방적으로 이야기하기",
      desc: "리더가 혼자 80% 이상 이야기하면 구성원은 \"또 잔소리\"라고 느낍니다. 경청이 핵심입니다.",
      icon: "🗣️",
    },
    {
      title: "다른 팀원과 비교하기",
      desc: "\"다른 사람은 이렇게 하던데...\"같은 비교는 동기를 떨어뜨립니다. 개인의 성장에 집중하세요.",
      icon: "⚖️",
    },
  ];

  const badQuestions = [
    {
      type: "유도 질문",
      example: "\"이 방법이 더 좋지 않아?\"",
      better: "\"이 상황에서 어떤 방법이 좋다고 생각하세요?\"",
    },
    {
      type: "비난 질문",
      example: "\"왜 그렇게 했어?\"",
      better: "\"그때 어떤 판단으로 그 방법을 선택했나요?\"",
    },
    {
      type: "닫힌 질문",
      example: "\"잘 되고 있지?\"",
      better: "\"요즘 업무에서 가장 큰 도전은 무엇인가요?\"",
    },
  ];

  return (
    <div className="guide-dos-donts">
      <div className="guide-section-banner">
        <h3>리더의 Dos &amp; Don&apos;ts</h3>
        <p>효과적인 1on1을 위해 실천할 것과 피해야 할 것</p>
      </div>

      <div className="guide-dos-donts-grid">
        {/* Dos 섹션 */}
        <div className="guide-dos-section">
          <h4 className="guide-dos-title">
            <span className="guide-dos-badge do">DO</span>
            실천해야 할 것
          </h4>
          <div className="guide-dos-list">
            {dosList.map((item, i) => (
              <div key={i} className="guide-dos-item do">
                <span className="guide-dos-icon">{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Don'ts 섹션 */}
        <div className="guide-donts-section">
          <h4 className="guide-dos-title">
            <span className="guide-dos-badge dont">DON&apos;T</span>
            피해야 할 것
          </h4>
          <div className="guide-dos-list">
            {dontsList.map((item, i) => (
              <div key={i} className="guide-dos-item dont">
                <span className="guide-dos-icon">{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 피해야 할 3대 질문 유형 */}
      <div className="guide-bad-questions">
        <h4 className="guide-table-title">⚠️ 피해야 할 3대 질문 유형</h4>
        <div className="guide-table-wrapper">
          <table className="guide-table">
            <thead>
              <tr>
                <th>유형</th>
                <th>나쁜 예시</th>
                <th>개선된 질문</th>
              </tr>
            </thead>
            <tbody>
              {badQuestions.map((q, i) => (
                <tr key={i}>
                  <td><span className="guide-bad-type">{q.type}</span></td>
                  <td className="guide-bad-example">{q.example}</td>
                  <td className="guide-good-example">{q.better}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
