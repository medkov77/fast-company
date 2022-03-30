import User from "./user";
import Bookmark from "./bookmark";
const Users = (props) => {
  console.log(props);
  return (
    <>
      <Bookmark usersNumber={props.usersData.length} />
      <div>
        <table className="table">
          <thead className="mb-2">
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {props.usersData.map((user) => {
            return (
              <User
                key={user.id}
                profession={user.profession}
                qualities={user.qualities}
                name={user.name}
                rate={user.rate}
                _id={user._id}
                onDelite={props.onDelite}
              />
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Users;
