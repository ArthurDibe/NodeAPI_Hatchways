const serverFunctions = require("./serverFunctions");
const tagsExist =
  "politics,tech,health,history,startups,science,design,culture";
const tagsNotExist = "book,study,duty,paint,tv,warp,way,food";
const sortOptions = ["id", "reads", "likes", "popularity"];
const directOptions = ["asc", "desc"];

// PING TEST
test("PING signal from API", async () => {
  expect.assertions(1);
  const data = await serverFunctions.ping();
  expect(data.success).toEqual(true);
});

// PAGE NOT FOUND TESTS
test("404 page not found - /", async () => {
  expect.assertions(1);
  const data = await serverFunctions.pageNotFound("/");
  expect(data).toEqual("Request failed with status code 404");
});

test("404 page not found - /postings", async () => {
  expect.assertions(1);
  const data = await serverFunctions.pageNotFound("/postings");
  expect(data).toEqual("Request failed with status code 404");
});

test("404 page not found - /posts", async () => {
  expect.assertions(1);
  const data = await serverFunctions.pageNotFound("/posts");
  expect(data).toEqual("Request failed with status code 404");
});

test("404 page not found - /api", async () => {
  expect.assertions(1);
  const data = await serverFunctions.pageNotFound("/api");
  expect(data).toEqual("Request failed with status code 404");
});

test("404 page not found - /posts/api", async () => {
  expect.assertions(1);
  const data = await serverFunctions.pageNotFound("/posts/api");
  expect(data).toEqual("Request failed with status code 404");
});

// NO TAGS PROVIDED TESTS
test("No Tags Parameter Provided - /api/posts", async () => {
  expect.assertions(1);
  const data = await serverFunctions.checkTags("/api/posts");
  expect(data).toEqual("Tags parameter is required");
});

test("No Tags Parameter Provided - /api/posts?tags", async () => {
  expect.assertions(1);
  const data = await serverFunctions.checkTags("/api/posts?tags");
  expect(data).toEqual("Tags parameter is required");
});

sortOptions.forEach((option) => {
  test(`No Tags Parameter Provided + sortBy\n[ROUTE]: /api/posts?tags&sortBy=${option} `, async () => {
    expect.assertions(1);
    const data = await serverFunctions.checkTags(
      `/api/posts?tags&sortBy=${option}`
    );
    expect(data).toEqual("Tags parameter is required");
  });
});

directOptions.forEach((option) => {
  test(`No Tags Parameter Provided + direction\n[ROUTE]: /api/posts?tags&direction=${option} `, async () => {
    expect.assertions(1);
    const data = await serverFunctions.checkTags(
      `/api/posts?tags&direction=${option}`
    );
    expect(data).toEqual("Tags parameter is required");
  });
});

// TAGS PROVIDED THAT DOES NOT EXIST TESTS
test(`Tags that does not exist Provided\n[ROUTE]: /api/posts?tags=${tagsNotExist}`, async () => {
  expect.assertions(1);
  const data = await serverFunctions.checkTags(
    `/api/posts?tags=${tagsNotExist}`
  );
  expect(data.posts.length).toBe(0);
});

sortOptions.forEach((option) => {
  test(`Tags that does not exist + sortBy\n[ROUTE]: /api/posts?tags=${tagsNotExist}&sortBy=${option}`, async () => {
    expect.assertions(1);
    const data = await serverFunctions.checkTags(
      `/api/posts?tags=${tagsNotExist}&sortBy=${option}`
    );
    expect(data.posts.length).toBe(0);
  });
});

directOptions.forEach((option) => {
  test(`Tags that does not exist + direction\n[ROUTE]: /api/posts?tags=${tagsNotExist}&direction=${option}`, async () => {
    expect.assertions(1);
    const data = await serverFunctions.checkTags(
      `/api/posts?tags=${tagsNotExist}&direction=${option}`
    );
    expect(data.posts.length).toBe(0);
  });
});

// TAGS PROVIDED THAT EXIST TESTS
test(`Tags that exists\n[ROUTE]: /api/posts?tags=${tagsExist}`, async () => {
  expect.assertions(1);
  const data = await serverFunctions.checkTags(`/api/posts?tags=${tagsExist}`);
  expect(data.posts.length).not.toBe(0);
});

sortOptions.forEach((option) => {
  test(`Tags that exists + sortBy + direction ASC\n[ROUTE]: /api/posts?tags=${tagsExist}&sortBy=${option}&direction=asc`, async () => {
    expect.assertions(1);
    const data = await serverFunctions.checkTags(
      `/api/posts?tags=${tagsExist}&sortBy=${option}&direction=asc`
    );
    expect(data.posts.length).not.toBe(0);
  });
});

sortOptions.forEach((option) => {
  test(`Tags that exists + sortBy + direction DESC\n[ROUTE]: /api/posts?tags=${tagsExist}&sortBy=${option}&direction=desc`, async () => {
    expect.assertions(1);
    const data = await serverFunctions.checkTags(
      `/api/posts?tags=${tagsExist}&sortBy=${option}&direction=desc`
    );
    expect(data.posts.length).not.toBe(0);
  });
});
