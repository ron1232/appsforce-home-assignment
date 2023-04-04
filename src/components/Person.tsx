import { User as PersonProps } from "../interfaces";

const Person: React.FC<PersonProps> = ({
  email,
  location,
  login,
  name,
  picture,
}) => {
  return (
    <div>
      <div>
        {name.title} {name.first} {name.last}
      </div>
      <div>{email}</div>
      <img src={picture.medium} alt="" />
      <div>{location.city}</div>
      <div>{location.country}</div>
      <div>{location.street.name}</div>
      <div>{location.street.number}</div>
      <div>{login.uuid}</div>
      <hr />
    </div>
  );
};

export default Person;
