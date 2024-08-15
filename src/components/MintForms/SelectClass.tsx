import { useRecoilState } from "recoil";
import { useState } from "react";
import sword from '@/../public/components/mint/swordsmen.svg';
import dogSword from '@/../public/components/mint/dog-sword.svg';
import dogWizzard from '@/../public/components/mint/dog-wizzard.svg';
import dogArcher from '@/../public/components/mint/dog-archer.svg';
import dogPriest from '@/../public/components/mint/dog-priest.svg';
import wizard from '@/../public/components/mint/wizard.svg';
import archer from '@/../public/components/mint/archer.svg';
import priest from '@/../public/components/mint/priest.svg';
import { createNftAtom } from "@/presentation/atoms/createNftAtom";
import StepsMint from "./StepsMint";
import { FormImageBg } from '../FormImageBg';

export function SelectClass() {
  const [selectedClass, setSelectedClass] = useState<string>();
  const [heroClassAt, setHeroClass] = useRecoilState(createNftAtom);

  const handleSelectClass = (heroClass: string) => {
    setSelectedClass(heroClass);
    setHeroClass({
      ...heroClassAt,
      class: heroClass
    })
  };
  return (
    <form className="flex justify-center flex-col items-center">
      <h2 className="text-2xl text-center">Select your class</h2>
      <div className="w-full my-5 gap-1  lg:gap-8 lg:my-10 grid grid-cols-2 lg:grid-cols-4">
        <button type="button" onClick={() => handleSelectClass("swordsman")}>
          <FormImageBg highlight={selectedClass == 'swordsman'} name={"Swordsman"} image={heroClassAt.race == 'bonk' ? dogSword : sword} />
        </button>
        <button type="button"

        // onClick={() => handleSelectClass("wizard")}
        >
          <FormImageBg highlight={selectedClass == 'wizard'} name={"Wizard"} image={heroClassAt.race == 'bonk' ? dogWizzard : wizard} />
        </button>
        <button type="button"

        // onClick={() => handleSelectClass("archer")}
        >
          <FormImageBg highlight={selectedClass == 'archer'} name={"Archer"} image={heroClassAt.race == 'bonk' ? dogArcher : archer} />
        </button>
        <button type="button"

        // onClick={() => handleSelectClass("priest")}
        >
          <FormImageBg highlight={selectedClass == 'priest'} name={"Priest"} image={heroClassAt.race == 'bonk' ? dogPriest : priest} />
        </button>
      </div>
      <StepsMint currentStep={2} />
    </form>
  );
}
