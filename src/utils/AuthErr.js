class AuthErr extends Error {
  name = "auth error";
  returnCode = 401;

  constructor(msg, rc) {
    super(msg);
    if (rc) this.returnCode = rc;
  }
}

module.exports = { AuthErr };
