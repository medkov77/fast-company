const [users, setUsers] = useState([]);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    useEffect(() => api.users.fetchAll().then((data) => setUsers(data)), []);
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
        console.log(id);
    };