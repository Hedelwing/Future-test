import { checkErrors, getDataPerPage, getTotalPages, hasOverlap, isObject, nextSortDirection } from '.'

it.each`
    item | expected
    ${{ a: 0 }} | ${true}
    ${null} | ${false}
    ${undefined} | ${false}
    ${[0, 0, 0]} | ${false}
    ${() => true} | ${false}
    ${true} | ${false}
    ${"It's a string type"} | ${false}
    ${42} | ${false}
`('function isObject returns $expected for $item', ({ item, expected }) => {
    expect(isObject(item)).toBe(expected)
})


describe('Pagination Utils', () => {
    const data = ["1", "1", "1", "1", "1", "2", "2"]

    describe('getDataPerPage function', () => {
        it('returns correctly data of first page', () => {
            expect(getDataPerPage(data, 1, 5)).toHaveLength(5)
            expect(getDataPerPage(data, 1, 6)).toEqual(["1", "1", "1", "1", "1", "2"])
        })

        it('returns correctly lenght of last page', () => {
            expect(getDataPerPage(data, 2, 7)).toEqual([])
            expect(getDataPerPage(data, 2, 5)).toHaveLength(2)
        })
    })

    it('getTotalPages function', () => {
        expect(getTotalPages(data.length, 5)).toBe(2)
        expect(getTotalPages(data.length)).toBe(1)
    })

})

test.each`
    value | search | expected
    ${121}| ${'1'} | ${true}
    ${''}| ${''} | ${true}
    ${'Hello'}| ${''} | ${true}
    ${false}| ${'false'} | ${false}
    ${null}| ${'null'} | ${false}
`('function hasOverlap returns $expected for $value in $search', ({ value, search, expected }) => {
    expect(hasOverlap(value, search)).toBe(expected)
})


test.each`
    dir | expected
    ${"asc"} | ${"desc"}
    ${"desc"} | ${null}
    ${null} | ${"asc"}
`('function nextSortDirection returns next $expected for current $dir', ({ dir, expected }) => {
    expect(nextSortDirection(dir)).toBe(expected)
})

test.each`
    obj | expected
    ${{ a: true, b: false }} | ${false}
    ${{ a: "Hello", b: "" }} | ${false}
    ${{ a: "Hello", b: "World" }} | ${false}
    ${{ a: undefined, b: "World" }} | ${false}
    ${{ a: undefined, b: undefined }} | ${true}
`('function checkEveryField returns $expected for $obj', ({ obj, expected }) => {
    expect(checkErrors(obj)).toBe(expected)
})