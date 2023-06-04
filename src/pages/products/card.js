import { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { addToCardItem, cardTotalPrice, removeCardItem } from "../../helpers/product-helper";

export default function ShoppingCard() {
  const [totalPrice, setTotalPrice] = useState("");
  const [card, setCard] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      setTotalPrice(cardTotalPrice());
      let data = JSON.parse(localStorage.getItem("card"));
      let cardData = [];
      data &&
        data.forEach((d) => {
          let updatedIndex = cardData.findIndex((e) => e.id === d.id);
          if (updatedIndex !== -1) {
            let updateItem = cardData[updatedIndex];
            updateItem["count"] = updateItem.count ?? 0;
            updateItem.price = (parseFloat(d.price) + parseFloat(updateItem.price)).toString();
            updateItem.count++;
            cardData.splice(updatedIndex, 1);
            cardData.push(updateItem);
          } else {
            d["count"] = 1;
            cardData.push(d);
          }
        });
      cardData.sort((a, b) => a.name.localeCompare(b.name));
      setCard(cardData);
    };
    handleStorageChange();
    window.addEventListener("storageChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storageChanged", handleStorageChange);
    };
  }, []);

  const addToCard = (item) => {
    item.price = (parseFloat(item.price) / item.count).toString();
    delete item.count;
    addToCardItem(item);
    window.dispatchEvent(new Event("storageChanged"));
  };

  const removeToCard = (item) => {
    removeCardItem(item.id);
    window.dispatchEvent(new Event("storageChanged"));
  };

  return (
    <div>
      <Card className="p-0.5 mb-2 shadow-sm bg-white rounded">
        <CardBody
          style={{
            maxHeight: 600,
            overflow: "scroll",
          }}
          className="d-flex flex-column justify-content-between px-2 py-1"
        >
          {card && card.length > 0 ? (
            card.map((item, i) => {
              return (
                <div key={i}>
                  <div>{item.brand}</div>
                  <div className="text-muted text-truncate">{item.model}</div>
                  <div>{item.price}₺</div>
                  <div className="d-flex justify-content-center pb-2" style={{ borderBottom: "1px solid #19161645" }}>
                    <Button onClick={() => removeToCard(item)} color="primary" className="me-2" size="sm">
                      -
                    </Button>
                    <div className="d-flex align-items-center">{item.count}</div>
                    <Button onClick={() => addToCard(item)} color="primary" className="ms-2" size="sm">
                      +
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Sepet Boş</div>
          )}
        </CardBody>
      </Card>
      <Card className="p-0.5 mb-2 shadow-sm bg-white rounded">
        <CardBody className="px-0 py-2">
          <div>
            <span>Toplam: </span>
            <span>{totalPrice}₺</span>
          </div>
          <div>
            <Button color="primary" className="w-75" style={{ fontSize: "1.3vw" }}>
              Ödeme Yap
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
