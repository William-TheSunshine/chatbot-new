"use client";

import { useState } from "react";

const PERSONA_TYPES = [
  "적극형 (Challenger)",
  "분석형 (Analyst)",
  "협력형 (Collaborator)",
  "회피형 (Avoider)",
];

const JOB_TITLES = [
  "Frontend Developer",
  "Backend Developer",
  "Designer",
  "Product Manager",
  "Data Analyst",
  "QA Engineer",
];

const WORK_TYPES = [
  "사무실 근무 (주 5일)",
  "하이브리드 (주 2회 출근)",
  "하이브리드 (주 3회 출근)",
  "재택 근무",
];

interface PersonaData {
  name: string;
  age: number;
  years: number;
  jobTitle: string;
  personaType: string;
  gender: "male" | "female";
  workType: string;
  extrovert: number;
  rational: number;
}

export default function PersonaScreen() {
  const [activeTab, setActiveTab] = useState("기본 정보");
  const [persona, setPersona] = useState<PersonaData>({
    name: "김민수",
    age: 30,
    years: 3,
    jobTitle: "Frontend Developer",
    personaType: "적극형 (Challenger)",
    gender: "male",
    workType: "하이브리드 (주 2회 출근)",
    extrovert: 70,
    rational: 55,
  });

  // Avatar state
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const tabs = ["기본 정보", "성향 및 스타일", "배경 및 컨텍스트", "행동 규칙"];

  const shortName = persona.name.length >= 2 ? persona.name.slice(0, 2) : persona.name;
  const typeLabel = persona.personaType.split(" (")[0];

  const traitTags = ["직설적 화법", "빠른 피드백 선호", "논리적"];

  // Check if all basic fields are filled
  const isBasicInfoComplete = (): boolean => {
    return (
      persona.name.trim().length > 0 &&
      persona.age > 0 &&
      persona.years > 0 &&
      persona.jobTitle.length > 0 &&
      persona.personaType.length > 0 &&
      persona.gender.length > 0
    );
  };

  // Generate avatar with Gemini API
  const generateAvatar = async () => {
    if (!isBasicInfoComplete() || avatarLoading) return;

    setAvatarLoading(true);
    setAvatarError(null);

    try {
      const res = await fetch("/api/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: persona.name,
          age: persona.age,
          gender: persona.gender,
          jobTitle: persona.jobTitle,
          personaType: persona.personaType,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setAvatarUrl(data.imageUrl);
    } catch (error) {
      console.error("Avatar generation failed:", error);
      setAvatarError("이미지 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setAvatarLoading(false);
    }
  };

  return (
    <div className="persona-page">
      {/* Header */}
      <div className="persona-header">
        <div className="persona-header-left">
          <button className="persona-back-btn">&#8592;</button>
          <div>
            <h2 className="persona-header-title">팀원 캐릭터 세부 설정</h2>
            <p className="persona-header-desc">
              AI가 연기할 팀원의 성향과 배경 정보를 상세하게 설정합니다.
            </p>
          </div>
        </div>
        <div className="persona-header-actions">
          <button className="btn-outline">임시 저장</button>
          <button className="btn-primary">&#9654; 테스트 대화</button>
        </div>
      </div>

      {/* Body */}
      <div className="persona-body">
        {/* Left: Character Preview Card */}
        <div className="persona-preview">
          <div className="persona-card">
            <div className="persona-avatar">
              {avatarLoading ? (
                <div className="avatar-spinner" />
              ) : avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={`${persona.name} avatar`}
                  className="avatar-image"
                />
              ) : (
                <span>{shortName}</span>
              )}
            </div>

            {/* Avatar actions */}
            <div className="avatar-actions">
              {!avatarUrl && !avatarLoading && (
                <button
                  className="btn-generate-avatar"
                  onClick={generateAvatar}
                  disabled={!isBasicInfoComplete()}
                  title={
                    !isBasicInfoComplete()
                      ? "기본 정보를 모두 입력해주세요"
                      : "AI 캐릭터 사진을 생성합니다"
                  }
                >
                  &#x1F4F7; AI 사진 생성
                </button>
              )}
              {avatarUrl && !avatarLoading && (
                <button
                  className="btn-regenerate-avatar"
                  onClick={generateAvatar}
                >
                  &#x21bb; 다시 생성
                </button>
              )}
              {avatarLoading && (
                <span className="avatar-loading-text">생성 중...</span>
              )}
              {avatarError && <p className="avatar-error">{avatarError}</p>}
            </div>

            <h3 className="persona-name">{persona.name}</h3>
            <p className="persona-role">{persona.jobTitle}</p>
            <div className="persona-tags">
              <span className="tag blue">{typeLabel}</span>
              <span className="tag blue">성취지향</span>
            </div>

            <div className="persona-bio">
              <h4>CHARACTER BIO</h4>
              <p>
                입사 {persona.years}년차 프론트엔드 개발자. 새로운 기술
                도입에 적극적이며, 자신의 성장이 회사의 성장과 일치하길
                바랍니다. 최근 코드 리뷰 방식에 대해 불만을 가지고 있으며,
                리드 개발자로의 승진을 목표로 하고 있습니다.
              </p>
            </div>

            <div className="persona-traits">
              <h4>KEY TRAITS</h4>
              <div className="trait-tags">
                {traitTags.map((t, i) => (
                  <span key={i} className="tag outline">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="persona-tip">
            <span className="tip-icon">&#9432;</span>
            <div>
              <strong>설정 팁</strong>
              <p>
                &apos;적극형&apos; 팀원은 명확한 목표 제시를 선호합니다.
                스트레스 요인에 &apos;모호한 지시&apos;를 추가하면 더 현실적인
                시뮬레이션이 가능합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="persona-form-area">
          <div className="persona-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`persona-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="persona-form">
            {/* Row 1: 이름, 나이, 경력 연차 */}
            <div className="form-row">
              <div className="form-group">
                <label>이름</label>
                <input
                  type="text"
                  value={persona.name}
                  onChange={(e) =>
                    setPersona({ ...persona, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>나이</label>
                <div className="input-suffix">
                  <input
                    type="number"
                    min={20}
                    max={65}
                    value={persona.age}
                    onChange={(e) =>
                      setPersona({ ...persona, age: Number(e.target.value) })
                    }
                  />
                  <span>세</span>
                </div>
              </div>
              <div className="form-group">
                <label>경력 연차</label>
                <div className="input-suffix">
                  <input
                    type="number"
                    value={persona.years}
                    onChange={(e) =>
                      setPersona({ ...persona, years: Number(e.target.value) })
                    }
                  />
                  <span>년차</span>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="form-row">
              <div className="form-group">
                <label>직무 (Job Title)</label>
                <select
                  value={persona.jobTitle}
                  onChange={(e) =>
                    setPersona({ ...persona, jobTitle: e.target.value })
                  }
                >
                  {JOB_TITLES.map((j) => (
                    <option key={j}>{j}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>페르소나 유형</label>
                <select
                  value={persona.personaType}
                  onChange={(e) =>
                    setPersona({ ...persona, personaType: e.target.value })
                  }
                >
                  {PERSONA_TYPES.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="form-row">
              <div className="form-group">
                <label>성별</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      checked={persona.gender === "male"}
                      onChange={() =>
                        setPersona({ ...persona, gender: "male" })
                      }
                    />
                    남성
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      checked={persona.gender === "female"}
                      onChange={() =>
                        setPersona({ ...persona, gender: "female" })
                      }
                    />
                    여성
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>근무 형태</label>
                <select
                  value={persona.workType}
                  onChange={(e) =>
                    setPersona({ ...persona, workType: e.target.value })
                  }
                >
                  {WORK_TYPES.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sliders */}
            <div className="form-sliders">
              <h4>&#9881; 성향 상세 조정 (Personality Sliders)</h4>

              <div className="slider-row">
                <span className="slider-label-left">내향적 (Introvert)</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={persona.extrovert}
                  onChange={(e) =>
                    setPersona({ ...persona, extrovert: Number(e.target.value) })
                  }
                />
                <span className="slider-label-right">외향적 (Extrovert)</span>
              </div>

              <div className="slider-row">
                <span className="slider-label-left">감성적 (Emotional)</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={persona.rational}
                  onChange={(e) =>
                    setPersona({ ...persona, rational: Number(e.target.value) })
                  }
                />
                <span className="slider-label-right">이성적 (Rational)</span>
              </div>
            </div>

            {/* Footer */}
            <div className="form-footer">
              <button className="btn-reset">&#128465; 초기화</button>
              <span className="form-timestamp">
                마지막 수정: 2026.02.06 14:30
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
