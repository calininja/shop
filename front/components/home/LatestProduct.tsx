import * as React from 'react';
import Link from 'next/link';
import { backUrl } from '../../config/config';
import { css } from '@emotion/react';
import { after, font } from 'lib/styles/common';
import media from 'lib/styles/media';


interface IProductsProps {
  item: any;
}
const LatestProduct: React.FunctionComponent<IProductsProps> = ({ item }) => {

  return (
    <div css={latestProductWrapper}>
      <ul>
        <h1>NEW</h1>
        {item && item.filter((v, i) => i < 3).map((v, i) => (
          <li key={i}>
            <Link
              href={'/shop/detail/[item.id]'}
              as={`/shop/detail/${v.id}`}
              key={v.id}
            >
              <a>
                <img src={`${backUrl}/${v.images[0]?.src}`} alt="" />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
};

const latestProductWrapper = css`
  width: 60%;
  margin: 0 auto;
  ${media.large} {
      width: 100%;
  }
  ul{
      h1{
          font: 400 23px/23px ${font.noto};
          color: #111111;
          margin: 100px 0 30px 0;
          text-align: center;
      }
      ${after()};
      li{
          width: calc(33.3333% - 10px);
          float: left;
          text-align: center;
          margin: 0 5px;
          a{
              text-decoration: none;
              color: #111111;
              font: 400 15px/35px ${font.noto};
          }
      }
  }
`

export default LatestProduct;
