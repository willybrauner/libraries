import { deferredPromise } from "../src";

const wait = (time: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, time))

describe("deferredPromise", () => {

  it('should be defined', () => {
    expect(deferredPromise).toBeDefined()
  })

  it('should resolve promise', async () => {

    let resolve = false
    let reject = false
    const deferred = deferredPromise<void>()

    deferred.promise
      .then(() => {
        resolve = true
      })
      .catch(() => {
        reject = true
      })

    expect(resolve).toBe(false)
    expect(reject).toBe(false)

    deferred.resolve()
    await wait(0)

    expect(resolve).toBe(true)
    expect(reject).toBe(false)
  })

  it('should reject promise', async () => {

    let resolve = false
    let reject = false
    const deferred = deferredPromise<void>()

    deferred.promise
      .then(() => {
        resolve = true
      })
      .catch(() => {
        reject = true
      })

    expect(resolve).toBe(false)
    expect(reject).toBe(false)

    deferred.reject()
    await wait(0)

    expect(resolve).toBe(false)
    expect(reject).toBe(true)
  })

})
