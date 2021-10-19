import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../store/selectors/product';
import ListPresenter from '../../../components/shop/list/ListPresenter';

const ListContainer: React.FunctionComponent = ({
}) => {

    // console.log('리스트 컨테이너 렌더링')
    // useEffect(() => {
    //     console.log('리스트 컨테이너 리렌더링')
    // }, [])

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
        <>
            {
                products.map((v, i) => {
                    return (
                        <ListPresenter key={v.id} postId={v.id} post={v} colorCount={colorCount} />
                    )
                })
            }
        </>
    );
};

export default ListContainer;