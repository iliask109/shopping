import { GiElectric, GiClothes, GiHealthNormal } from "react-icons/gi";
import { IoCameraSharp } from "react-icons/io5";
import { FaLaptop } from "react-icons/fa";
import { BsPhoneFill } from "react-icons/bs";
import { MdFastfood, MdSportsFootball, MdOutdoorGrill } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { FiHome } from "react-icons/fi";
const list = [
  {
    index: 0,
    title: "Electronics",
    icon: <GiElectric />,
  },
  {
    index: 1,
    title: "Cameras",
    icon: <IoCameraSharp />,
  },
  {
    index: 2,
    title: "Laptops",
    icon: <FaLaptop />,
  },
  {
    index: 3,
    title: "Headphones",
    icon: <BsPhoneFill />,
  },
  {
    index: 4,
    title: "Food",
    icon: <MdFastfood />,
  },
  {
    index: 5,
    title: "Books",
    icon: <ImBooks />,
  },
  {
    index: 6,
    title: "Clothes",
    icon: <GiClothes />,
  },
  {
    index: 7,
    title: "Health",
    icon: <GiHealthNormal />,
  },
  {
    index: 8,
    title: "Sports",
    icon: <MdSportsFootball />,
  },
  {
    index: 9,
    title: "Outdoor",
    icon: <MdOutdoorGrill />,
  },
  {
    index: 10,
    title: "Home",
    icon: <FiHome />,
  },
];

export default list;
