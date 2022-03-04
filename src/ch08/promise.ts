import { readFile, appendFile } from 'fs'

// questions
// - how to think about differences? callbacks return two things, whereas promises return one thing with things inside
// - or another way to thikn about differences? promises use a FSM to manage two states
// - how does go avoid callback hell? it flattens calls

// callback implementation
function appendAndRead(
    path: string,
    data: string
    cb: (error: Error | null, result: string | null) => void
  ) {
    appendFile(path, data, error => {
      if (error) {
        return cb(error, null)
      }
      readFile(path, (error, result) => {
        if (error) {
          return cb(error, null)
        }
        cb(null, result)
      })
    })
  }

// go would avoid this callback hell with 
function appendAndRead(
    path: string,
    data: string
    cb: (error: Error | null, result: string | null) => void
  ) {
    let x = appendFile(path, data, error => {
      if (error) {
        return cb(error, null)
      }
    })
    if(typeof x == "Error"){
        return x
    }
    let y = readFile(x, (error) => {
        if (error) {
            return cb(error, null)
        }
        return cb(null, result)
    )
    if(typeof y == Error){
        return y
    }
  }

// promise implementation
function appendAndReadPromise(path: string, data: string): Promise<string> {
    return appendPromise(path, data)
      .then(() => readPromise(path))
      .catch(error => console.error(error))
  }

type Executor<T, E extends Error> = (
    resolve: (result: T) => void,
    reject: (error: unknown) => void
) => void

class Promise<T, E extends Error> { 
    constructor(f: Executor<T, E>){}
    // maps successful result of a promise to a new promise
    then<U>(g: (result: T) => Promise<U>): Promise<U>
    // recovers from an error to create a new promise
    catch<U>(g: (error: E) => Promise<U>): Promise<U> 
}

// wrapping callback in promise we have
// key difference from callback implementation is return a single thing rather than 
// two things which have to test for whether it failed etc. 
function readFilePromise(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        readFile(path, (error, result) => {
            if(error) {
                reject(error)
            } else {
                resolve(error)
            }
        })
    })
}