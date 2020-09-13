import Api from '../api';

export default class Todos extends Api {
  getTodos = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.get(`/`);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  getCurrentTodo = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.get(`/${id}/`);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  getLabels = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.get(`/label/`);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  createTodo = (title, description, label) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.post(`/`, {
          title,
          description,
          done: false,
          label,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  updateTodo = (id, title, description, done, label) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.put(`/${id}/`, {
          title,
          description,
          done,
          label,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  deleteTodo = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.delete(`/${id}/`);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  createLabel = (name) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.post(`/label/`, { name });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
}
