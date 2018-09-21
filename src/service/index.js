import http from "@/utils/http";

export default class Service {
  /**
   * @api /topics
   * @name 主题首页
   *
   * @method GET
   *
   * @param page     Number 页数
   * @param tab      String 主题分类。目前有 ask share job good
   * @param limit    Number 每一页的主题数量
   * @param mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
   */

  static getTopics(params) {
    return http.get("/topics", { params });
  }

  /**
   * @api /topic/:id
   * @name 主题详情
   *
   * @method GET
   *
   * @param mdrender    String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
   * @param accesstoken String 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。
   *                    会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值。
   */
  static getPost(id) {
    return http.get(`/topic/${id}`);
  }


  /**
   * @api /topic_collect/:loginname
   * @name 用户所收藏的主题
   *
   * @method GET
   *
   */
  static getCollects(username){
    return http.get(`/topic_collect/${username}`)
  }

  /**
   * @api /accesstoken
   * @name 验证accessToken的正确性
   *
   * @method POST
   *
   * @param accesstoken String 用户的 accessToken，如果成功匹配上用户，返回成功信息。否则 403。
   * 
   */

   static postAccessToken(accesstoken){
    return http.post('/accesstoken',{accesstoken})
   }

  /**
   * @api  /topic_collect/collect
   * @name 收藏主题
   *
   * @method POST
   *
   * @param accesstoken String 用户的 accessToken
   * @param topic_id    String 主题的id
   * 
   */
  static postCollect(accesstoken, topicId){
    return http.post('/topic_collect/collect',{accesstoken, topic_id:topicId})
  }

  /**
   * @api  /topic_collect/collect
   * @name 取消收藏主题
   *
   * @method POST
   *
   * @param accesstoken String 用户的 accessToken
   * @param topic_id    String 主题的id
   * 
   */
  static postDeCollect(accesstoken, topicId){
    return http.post('/topic_collect/de_collect',{accesstoken, topic_id:topicId})
  }

}
