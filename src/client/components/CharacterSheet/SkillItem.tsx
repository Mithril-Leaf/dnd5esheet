import React from 'react';
import { Checkbox } from 'antd';
import D20Roll from './D20Roll';

interface SkillItemProps {
  name: string;
  ability: string;
  abilityMod: number;
  proficiencyBonus: number;
  isProficient: boolean;
  toggleProficiency: (name: string) => void;
  onRoll: (result: any) => void;
}

const SkillItem: React.FC<SkillItemProps> = ({
  name,
  ability,
  abilityMod,
  proficiencyBonus,
  isProficient,
  toggleProficiency,
  onRoll
}) => {
  const totalModifier = abilityMod + (isProficient ? proficiencyBonus : 0);
  const modifierDisplay = totalModifier >= 0 ? `+${totalModifier}` : totalModifier;

  return (
    <div className="skill-item">
      <Checkbox
        checked={isProficient}
        onChange={() => toggleProficiency(name)}
      />
      <span className="skill-name">{name}</span>
      <span className="modifier">{modifierDisplay}</span>
      <D20Roll 
        modifier={totalModifier} 
        skillName={name}
        abilityMod={abilityMod}
        proficiencyBonus={isProficient ? proficiencyBonus : 0}
        onRoll={onRoll}
      />
    </div>
  );
};export default SkillItem;
