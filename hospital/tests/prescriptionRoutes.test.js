const request = require('supertest')
const app = require('../app')
const { reset } = require('./tables/manage_tables')
let cookie = null

function testAll() {
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
                    role: 'patient'
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /doctors', () => {
        it('should create a new doctor', async () => {
            const res = await request(app)
                .post('/doctors')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    name: 'AndresDoc',
                    password: '1234',
                    role: 'doctor',
                    specialization: 'cardiology'
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /doctors', () => {
        it('should create a new doctor', async () => {
            const res = await request(app)
                .post('/doctors')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    name: 'AndresDocGeneral',
                    password: '1234',
                    role: 'doctor',
                    specialization: 'general'
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /appointments', () => {
        it('should create a new appointment', async () => {
            const res = await request(app)
                .post('/appointments')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    patient_id: 1,
                    symptoms: 'chest pain',
                    user_id: 2
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /auth/logout', () => {
        it('should logout', async () => {
            const res = await request(app)
                .post('/auth/logout')
                .set('Cookie', [`jwt=${cookie}`])
                .send()
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /auth/login', () => {
        it('doctor should be able to login', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    name: 'AndresDoc',
                    password: '1234'
                })
            expect(res.statusCode).toEqual(200)
            cookie = res.headers['set-cookie'][0].split(';')[0].split('=')[1]
            expect(res.headers['set-cookie'][0]).toMatch(/jwt=/)
        })
    })
    describe('POST /prescriptions', () => {
        it('should create a prescription for an appointment', async () => {
            const res = await request(app)
                .post('/prescriptions')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    appointment_id: 1,
                    patient_id: 1,
                    info: 'take every 12 hs',
                    medicine: 'apixaban'
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /prescriptions', () => {
        it('should create a prescription for an appointment', async () => {
            const res = await request(app)
                .post('/prescriptions')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    appointment_id: 1,
                    patient_id: 1,
                    info: 'take every 12 hs',
                    medicine: 'apixaban'
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('PUT /prescriptions/:id', () => {
        it('should update the prescription ', async () => {
            const res = await request(app)
                .put('/prescriptions/1')
                .set('Cookie', [`jwt=${cookie}`])
                .send({
                    info: 'take every 8 hs'
                })
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('DELETE /prescriptions/:id', () => {
        it('should delete the duplicated prescription ', async () => {
            const res = await request(app)
                .delete('/prescriptions/2')
                .set('Cookie', [`jwt=${cookie}`])
                .send()
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /auth/logout', () => {
        it('should logout', async () => {
            const res = await request(app)
                .post('/auth/logout')
                .set('Cookie', [`jwt=${cookie}`])
                .send()
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /auth/login', () => {
        it('patient should be able to login', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    name: 'Andres',
                    password: '1234'
                })
            expect(res.statusCode).toEqual(200)
            cookie = res.headers['set-cookie'][0].split(';')[0].split('=')[1]
            expect(res.headers['set-cookie'][0]).toMatch(/jwt=/)
        })
    })

    describe('GET /prescriptions/:id', () => {
        it('should get patient prescriptions', async () => {
            const res = await request(app)
                .get('/prescriptions/1')
                .set('Cookie', [`jwt=${cookie}`])
                .send()
            expect(res.statusCode).toEqual(200)
            expect(res.body.length).toEqual(1)
            expect(res.body[0].appointment_id).toEqual(1)
            expect(res.body[0].patient_id).toEqual(1)
            expect(res.body[0].info).toEqual('take every 8 hs')
            expect(res.body[0].medicine).toEqual('apixaban')
        })
    })


}

testAll()