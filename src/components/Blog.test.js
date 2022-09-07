import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author McAuthorface',
  };

  const { container } = render(<Blog blog={blog} />);

  const title = screen.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(title).toBeDefined();

  const author = screen.getByText('Author McAuthorface');
  expect(author).toBeDefined();

  const url = container.querySelector('.blog-url');
  expect(url).toBeNull();

  const likes = container.querySelector('.blog-likes');
  expect(likes).toBeNull();
});

test('blog details are shown after clicking view button', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author McAuthorface',
  };

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const div = container.querySelector('.blog-details');
  screen.debug(div);

  expect(div).not.toHaveStyle('display: none');
});
