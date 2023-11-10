const request = require('supertest')
const app = require('../app')
const { reset } = require('./tables/manage_tables')
let cookie = null

function testAll(){
    beforeAll(done => {
        reset().then(() => done())
    })
    
    describe('POST /auth/login', () => {
        it('admin should be able to login', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    name: "Master",
                    password: "password"
                })
            expect(res.statusCode).toEqual(200)
            cookie = res.headers['set-cookie'][0].split(';')[0].split('=')[1]
            expect(res.headers['set-cookie'][0]).toMatch(/jwt=/)
        })
    })
    
    describe('POST /patients', () => {
        it('should create a new patient', async () => {
            const res = await request(app)
                .post('/patients')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    name: "Andres",
                    password: "1234",
                    role: "patient"
                })
            expect(res.statusCode).toEqual(200)
        })
    })
    
    describe('GET /users', () => {
        it('should get the created user', async () => {
            const res = await request(app)
                .get('/users?name=Andres')
                .set('Cookie', [`jwt=${cookie}`])
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body.length).toEqual(1)
            const createdUser = res.body[0]
            expect(createdUser).toHaveProperty('name', 'Andres')
            expect(createdUser).toHaveProperty('role', 'patient')
        })
    })
    
    describe('PUT /users/:id', () => {
        it('should update the user ', async () => {
            const res = await request(app)
                .put('/users/2')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    name: "AndresOk"
                })
            expect(res.statusCode).toEqual(200)
        })
    })
    
    describe('GET /users/:id', () => {
        it('should get the user with the same id', async () => {
            const res = await request(app)
                .get('/users/2')
                .set('Cookie', [`jwt=${cookie}`])
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('id', 2)
            expect(res.body).toHaveProperty('name', 'AndresOk')
            expect(res.body).toHaveProperty('role', 'patient')
        })
    })
    
    describe('DELETE /users/:id', () => {
        it('should delete the user with the same id', async () => {
            const res = await request(app)
                .delete('/users/2')
                .set('Cookie', [`jwt=${cookie}`])
                .send()
            expect(res.statusCode).toEqual(200)
        })
    })
    
    describe('GET /users/:id', () => {
        it('should not find the user previously deleted', async () => {
            const res = await request(app)
                .get('/users/2')
                .set('Cookie', [`jwt=${cookie}`])
                .send()
            expect(res.statusCode).toEqual(404)
        })
    })

    describe('POST /users/admin', () => {
        it('should create a new admin', async () => {
            const res = await request(app)
                .post('/users/admin')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    name: "Andres2",
                    password: "1234",
                    role: "admin"
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('GET /users/:id', () => {
        it('should find the new admin', async () => {
            const res = await request(app)
                .get('/users/3')
                .set('Cookie', [`jwt=${cookie}`])
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('name', 'Andres2')
            expect(res.body).toHaveProperty('role', 'admin')
        })
    })
    
    
}

testAll()
