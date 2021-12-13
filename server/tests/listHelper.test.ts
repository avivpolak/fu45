import { dummy } from '../utils/listHelper';

test('dummy returns one', () => {
	const blogs: number[] = [];

	const result  = dummy(blogs);
	expect(result).toBe(1);
})
