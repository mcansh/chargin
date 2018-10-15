import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.4);
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const MyLink = ({ href, prefetch, children, ...anchorProps }) => (
  <Link href={href} passHref prefetch={prefetch}>
    <StyledLink {...anchorProps}>{children}</StyledLink>
  </Link>
);

export default MyLink;
