"use client";

/* ───── Radar Chart (SVG) ───── */
function RadarChart() {
  const cx = 140, cy = 130, r = 90;
  const labels = ["경청", "공감", "질문", "피드백", "합의"];
  const myScores = [92, 85, 74, 88, 90];
  const avgScores = [70, 68, 72, 65, 70];

  const angle = (i: number) => (Math.PI / 2) + (2 * Math.PI * i) / 5;
  const pt = (i: number, v: number) => {
    const a = angle(i);
    const s = (v / 100) * r;
    return [cx + s * Math.cos(-a), cy - s * Math.sin(-a)];
  };
  const polygon = (scores: number[]) =>
    scores.map((s, i) => pt(i, s).join(",")).join(" ");

  return (
    <svg width="280" height="280" viewBox="0 0 280 260">
      {/* Grid */}
      {[20, 40, 60, 80, 100].map((v) => (
        <polygon
          key={v}
          points={labels.map((_, i) => pt(i, v).join(",")).join(" ")}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="1"
        />
      ))}
      {/* Axes */}
      {labels.map((_, i) => {
        const [x, y] = pt(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e0e0e0" strokeWidth="1" />;
      })}
      {/* Average */}
      <polygon points={polygon(avgScores)} fill="rgba(200,200,200,0.25)" stroke="#bbb" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* My scores */}
      <polygon points={polygon(myScores)} fill="rgba(66,133,244,0.18)" stroke="#4285f4" strokeWidth="2" />
      {myScores.map((s, i) => {
        const [x, y] = pt(i, s);
        return <circle key={i} cx={x} cy={y} r="4" fill="#4285f4" />;
      })}
      {/* Labels */}
      {labels.map((l, i) => {
        const [x, y] = pt(i, 118);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="13" fill="#555" fontWeight="500">
            {l}
          </text>
        );
      })}
      {/* Legend */}
      <rect x="80" y="245" width="12" height="12" rx="2" fill="rgba(66,133,244,0.3)" stroke="#4285f4" strokeWidth="1" />
      <text x="96" y="255" fontSize="11" fill="#666">나의 점수</text>
      <rect x="155" y="245" width="12" height="12" rx="2" fill="rgba(200,200,200,0.4)" stroke="#bbb" strokeWidth="1" />
      <text x="171" y="255" fontSize="11" fill="#666">평균</text>
    </svg>
  );
}

/* ───── Score Bar ───── */
function ScoreBar({ label, icon, score }: { label: string; icon: string; score: number }) {
  const color = score >= 80 ? "#4285f4" : score >= 70 ? "#f4b400" : "#ea4335";
  return (
    <div className="score-bar-row">
      <span className="score-bar-icon">{icon}</span>
      <span className="score-bar-label">{label}</span>
      <span className="score-bar-value" style={{ color }}>{score}점</span>
      <div className="score-bar-track">
        <div className="score-bar-fill" style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  );
}

