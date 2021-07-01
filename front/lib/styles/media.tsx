export const mediaQuery = (maxWidth: number) => `
  @media (max-device-width: ${maxWidth}px)
`;

const media = {
    large: mediaQuery(414),
    medium: mediaQuery(375),
    small: mediaQuery(320),
}

export default media;
