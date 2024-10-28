import type React from 'react';
import { useState } from 'react';
import { Card, Input, Space, Button } from 'antd';
import D20Roll from './D20Roll';

const { TextArea } = Input;

interface CharacterInfoProps {
  proficiencyBonus: number;
  onRoll: (result: RollResult) => void;
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({ proficiencyBonus, onRoll }) => {
  const [tools, setTools] = useState(Array(5).fill(''));
  const [toolResults, setToolResults] = useState(Array(5).fill(null));
  const [characterDetails, setCharacterDetails] = useState({
    name: '',
    homeland: '',
    alignment: '',
    languages: ''
  });

  const updateTool = (index: number, value: string) => {
    const newTools = [...tools];
    newTools[index] = value;
    setTools(newTools);
  };

  const rollTool = (index: number) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + proficiencyBonus;
    
    // Send to top alert display
    onRoll({
      roll,
      skillName: `Tool (${tools[index]})`,
      abilityMod: 0,
      proficiencyBonus,
      total: total,
      message: "Remember to add your ability modifier to this roll"
    });
    
    // Clear the inline tool results
    setToolResults(prev => {
      const newResults = [...prev];
      newResults[index] = null;
      return newResults;
    });
  };
  return (
    <div className="character-info">
      <Card title="Character Details" className="details-card">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Character Name"
            value={characterDetails.name}
            onChange={e => setCharacterDetails(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            placeholder="Homeland"
            value={characterDetails.homeland}
            onChange={e => setCharacterDetails(prev => ({ ...prev, homeland: e.target.value }))}
          />
          <Input
            placeholder="Alignment"
            value={characterDetails.alignment}
            onChange={e => setCharacterDetails(prev => ({ ...prev, alignment: e.target.value }))}
          />
          <TextArea
            placeholder="Known Languages"
            value={characterDetails.languages}
            onChange={e => setCharacterDetails(prev => ({ ...prev, languages: e.target.value }))}
          />
        </Space>
      </Card>

      <Card title="Tool Proficiencies" className="tools-card">
        {tools.map((tool, index) => (
          <div key={index} className="tool-entry">
            <Input
              placeholder={`Tool ${index + 1}`}
              value={tool}
              onChange={e => updateTool(index, e.target.value)}
            />
            {tool && (
              <div className="tool-roll">
                <span className="modifier">+{proficiencyBonus}</span>
                <Button 
                  onClick={() => rollTool(index)}
                  type="primary"
                  icon="🎲"
                >
                  Roll
                </Button>
                {toolResults[index] && (
                  <span className="roll-result">
                    {toolResults[index].roll} + {toolResults[index].modifier} = {toolResults[index].total}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
};

export default CharacterInfo;