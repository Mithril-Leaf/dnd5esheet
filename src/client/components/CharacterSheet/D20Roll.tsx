import React, { useState } from 'react';
import { Button, Alert } from 'antd';
interface D20RollProps {
  modifier: number;
  skillName?: string;
  abilityMod: number;
  proficiencyBonus: number;
  onRoll: (result: { roll: number; skillName: string; abilityMod: number; proficiencyBonus: number; total: number }) => void;
}

const D20Roll: React.FC<D20RollProps> = ({ modifier, skillName, abilityMod, proficiencyBonus, onRoll }) => {
  const rollD20 = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + modifier;
    onRoll({
      roll,
      skillName: skillName || 'Ability',
      abilityMod,
      proficiencyBonus,
      total
    });
  };
  
  return (
    <div className="d20-roll">
      <Button onClick={rollD20} type="primary" icon="🎲">
        Roll
      </Button>
    </div>
  );
};
export default D20Roll;
