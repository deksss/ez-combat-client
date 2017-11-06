import randomDigit from "../common/randomDigit";

test("get random ditit length 4", () => {
  const result = randomDigit(4);
  expect(result.toString().length).toBe(4);
  expect(result).toBeLessThanOrEqual(9999);
  expect(result).toBeGreaterThanOrEqual(1000);
});

test("get random ditit length 0", () => {
  const result = randomDigit(0);
  expect(result.toString().length).toBe(1);
  expect(result).toBeLessThanOrEqual(99);
  expect(result).toBeGreaterThanOrEqual(0);
});

test("get random ditit length 2", () => {
  const result = randomDigit(2);
  expect(result.toString().length).toBe(2);
  expect(result).toBeLessThanOrEqual(99);
  expect(result).toBeGreaterThanOrEqual(11);
});

test("get random ditit length 2 string", () => {
  const result = randomDigit("2");
  expect(result.toString().length).toBe(2);
  expect(result).toBeLessThanOrEqual(99);
  expect(result).toBeGreaterThanOrEqual(11);
});

test("get random ditit length 5", () => {
  const result = randomDigit(5);
  expect(result.toString().length).toBe(5);
  expect(result).toBeLessThanOrEqual(99999);
  expect(result).toBeGreaterThanOrEqual(10000);
});

test("get random digit, no params", () => {
  const result = randomDigit();
  expect(result.toString().length).toBe(1);
  expect(result).toBeLessThanOrEqual(99);
  expect(result).toBeGreaterThanOrEqual(0);
});
