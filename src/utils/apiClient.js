import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

export { BASE_API_URL };

class ApiClient {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_API_URL,
    });
  }

  async getPupils() {
    return await this.api.get("/pupils");
  }

  async addPupil(data) {
    return await this.api.post("/pupils", data);
  }

  async deletePupil(id) {
    return await this.api.delete(`/pupils/${id}`);
  }

  async getGroups(params = {}) {
    return await this.api.get("/groups", { params });
  }

  async getHomeworks(params = {}) {
    return await this.api.get("/homeworks", { params });
  }

  async getHomeworkById(id) {
    const { data } = await this.api.get(`/homeworks/${id}`);

    return Array.isArray(data?.response) && data?.response?.length
      ? data.response[0]
      : null;
  }

  async getVariants(params = {}) {
    return await this.api.get("/variants", { params });
  }

  async createHomework(groupId, exercises) {
    let body = Object.keys(exercises);

    if (Object.keys(body).length === 0) return;

    body = body.reduce((result, exerciseNumber) => {
      if (!Number(exercises[exerciseNumber])) return result;

      return { ...result, [`ex_${exerciseNumber}`]: exercises[exerciseNumber] };
    }, {});

    body = { groupId, exercises: body };

    return await this.api.post("/homeworks", body);
  }

  async checkVariant(variantId, answers) {
    return await this.api.patch(`/variants/${variantId}`, {
      answers,
    });
  }
}

export default new ApiClient();
