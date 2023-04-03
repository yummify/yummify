import frenchIcon from "./Icons/French.png";
import sushiIcon from "./Icons/Sushi.png";
import indianIcon from "./Icons/Indian.png";
import chineseIcon from "./Icons/Chinese.png";
import italianIcon from "./Icons/Italian.png";
import greekIcon from "./Icons/Greek.png";
import mexicanIcon from "./Icons/Mexican.png";
import thaiIcon from "./Icons/Thai.png";
import allIcon from "./Icons/All.png";
import saladIcon from "./Icons/Salad.png";
import pizzaIcon from "./Icons/Pizza.png";
import americanIcon from "./Icons/American.png";

const options = [
  {
    name: "All",
    icon: <img src={allIcon} alt="All" />,
    filter: "All",
  },
  {
    name: "Mexican",
    icon: <img src={mexicanIcon} alt="Mexican" />,
    filter: "Mexican",
  },
    {
    name: "Chinese",
    icon: <img src={chineseIcon} alt="Chinese" />,
    filter: "Chinese",
  },
  { name: "Sushi", icon: <img src={sushiIcon} alt="Sushi" />, filter: "Sushi" },
  {
    name: "Indian",
    icon: <img src={indianIcon} alt="Indian" />,
    filter: "Indian",
  },
  {
    name: "Salads",
    icon: <img src={saladIcon} alt="Salad" />,
    filter: "Salads",
  },
  {
    name: "Italian",
    icon: <img src={italianIcon} alt="Italian" />,
    filter: "Italian",
  },
  { name: "Thai", icon: <img src={thaiIcon} alt="Thai" />, filter: "Thai" },
  {
    name: "French",
    icon: <img src={frenchIcon} alt="French" />,
    filter: "French",
  },

  { name: "Pizza", icon: <img src={pizzaIcon} alt="Pizza" />, filter: "Pizza" },
  {
    name: "American",
    icon: <img src={americanIcon} alt="American" />,
    filter: "American",
  },


  { name: "Greek", icon: <img src={greekIcon} alt="Greek" />, filter: "Greek" },
];

export default options;
