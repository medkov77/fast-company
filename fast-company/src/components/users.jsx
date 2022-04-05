import Pagination from "./pagination";
import User from "./user";
const Users = ({ usersData, ...rest }) => {
  const count = usersData.length;
  const pageSize = 4;
  const handlePageSize = (pageIndex) => {
    console.log(pageIndex);
  };
  return (
    <>
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
        {usersData.map((user) => {
          return (
            <User
              key={user._id}
              profession={user.profession}
              qualities={user.qualities}
              name={user.name}
              rate={user.rate}
              _id={user._id}
              bookmark={user.bookmark}
              {...rest}
            />
          );
        })}
      </table>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageSize={handlePageSize}
      />
    </>
  );
};

export default Users;