/* ───── Main Component ───── */
export default function ReportScreen() {
  return (
    <div className="report-page">
      {/* Header */}
      <div className="report-header">
        <div>
          <h2 className="report-title">분석 및 피드백 리포트</h2>
          <p className="report-subtitle">
            세션 ID: #20260206-01 &bull; 김민수 (Frontend Dev) &bull; 커리어 성장 면담
          </p>
        </div>
        <div className="report-header-actions">
          <button className="btn-outline">&#9000; 공유</button>
          <button className="btn-primary">&#128424; PDF 내보내기</button>
        </div>
      </div>

      {/* Top Row */}
      <div className="report-top-row">
        {/* 종합 평가 */}
        <div className="report-card">
          <h3 className="report-card-title">🏆 종합 평가</h3>
          <div className="overall-score">
            <div className="score-ring">
              <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="55" fill="none" stroke="#e8f0fe" strokeWidth="10" />
                <circle cx="65" cy="65" r="55" fill="none" stroke="#4285f4" strokeWidth="10"
                  strokeDasharray={`${(85 / 100) * 345} 345`}
                  strokeLinecap="round" transform="rotate(-90 65 65)" />
              </svg>
              <div className="score-ring-text">
                <span className="score-number">85</span>
                <span className="score-label-ex">Excellent</span>
              </div>
            </div>
            <div className="overall-level">
              <strong>Level A</strong>
              <p>상위 15% 수준의 대화 스킬입니다.</p>
            </div>
          </div>
          <div className="overall-stats">
            <div className="stat-item">
              <span className="stat-name">소요 시간</span>
              <span className="stat-value">24분</span>
            </div>
            <div className="stat-item">
              <span className="stat-name">발화 비율</span>
              <span className="stat-value">45:55</span>
            </div>
            <div className="stat-item">
              <span className="stat-name">목표 달성</span>
              <span className="stat-value success">성공</span>
            </div>
          </div>
        </div>

        {/* 핵심 역량 분석 */}
        <div className="report-card">
          <h3 className="report-card-title">핵심 역량 분석</h3>
          <div className="radar-wrap">
            <RadarChart />
          </div>
          <p className="radar-footnote">* 5가지 핵심 역량 기준 평가</p>
        </div>

        {/* 상세 지표 */}
        <div className="report-card">
          <h3 className="report-card-title">⚙ 상세 지표</h3>
          <div className="score-bars">
            <ScoreBar icon="🎧" label="경청 태도" score={92} />
            <ScoreBar icon="❤" label="공감 표현" score={85} />
            <ScoreBar icon="❓" label="질문의 질" score={74} />
            <ScoreBar icon="💬" label="피드백 명확성" score={88} />
            <ScoreBar icon="🤝" label="합의 및 결론" score={90} />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="report-bottom-row">
        {/* AI 코치 인사이트 */}
        <div className="report-card insight-card">
          <h3 className="report-card-title">🤖 AI 코치 인사이트</h3>
          <div className="insight-cols">
            <div className="insight-col">
              <h4 className="insight-heading keep">👍 강점 (Keep)</h4>
              <div className="insight-box keep">
                <strong>적극적인 인정 화법</strong>
                <p>팀원의 과거 성과(결제 모듈)를 구체적으로 언급하며 인정한 점이 라포 형성에 매우 효과적이었습니다.</p>
              </div>
              <div className="insight-box keep">
                <strong>명확한 다음 단계 제시</strong>
                <p>면담 마지막에 다음 1on1 일정을 잡고 액션 아이템을 요약해준 점이 좋았습니다.</p>
              </div>
            </div>
            <div className="insight-col">
              <h4 className="insight-heading improve">🔧 개선점 (Improve)</h4>
              <div className="insight-box improve">
                <strong>폐쇄형 질문 빈도</strong>
                <p>초반 탐색 과정에서 &quot;예/아니오&quot;로 대답하게 되는 질문이 많았습니다. &apos;어떻게&apos;를 활용한 개방형 질문을 늘려보세요.</p>
              </div>
              <div className="insight-box improve">
                <strong>침묵 견디기</strong>
                <p>팀원이 고민할 때 바로 말을 덧붙이기보다 3초 정도 더 기다려주는 여유가 필요합니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 추천 액션 아이템 */}
        <div className="report-card action-card">
          <div className="action-header">
            <h3 className="report-card-title">≡ 추천 액션 아이템</h3>
            <button className="action-link">To-Do에 추가</button>
          </div>
          <div className="action-list">
            <label className="action-item">
              <input type="checkbox" />
              <span>다음 주까지 개방형 질문(Open-ended Question) 리스트 5개 작성해보기</span>
            </label>
            <label className="action-item">
              <input type="checkbox" />
              <span>팀원에게 리드 개발자 역할 정의서(Role Description) 초안 공유하기</span>
            </label>
            <label className="action-item">
              <input type="checkbox" />
              <span>SBI(Situation-Behavior-Impact) 피드백 모델 연습 시나리오 1회 더 진행</span>
            </label>
          </div>
          <div className="action-footer">
            <span>다음 추천 시나리오:</span>
            <a href="#">성과 저조 팀원 피드백 →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
