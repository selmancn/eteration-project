import React from "react";
import { render } from "@testing-library/react";
import ProductCard from "../src/components/productCard";
import { MemoryRouter } from "react-router";

test("Product Card Render", () => {
  render(
    <MemoryRouter>
      <ProductCard
        item={{
          createdAt: "2022-03-30T05:50:53.201Z",
          name: "Polestar Golf",
          // image: "http://placeimg.com/640/480/sports",
          price: "802.00",
          description:
            "Repudiandae minima non molestiae. Vitae in qui sed. Est voluptas facilis corrupti autem molestiae quaerat provident neque. Possimus sit minus dolor iste.\n \rVoluptas temporibus corporis autem dolores culpa omnis fugiat impedit. Ipsa et minima vel eveniet nam et eaque. Dolor ut assumenda corrupti necessitatibus enim corporis ea eos eligendi. Vel quia esse et animi.\n \rQuas rerum quas vel. Vel rerum nam minima harum est dicta deleniti illo repellendus. Velit totam earum. Nostrum ut incidunt nulla magni et quia et.",
          model: "Roadster",
          brand: "Tesla",
          id: "1",
        }}
      />
    </MemoryRouter>
  );
});
