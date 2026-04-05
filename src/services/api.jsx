const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  async get(payload) {
    await wait();
    return { data: payload };
  },
  async post(payload) {
    await wait();
    return { data: payload };
  },
  async patch(payload) {
    await wait();
    return { data: payload };
  }
};

export default api;
