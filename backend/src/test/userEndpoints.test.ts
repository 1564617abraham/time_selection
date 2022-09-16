import supertest from 'supertest'
import { app } from '../index'
import User from '../models/userSchema'

const request = supertest(app)

var token = ''

describe('POST /register', () => {
    beforeAll(async () => {
        // Clean user's collection
        await User.deleteMany({})
    })

    var response: any

    const validBody1 = {
        firstName: 'Emil',
        lastName: 'Carvajal',
        idUser : '03895432'
    }

    const invalidName = {
        firstName: 'Emil345',
        lastName: 'Carvajal Viteri',
        idUser : '03895432'
    }

    const uncompletedBody = {
        firstName: 'Emil',
        lastName: 'Carvajal Viteri',
    }

    test('Invalid name', async () => {
        response = await request.post('/api/users/register').send(invalidName)
        expect(response.status).toBe(400)
    })
    test('Invalid body', async () => {
        response = await request
            .post('/api/users/register')
            .send(uncompletedBody)
        expect(response.status).toBe(400)
    })

    test('Valid body', async () => {
        response = await request.post('/api/users/register').send(validBody1)

        let accessToken = response.body.payload.accessToken
        let user = response.body.payload.user

        expect(accessToken).toBeTruthy()
        expect(user).toBeTruthy()
        expect(response.status).toBe(201)
    })

})

describe('PUT /', () => {
    let response: any

    const invalidName = { firstName: 23}
    const invalididUser = { idUser: 'Emil12' }
    const uncompletedBody = {}
    const validBody = {
        firstName: 'Roger'
    }
    test('Token not provided', async () => {
        response = await request.put('/api/users/').send(invalididUser)
        expect(response.status).toBe(401)
    })

    test('Invalid token provided', async () => {
        response = await request
            .put('/api/users/')
            .set('Authorization', `Bearer 1234`)
            .send(invalididUser)

        expect(response.status).toBe(403)
    })

    // test('Invalid name', async () => {
    //     response = await request
    //         .put('/api/users/')
    //         .set('Authorization', `Bearer ${token}`)
    //         .send(invalidName)
    //     expect(response.status).toBe(400)
    // })

    // test('Uncompleted body', async () => {
    //     response = await request
    //         .put('/api/users/')
    //         .set('Authorization', `Bearer ${token}`)
    //         .send(uncompletedBody)

    //     expect(response.status).toBe(200)
    // })

    // test('Valid body', async () => {
    //     response = await request
    //         .put('/api/users/')
    //         .set('Authorization', `Bearer ${token}`)
    //         .send(validBody)

    //     expect(response.status).toBe(200)
    // })

})
