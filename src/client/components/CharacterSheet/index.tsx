import React, { useState } from 'react';
import { Layout, Space, Alert } from 'antd';
import AbilityScoreSection from './AbilityScoreSection';
import CharacterInfo from './CharacterInfo';
import { SKILLS } from './constants';
import './styles.css';

interface RollResult {
  roll: number;
  skillName: string;
  abilityMod: number;
  proficiencyBonus: number;
  total: number;
}

const CharacterSheet: React.FC = () => {
  const [abilities, setAbilities] = useState({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10
  });

  const [proficiencyBonus, setProficiencyBonus] = useState(2);
  const [proficientSkills, setProficientSkills] = useState<string[]>([]);
  const [currentRoll, setCurrentRoll] = useState<RollResult | null>(null);

  const toggleProficiency = (skillName: string) => {
    setProficientSkills(prev => 
      prev.includes(skillName) 
        ? prev.filter(skill => skill !== skillName)
        : [...prev, skillName]
    );
  };

  return (
    <Layout>
      <Layout.Content className="site-layout-content">
        <div className="character-sheet">
          <div className="header">
            <h1>D&D 5E Character Sheet</h1>
            <Space size="large" className="top-controls">
              <div className="proficiency-bonus">
                <label>Proficiency Bonus:</label>
                <input
                  type="number"
                  value={proficiencyBonus}
                  onChange={(e) => setProficiencyBonus(Math.max(0, Number.parseInt(e.target.value) || 0))}
                />
              </div>
              {currentRoll && (
                <Alert
                  message={`${currentRoll.skillName} Check`}
                  description={
                    currentRoll.skillName.startsWith('Tool') 
                      ? `Roll: ${currentRoll.roll} + ${currentRoll.proficiencyBonus} (proficiency) + [Add your ability modifier] = ${currentRoll.total}+[ability mod]`
                      : `Roll: ${currentRoll.roll} + ${currentRoll.abilityMod} (ability) ${
                          currentRoll.proficiencyBonus ? `+ ${currentRoll.proficiencyBonus} (proficiency)` : ''
                        } = ${currentRoll.total}`
                  }
                  type="info"
                />
              )}
            </Space>
          </div>
          
          <CharacterInfo 
            proficiencyBonus={proficiencyBonus}
            onRoll={setCurrentRoll} 
          />
          
          <div className="abilities-grid">
            {Object.entries(abilities).map(([ability, score]) => (
              <AbilityScoreSection
                key={ability}
                abilityName={ability}
                score={score}
                setScore={(newScore) => setAbilities(prev => ({
                  ...prev,
                  [ability]: newScore
                }))}
                proficiencyBonus={proficiencyBonus}
                proficientSkills={proficientSkills}
                toggleProficiency={toggleProficiency}
                onRoll={setCurrentRoll}
              />
            ))}
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};export default CharacterSheet;