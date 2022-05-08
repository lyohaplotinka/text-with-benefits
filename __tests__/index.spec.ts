import { pack, unpack } from "../src";

describe('Text with benefits', function () {
    let result: string = ''

    test('Correctly wraps simple data', () => {
        result = pack('string', { value: 1, str: 'text', bool: true })
        expect(result).toBe('string<$$value number "1"$$><$$str string "text"$$><$$bool boolean "true"$$>')
    })

    test('Correctly unwraps simple data', () => {
        let unpacked: any
        expect(() => {
            unpacked = unpack(result)
        }).not.toThrowError()
        expect(unpacked.text).toBe('string')
        expect(unpacked?.data?.value).toBeDefined()
        expect(unpacked?.data?.value).toBe(1)
    })

    test('Throws an error if data type is not allowed', () => {
        expect(() => {
            pack('string', { value: () => true })
        }).toThrow(TypeError)
    })

    test('Throws an error if there is an incompatible type in encoded string', () => {
        expect(() => unpack('string<$$value function "()%20%3D%3E%20true"$$>')).toThrowError(TypeError)
    })

    test('Returns null (and does not throw error) if no data in string', () => {
        let unpacked: any
        expect(() => unpacked = unpack('strstr')).not.toThrowError()
        expect(unpacked?.data).toBeNull()
    })

    test('Returns null (and does not throw error) if data is malformed', () => {
        let unpacked: any
        expect(() => unpacked = unpack('string<$J$value number "1"$$>')).not.toThrowError()
        expect(unpacked?.data).toBeNull()
    })

    test('Correctly works with objects and arrays', () => {
        expect(() => {
            result = pack('My text', { obj: { active: true }, arr: [1, '2', 3] })
        }).not.toThrowError()
        let unpacked: any
        expect(() => unpacked = unpack(result)).not.toThrowError()
        expect(unpacked.text).toBe('My text')
        expect(unpacked?.data?.obj?.active).toBe(true)
        expect(unpacked?.data?.arr?.[1]).toBe('2')
    })

    test('Correctly works with complex string keys', () => {
        expect(() => {
            result = pack('My text', { '#$%complex ^^ key^&*': true })
        }).not.toThrowError()
        let unpacked: any
        expect(() => unpacked = unpack(result)).not.toThrowError()
        expect(unpacked.text).toBe('My text')
        expect(unpacked?.data?.['#$%complex ^^ key^&*']).toBe(true)
    })
});