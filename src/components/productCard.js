import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { addToCardItem } from "../helpers/product-helper";

export default function ProductCard({ item }) {
  let navigate = useNavigate();
  const addToCard = (event, item) => {
    event.stopPropagation();
    addToCardItem(item);
    window.dispatchEvent(new Event("storageChanged"));
  };
  return (
    <Card
      onClick={() =>
        navigate(`/product-detail/${item.id}`, {
          state: item,
        })
      }
      className="col-md-3 my-2"
      color="light"
      outline
      style={{
        width: "200px",
        padding: 0,
        margin: 4,
      }}
    >
      <img alt="Sample" src={item.image} />
      <CardBody>
        {item.brand}
        <CardTitle tag="h6" className="text-muted text-truncate" style={{ fontSize: ".9rem" }}>
          {item.model}
        </CardTitle>
        <CardSubtitle style={{ fontSize: ".8rem" }} className="mb-2" tag="h6">
          {item.price + "₺"}
        </CardSubtitle>
        <Button style={{ fontSize: 12 }} size="sm" onClick={(event) => addToCard(event, item)} color="primary" className="align-content-center justify-content-center d-flex align-items-center w-100">
          Sepete Ekle
        </Button>
      </CardBody>
    </Card>
  );
}
