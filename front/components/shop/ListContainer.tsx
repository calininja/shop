import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from 'store/selectors/product';
import ListPresenter from 'components/shop/ListPresenter';

const ListContainer: React.FunctionComponent = ({
}) => {

    const { products } = useSelector(selectProducts());

    function colorCount(name) {
        let arr = [];
        let count = 0;
        for (let i = 0; i < products.length; i++) {
            arr.push(products[i]);
        }
        for (let i = 0; i < products.length; i++) {
            if (arr[i].title === name) {
                count++;
            }
        }
        return count;
    }

    return (
        <div className="shop__wrapper">
            {
                products.map((v, i) => {
                    return (
                        <ListPresenter key={v.id} postId={v.id} post={v} colorCount={colorCount} />
                    )
                })
            }
        </div>
    );
};

export default ListContainer;