const test = require("node:test");
const assert = require("node:assert/strict");
const { isDoctorsPath } = require("./navState");

test("activates Doctors only on the exact /doctors route", () => {
  assert.equal(isDoctorsPath("/doctors"), true);
  assert.equal(isDoctorsPath("/doctors/"), false);
  assert.equal(isDoctorsPath("/about/management"), false);
});
