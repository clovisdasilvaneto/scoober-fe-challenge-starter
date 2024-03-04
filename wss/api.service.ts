import axios from "axios";
class APIService {
  isUserExist: boolean = false;

  constructor() {
    if (process.env.HOST_PORT) {
      axios.defaults.baseURL = `http://${process.env.HOST_LOCAL}:${process.env.HOST_PORT}`;
    } else {
      axios.defaults.baseURL = process.env.HOST_LOCAL;
    }
  }

  async createUser(id: string, name: string, room: string = "") {
    try {
      const userExist = await this._isUserExist(id);

      if (!userExist) {
        const userCreateResponse = await axios.post("/users", {
          id,
          name,
          room,
        });

        return userCreateResponse;
      } else {
        console.log("This user already exists");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async clearUser(id: string) {
    try {
      const clearUser = await axios.delete(`/users/${id}`);
      return clearUser;
    } catch (error) {}
  }

  async getUserDetail(id: string) {
    try {
      const userDetail = await axios.get(`/users/${id}`);
      return userDetail;
    } catch (error) {}
  }

  async getUsers() {
    try {
      const userList = await axios.get(`/users`);
      return userList;
    } catch (error) {}
  }

  async assignRoom(room: string, uid: string, roomType: string) {
    try {
      const assingUser = await axios
        .patch(`/users/${uid}`, {
          room,
          roomType,
        })
        .catch();
      return assingUser;
    } catch (error) {}
  }

  async removeUserFromRoom(uid: string) {
    try {
      const removeRoom = await axios.patch(`/users/${uid}`, {
        room: "",
      });
      return removeRoom;
    } catch (error) {}
  }

  async _isUserExist(name: string) {
    const isExist = await this.getUsers().then((result) =>
      result?.data.find((user) => user.name === name)
    );
    let isUserExist = false;
    if (isExist) {
      isUserExist = true;
    }
    return isUserExist;
  }

  public createRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default APIService;
