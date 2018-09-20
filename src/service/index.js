import http from "@/utils/http";


export default class Service {
  static getTopics(params) {
    return http.get("/topics", { params });
  }
}
