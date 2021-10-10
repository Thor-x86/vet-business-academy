/** @see https://randomuser.me/documentation#results for more informations */
export default interface UserModel {
  id: number;
  name: {
    title: string;
    first: string;
    last: string;
  };
  gender: string;
  location: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  registered: {
    date: string;
    age: number;
  };
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  isBanned?: boolean;
}
