import api from './api';

const getUserBoard = () => {
    return api.post("Divisions/");
};

const UserService = {
    getUserBoard
};

export default UserService;