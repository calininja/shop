import * as React from 'react';
import Link from 'next/link';
import { backUrl } from '../../config/config';

interface IProductsProps {
  item: any;
}
const LatestProduct: React.FunctionComponent<IProductsProps> = ({ item }) => {

  return (
    <div className="home__list-items">
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


export default LatestProduct;
