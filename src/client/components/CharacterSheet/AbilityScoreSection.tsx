import React from 'react';
import { Card } from 'antd';
import SkillItem from './SkillItem';
import D20Roll from './D20Roll';
import { SKILLS } from './constants';

interface AbilityScoreSectionProps {
  abilityName: string;
  score: number;
  setScore: (score: number) => void;
  proficiencyBonus: number;
  proficientSkills: string[];
  toggleProficiency: (skill: string) => void;
  onRoll: (result: any) => void;
}

const AbilityScoreSection: React.FC<AbilityScoreSectionProps> = ({
  abilityName,
  score,
  setScore,
  proficiencyBonus,
  proficientSkills,
  toggleProficiency,
  onRoll
}) => {
  const modifier = Math.floor((score - 10) / 2);
  const modifierDisplay = modifier >= 0 ? `+${modifier}` : modifier;

  return (
    <Card title={abilityName} className="ability-section">
      <div className="ability-score">
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(Math.min(30, Math.max(1, Number.parseInt(e.target.value) || 0)))}
        />
        <div className="modifier">{modifierDisplay}</div>
        <D20Roll 
          modifier={modifier} 
          skillName={abilityName}
          abilityMod={modifier}
          proficiencyBonus={0}
          onRoll={onRoll}
        />
      </div>
      
      <div className="skills">
        {SKILLS[abilityName as keyof typeof SKILLS]?.map(skillName => (
          <SkillItem
            key={skillName}
            name={skillName}
            ability={abilityName}
            abilityMod={modifier}
            proficiencyBonus={proficiencyBonus}
            isProficient={proficientSkills.includes(skillName)}
            toggleProficiency={toggleProficiency}
            onRoll={onRoll}
          />
        ))}
      </div>
    </Card>
  );
};export default AbilityScoreSection;
