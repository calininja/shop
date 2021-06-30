import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from 'selectors/product';
import ListPresenter from './ListPresenter';

interface IListContainerProps {
}

const ListContainer: React.FunctionComponent<IListContainerProps> = ({
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
        <section className="shop__container">
            <div className="shop__wrapper">
                {
                    products.map((v, i) => {
                        return (
                            <div className="wrap" key={v.id}>
                                <ListPresenter postId={v.id} post={v} colorCount={colorCount} />
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default ListContainer;