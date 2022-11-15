import {
  faShoppingCart,
  faSmileBeam,
  faPlane,
  faFileInvoiceDollar,
  faTshirt,
} from "@fortawesome/free-solid-svg-icons";

const iconPicker = (iconName) => {
  switch (iconName){
    case "faShoppingCart": return faShoppingCart;
    case "faSmileBeam": return faSmileBeam;
    case "faPlane": return faPlane;
    case "faFileInvoiceDollar": return faFileInvoiceDollar;
    case "faTshirt": return faTshirt;
    default: return null;
  }
}

export default iconPicker;