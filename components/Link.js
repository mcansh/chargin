// @flow
import React, { type Node } from 'react';
import Link, { type Props as LinkProps } from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.4);
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

type Props = LinkProps & {
  children: Node,
};

const MyLink = ({ href, prefetch, children, ...anchorProps }: Props) => (
  <Link href={href} passHref prefetch={prefetch}>
    <StyledLink {...anchorProps}>{children}</StyledLink>
  </Link>
);

export default MyLink;
