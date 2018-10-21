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
  static getPost(id, params) {
    return http.get(`/topic/${id}`, { params });
  }

  /**
   * @api /topic_collect/:loginname
   * @name 用户所收藏的主题
   *
   * @method GET
   *
   */
  static getCollects(username) {
    return http.get(`/topic_collect/${username}`);
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

  static postAccessToken(accesstoken) {
    return http.post("/accesstoken", { accesstoken });
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
  static postCollect(accesstoken, topicId) {
    return http.post("/topic_collect/collect", {
      accesstoken,
      topic_id: topicId
    });
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
  static postDeCollect(accesstoken, topicId) {
    return http.post("/topic_collect/de_collect", {
      accesstoken,
      topic_id: topicId
    });
  }

  /**
   * @api  /reply/:reply_id/ups
   * @name 为评论点赞
   *
   * @method POST
   *
   * @param accesstoken String 用户的 accessToken
   *
   */

  static postUps(accesstoken, replyId) {
    return http.post(`/reply/${replyId}/ups`, { accesstoken });
  }

  /**
   * @api /topic/:topic_id/replies
   * @name 创建新评论
   *
   * @method POST
   *
   * @param accesstoken String 用户的 accessToken
   * @param content     String 评论的主体
   * @param reply_id    如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。
   */

  static postReplies(accesstoken, topicId, content) {
    return http.post(`/topic/${topicId}/replies`, { accesstoken, content });
  }

  /**
   * @api /user/:loginname
   * @name 用户详情
   *
   * @method GET
   *
   */

  static getUser(username) {
    return http.get(`/user/${username}`);
  }

  /**
   * @api /topics
   * @name 新建主题
   *
   * @method POST
   * @param accesstoken String 用户的 accessToken
   * @param title String  标题
   * @param tab  String 发帖子的版块，目前有 ask share job dev
   * @param content  String 主体内容
   */

  static createTopic(accesstoken, title, tab, content) {
    return http.post("/topics", { accesstoken, title, tab, content });
  }

  /**
   * @api /topics/update
   * @name 编辑主题
   *
   * @method POST
   * @param accesstoken String 用户的 accessToken
   * @param title String  标题
   * @param tab  String 发帖子的版块，目前有 ask share job dev
   * @param content  String 主体内容
   */

  static updateTopic(accesstoken, title, tab, content, topic_id) {
    return http.post("/topics/update", {
      accesstoken,
      title,
      tab,
      content,
      topic_id
    });
  }

  /**
   * @api /message/count
   * @name 获取未读消息数
   *
   * @method GET
   *
   */

  static getUnreadCount(accesstoken) {
    return http.get("/message/count", { params: { accesstoken } });
  }

  /**
   * @api /messages
   * @name 获取已读和未读消息
   *
   * @method GET
   *
   */

  static getMessages(accesstoken) {
    return http.get("/messages", { params: { accesstoken, mdrender: false } });
  }

  /**
   * @api /message/mark_all
   * @name 标记全部已读
   *
   * @method POST
   *
   */

  static postMarkAllMsg(accesstoken) {
    return http.post("/message/mark_all", { accesstoken });
  }
}
