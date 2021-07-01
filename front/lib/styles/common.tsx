export const after = (rest?: string) => `
    &::after{
        display: block;
        clear: both;
        content: '';
        ${rest}
    }
`;

export const font = {
    noto: 'Noto Sans KR, sans-serif'
}
