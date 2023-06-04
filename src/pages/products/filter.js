/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Card, CardBody, FormGroup, Input, Label } from "reactstrap";
import { LayoutContext } from "../../layout/layout";
import { getBrandList, getModelList } from "../../helpers/product-helper";

export default function Filter() {
  const [selectedOrder, setSelectedOrder] = useState("fn");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const layoutProps = useContext(LayoutContext);
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredBrandList, setFilteredBrandList] = useState([]);
  const [filteredModelList, setFilteredModelList] = useState([]);

  useEffect(() => {
    layoutProps.setOrder(selectedOrder);
  }, [selectedOrder]);

  useEffect(() => {
    layoutProps.setProductFilters({ ...layoutProps.productFilters, brand: selectedBrands });
  }, [selectedBrands]);

  useEffect(() => {
    layoutProps.setProductFilters({ ...layoutProps.productFilters, model: selectedModels });
  }, [selectedModels]);

  useEffect(() => {
    if (brands.length === 0) {
      getBrandList().then((data) => {
        setBrands(data);
        setFilteredBrandList(data);
      });
    }
    if (models.length === 0) {
      getModelList().then((data) => {
        setModels(data);
        setFilteredModelList(data);
      });
    }
  }, []);

  const changeOrder = (e) => {
    const value = e.target.value;
    setSelectedOrder(value);
  };

  const filteredBrands = (text) => {
    let filtered = brands.filter((item) => item.toLowerCase().includes(text.toLowerCase()));
    setFilteredBrandList(filtered);
  };
  const filteredModels = (text) => {
    let filtered = models.filter((item) => item.toLowerCase().includes(text.toLowerCase()));
    setFilteredModelList(filtered);
  };
  const handleBrandsChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBrands((prevSelectedItems) => [...prevSelectedItems, value]);
    } else {
      setSelectedBrands((prevSelectedItems) => prevSelectedItems.filter((item) => item !== value));
    }
  };
  const handleModelsChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedModels((prevSelectedItems) => [...prevSelectedItems, value]);
    } else {
      setSelectedModels((prevSelectedItems) => prevSelectedItems.filter((item) => item !== value));
    }
  };
  return (
    <div>
      <div className="d-flex flex-column">
        <span className="text-muted align-self-start ms-1">Sırala</span>
        <Card className="p-0.5 mb-2 shadow-sm bg-white rounded">
          <CardBody className="p-2">
            <FormGroup check>
              <Input name="radio1" value={"ph"} onChange={changeOrder} checked={selectedOrder === "ph"} type="radio" /> <Label style={{ fontSize: "1.4vw" }}>En yüksek fiyat</Label>
            </FormGroup>
            <FormGroup check>
              <Input name="radio1" value={"pl"} onChange={changeOrder} checked={selectedOrder === "pl"} type="radio" /> <Label style={{ fontSize: "1.4vw" }}>En düşük fiyat</Label>
            </FormGroup>
            <FormGroup check>
              <Input name="radio1" value={"fn"} onChange={changeOrder} checked={selectedOrder === "fn"} type="radio" /> <Label style={{ fontSize: "1.4vw" }}>En yeni</Label>
            </FormGroup>
            <FormGroup check>
              <Input name="radio1" value={"fo"} onChange={changeOrder} checked={selectedOrder === "fo"} type="radio" /> <Label style={{ fontSize: "1.4vw" }}>En eski</Label>
            </FormGroup>
          </CardBody>
        </Card>
      </div>
      <div className="d-flex flex-column">
        <span className="text-muted align-self-start ms-1">Marka</span>
        <Card className="p-0.5 mb-2 shadow-sm bg-white rounded">
          <CardBody className="p-2">
            <Input type="search" placeholder="Marka Ara.." bsSize="sm" onChange={(e) => filteredBrands(e.target.value)} />
            <div className="mt-2" style={{ maxHeight: 200, overflow: "scroll", zIndex: 99 }}>
              {filteredBrandList.map((item) => {
                const isChecked = selectedBrands.includes(item);
                return (
                  <div key={item} className="d-flex justify-content-start align-content-center">
                    <Input checked={isChecked} onChange={handleBrandsChange} style={{ fontSize: 18 }} type="checkbox" value={item} className="m-1" />
                    <Label className="text-truncate text-muted" size="sm">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="d-flex flex-column">
        <span className="text-muted align-self-start ms-1">Model</span>
        <Card className="p-0.5">
          <CardBody className="p-2">
            <Input type="search" placeholder="Marka Ara.." bsSize="sm" onChange={(e) => filteredModels(e.target.value)} />
            <div className="mt-2" style={{ maxHeight: 200, overflow: "scroll" }}>
              {filteredModelList.map((item) => {
                const isChecked = selectedModels.includes(item);
                return (
                  <div key={item} className="d-flex justify-content-start align-content-center">
                    <Input checked={isChecked} onChange={handleModelsChange} style={{ fontSize: 18 }} type="checkbox" value={item} className="m-1" />
                    <Label className="text-truncate text-muted" size="sm">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
