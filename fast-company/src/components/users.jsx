import User from "./user";
const Users = (props) => {
  return (
        <table className="table">
          <thead className="mb-2">
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {props.usersData.map((user) => {
            return (
              <User
                key={user._id}
                profession={user.profession}
                qualities={user.qualities}
                name={user.name}
                rate={user.rate}
                _id={user._id}
                bookmark = {user.bookmark}
                onDelite={props.onDelite}
                onToggleBookMark = {props.onToggleBookMark}
              />
            );
          })}
        </table>
  );
};

export default Users;
