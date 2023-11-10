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
                    name: 'Master',
                    password: 'password'
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
                    name: 'Andres',
                    password: '1234',
                    role: 'patient',
                    email: 'andres@example.com'
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('PUT /patients/:id', () => {
        it('should update patient data', async () => {
            const res = await request(app)
                .put('/patients/1')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    phone: '123456789'
                })
            expect(res.statusCode).toEqual(200)
        })
    })
    
    
}

testAll()