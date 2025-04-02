type location = {
  lat: number;
  lng: number;
};

type suggestion = {
  address: string;
  location: location;
  title: string;
};
// {
//   adcode: ;
//   address: "";
//   category: "";
//   city: "";
//   district: "";
//   id: "";
//   location: {
//     lat: ;
//     lng: ;
//   }
//   province:""
//   title:""
//   type:0
// }

export type { suggestion };
