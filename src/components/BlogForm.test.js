import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('form calls onSubmit', async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const title = screen.getByLabelText('title:');
  await user.type(title, 'testing of title');

  const author = screen.getByLabelText('author:');
  await user.type(author, 'testing of author');

  const url = screen.getByLabelText('url:');
  await user.type(url, 'testing of url');

  const submit = screen.getByText('create');
  await user.click(submit);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing of title');
  expect(createBlog.mock.calls[0][0].author).toBe('testing of author');
  expect(createBlog.mock.calls[0][0].url).toBe('testing of url');
});
