import * as React from 'react';
import Link from 'next/link';
import { backUrl } from '../../config/config';

interface ICartProps {
    orders: any;
    removeItem: (val: string) => void;
    handleAllCheck: (e) => void;
    handleSingleCheck: (checked: boolean, id: number) => void;
    itemCheck: number[];
}

const CartContainer: React.FunctionComponent<ICartProps> = ({
    orders,
    removeItem,
    handleAllCheck,
    handleSingleCheck,
    itemCheck,
}) => {

    return (
        <>
            <div className="cart__check-all">
                <input type="checkbox" name="group" id="checkAll"
                    checked={
                        itemCheck.length === orders.length
                            ? true
                            : false
                    }
                    onChange={(e) => { handleAllCheck(e.target.checked) }}
                />
                <label htmlFor="checkAll">전체 선택</label>
            </div>
            {
                // 회원
                orders.map((v, i) => {
                    const id = v.products.id;
                    return (
                        <div key={i} className="cart__item">
                            <input type="checkbox" name="item" className="item"
                                checked={itemCheck.includes(v.id) ? true : false}
                                onChange={(e) => { handleSingleCheck(e.target.checked, v.id) }}
                            />
                            <div className="cart__item__inner">
                                <Link
                                    href={'/shop/detail/[id]'}
                                    as={`/shop/detail/${id}`}
                                >
                                    <a>
                                        <img src={`${backUrl}/${v.images.src}`} alt="" className="cart-image" />
                                    </a>
                                </Link>
                                <div className="cart__item__title"><h3>{v.products.title}</h3></div>
                                <div>상품 번호: {v.products.id}</div>
                                <div>사이즈: {v.size.toUpperCase()}</div>
                                <div>색상: <span className="color" style={{ background: v.color }}></span></div>
                                <div>수량: {v.quantity}</div>
                                <div>가격: {v.products.price.toLocaleString()} 원</div>
                            </div>
                            <div className="cart-delete" onClick={() => { removeItem(v.id) }}>삭제</div>
                        </div>
                    )
                })
            }
        </>
    )
};


export default CartContainer;
