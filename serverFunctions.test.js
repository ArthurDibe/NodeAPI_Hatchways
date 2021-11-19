const serverFunctions = require('./serverFunctions')

test('PING signal from API', async ()=>{
    expect.assertions(1)
    const data = await serverFunctions.ping()
    expect(data.success).toEqual(true)
})

test('404 page not found - /', async ()=>{
    expect.assertions(1)
    const data = await serverFunctions.pageNotFound("/")
    expect(data).toEqual("Request failed with status code 404")
})

test('404 page not found - /postings', async ()=>{
    expect.assertions(1)
    const data = await serverFunctions.pageNotFound("/postings")
    expect(data).toEqual("Request failed with status code 404")
})

test('404 page not found - /posts', async ()=>{
    expect.assertions(1)
    const data = await serverFunctions.pageNotFound("/posts")
    expect(data).toEqual("Request failed with status code 404")
})

test('404 page not found - /api', async ()=>{
    expect.assertions(1)
    const data = await serverFunctions.pageNotFound("/api")
    expect(data).toEqual("Request failed with status code 404")
})

test('404 page not found - /posts/api', async ()=>{
    expect.assertions(1)
    const data = await serverFunctions.pageNotFound("/posts/api")
    expect(data).toEqual("Request failed with status code 404")
})