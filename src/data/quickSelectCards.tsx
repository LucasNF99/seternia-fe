import townHall from "@/../public/components/quickSelect/town-hall-bt.svg";
import townHallBg from "@/../public/components/quickSelect/town-hall.svg";
import theAltar from "@/../public/components/quickSelect/the-altar-bt.svg";
import theAltarBg from "@/../public/components/quickSelect/the-altar.svg";
import westDung from "@/../public/components/quickSelect/west-dung-bt.svg";
import westDungBg from "@/../public/components/quickSelect/west-dung.svg";
import eastDung from "@/../public/components/quickSelect/east-dung-bt.svg";
import eastDungBg from "@/../public/components/quickSelect/east-dung.svg";
import northDung from "@/../public/components/quickSelect/north-dung-bt.svg";
import northDungBg from "@/../public/components/quickSelect/north-dung.svg";
import bonk from "@/../public/components/quickSelect/bonk-ruins-bt.svg";
import bonkBg from "@/../public/components/quickSelect/bonk-ruins.svg";
import { Pages } from "@/presentation/enums/pages";


export const cardsData = [
  {
    direction: Pages.TOWN_HALL,
    alt: 'Town Hall',
    buttonImg: townHall,
    locationImage: townHallBg,
    text: 'Find services of all kinds around here.'
  },
  {
    direction: Pages.MINT_RUNE,
    alt: 'The Altar',
    buttonImg: theAltar,
    locationImage: theAltarBg,
    text: 'Summon your hero.'
  },
  {
    direction: Pages.BONK_RUINS,
    alt: 'Bonk Ruins',
    buttonImg: bonk,
    locationImage: bonkBg,
    text: 'Explore the Bonk Ruins.'
  },
  {
    direction: '#',
    alt: 'West Dungeon',
    buttonImg: westDung,
    locationImage: westDungBg,
    text: 'Explore the West Dungeon.'
  },
  {
    direction: '#',
    alt: 'East Dungeon',
    buttonImg: eastDung,
    locationImage: eastDungBg,
    text: 'Explore the East Dungeon.'
  },
  {
    direction: '#',
    alt: 'North Dungeon',
    buttonImg: northDung,
    locationImage: northDungBg,
    text: 'Explore the North Dungeon.'
  },

]