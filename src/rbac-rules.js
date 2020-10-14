const rules = {
  visitor: {
    static: []
  },
  writer: {
    static: ["posts:list", "posts:create", "user:getSelf"],
    dynamic: {
      "posts:edit": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false
        return userId === postOwnerId
      },
      "posts:delete": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false
        return userId === postOwnerId
      }
    }
  },
  admin: {
    static: [
      "posts:list",
      "posts:create",
      "posts:edit",
      "posts:delete",
      "user:getSelf"
    ]
  }
}

export default rules
