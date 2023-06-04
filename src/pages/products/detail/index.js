import { useLocation } from "react-router";
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import ShoppingCard from "../card";
import { BsBasket } from "react-icons/bs";
import { addToCardItem } from "../../../helpers/product-helper";

export default function ProductDetail() {
  const location = useLocation();

  const addToCard = () => {
    addToCardItem(location.state);
    window.dispatchEvent(new Event("storageChanged"));
  };

  return location.state ? (
    <div className="row">
      <Card className="d-flex flex-lg-row flex-md-column col-md-9 col-lg-10 col-xl-10 flex-md-row">
        <CardImg
          alt="Card image cap"
          src={location.state.image ?? ""}
          style={{
            maxHeight: 300,
            objectFit: "contain",
            alignSelf: "center",
          }}
        />
        <CardBody>
          <CardTitle tag="h5">{location.state.name}</CardTitle>
          <CardText>{location.state.price}₺</CardText>
          <Button size="sm" onClick={(e) => addToCard(e)} color="primary" className="align-content-center justify-content-center d-flex align-items-center w-100">
            <BsBasket className="me-2" />
            Sepete Ekle
          </Button>
          <CardText>
            <small className="text-muted">{location.state.description}</small>
          </CardText>
        </CardBody>
      </Card>
      <div className="col-md-3 col-lg-2 col-xl-2 text-center d-sm-none d-md-block">
        <ShoppingCard />
      </div>
    </div>
  ) : null;
}
