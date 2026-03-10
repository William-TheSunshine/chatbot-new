"use client";

interface Scenario {
  id: string;
  label: string;
  title: string;
  description: string;
}

const scenarios: Scenario[] = [
  {
    id: "goal",
    label: "목표설정 면담",
    title: "목표설정 면담 AI 롤플레잉",
    description:
      "AI 롤플레잉으로 목표설정 면담에서 마주하는 팀원들의 다양한 저항 패턴을 훈련하고, 팀원들의 저항 뒤에 숨은 감정을 찾아 목표와 KPI를 점검하세요.",
  },
  {
    id: "oneonone",
    label: "1 on 1 면담",
    title: "1on1 면담 AI 롤플레잉",
    description:
      "TIP! AI 롤플레잉으로 1on1 면담 중 벌어질 수 있는 다양한 갈등 상황을 훈련해보세요.",
  },
  {
    id: "performance",
    label: "성과평가 면담",
    title: "성과평가 면담 AI 롤플레잉",
    description:
      "TIP! AI 롤플레잉으로 성과평가 면담 벌어질 수 있는 다양한 갈등 상황을 훈련해보세요.",
  },
];

function CardIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Monitor */}
      <rect x="18" y="12" width="44" height="32" rx="3" fill="#fff" stroke="#333" strokeWidth="2" />
      <rect x="22" y="16" width="36" height="24" rx="1" fill="#e8f0fe" />
      {/* Screen content - chart bars */}
      <rect x="27" y="28" width="6" height="10" rx="1" fill="#4285f4" />
      <rect x="35" y="24" width="6" height="14" rx="1" fill="#34a853" />
      <rect x="43" y="30" width="6" height="8" rx="1" fill="#f4b400" />
      {/* Monitor stand */}
      <rect x="35" y="44" width="10" height="4" fill="#333" />
      <rect x="30" y="48" width="20" height="2" rx="1" fill="#333" />
      {/* Person */}
      <circle cx="62" cy="52" r="7" fill="#ffe0d0" stroke="#333" strokeWidth="1.5" />
      {/* Hair */}
      <path d="M55 49c0-5 4-9 7-9s7 4 7 9" fill="#333" />
      {/* Body */}
      <path d="M54 68c0-6 4-10 8-10s8 4 8 10" fill="#ff8a80" stroke="#333" strokeWidth="1.5" />
      {/* Hand waving */}
      <circle cx="70" cy="56" r="2.5" fill="#ffe0d0" stroke="#333" strokeWidth="1" />
      {/* AI badge */}
      <rect x="55" y="18" width="18" height="12" rx="6" fill="#ff8a80" />
      <text x="64" y="27" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">AI</text>
    </svg>
  );
}

interface Props {
  onSelect: (scenarioId: string) => void;
}

export default function ScenarioSelectScreen({ onSelect }: Props) {
  return (
    <div className="scenario-select-page">
      <div className="scenario-select-inner">
        <div className="scenario-cards">
          {scenarios.map((s) => (
            <div key={s.id} className="scenario-card" onClick={() => onSelect(s.id)}>
              <div className="scenario-card-visual">
                <span className="scenario-card-badge">AI Role Playing</span>
                <div className="scenario-card-titles">
                  <h3 className="scenario-card-label">{s.label}</h3>
                  <p className="scenario-card-sub">AI 롤플레잉</p>
                </div>
                <div className="scenario-card-illust">
                  <CardIllustration />
                </div>
              </div>
              <div className="scenario-card-info">
                <h4 className="scenario-card-info-title">{s.title}</h4>
                <p className="scenario-card-info-desc">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
