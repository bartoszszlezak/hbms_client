import {
  faShoppingCart,
  faSmileBeam,
  faPlane,
  faFileInvoiceDollar,
  faCar,
  faMoneyBill,
  faUserNurse
} from "@fortawesome/free-solid-svg-icons";

const iconPicker = (iconName) => {
  switch (iconName){
    case "faShoppingCart": return faShoppingCart;
    case "faSmileBeam": return faSmileBeam;
    case "faPlane": return faPlane;
    case "faFileInvoiceDollar": return faFileInvoiceDollar;
    case "faUserNurse": return faUserNurse;
    case "faMoneyBill": return faMoneyBill;
    case "faCar": return faCar;
    default: return null;
  }
}

export default iconPicker;