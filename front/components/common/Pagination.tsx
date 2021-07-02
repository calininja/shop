import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts } from 'selectors/product';
import {
  loadReviews,
} from 'thunks/products';
import {
  currentPageNumber,
  updateStartEndPage,
} from 'slices/products';

interface ILastIdProps {
  reviews: any;
}
import { css } from '@emotion/react';

const Pagination: React.FunctionComponent<ILastIdProps> = ({ reviews }) => {

  const dispatch = useDispatch();
  const { current, start, end, allReviews, product, isLoadingPost } = useSelector(selectProducts());

  useEffect(() => {
    dispatch(currentPageNumber(1));
    dispatch(updateStartEndPage({ start: 0, end: 10 }));
  }, [])

  useEffect(() => {
    dispatch(loadReviews(data));
  }, [product, current])

  // 페이지네이션 도트 개수 설정
  const per = 10;
  const getAllReviewsLength = Number(allReviews);
  const total = Math.ceil(getAllReviewsLength / per);
  const array = [];
  for (let i = 1; i < total + 1; i++) {
    array.push(i);
  }

  // 페이징 넘버
  const target = array.slice(start, end);

  // PREV & NEXT 페이지 이동 쿼리값, 변수
  const prevPageValue = start > 0 ? start : current;
  const nextPageValue = end < total ? end + 1 : total;

  // offset
  const getPage = (current - 1) * 10;
  const data = {
    id: product.id,
    offset: getPage
  }

  // 현재 페이지 current 업데이트
  const getCurrentPage = useCallback((val: number) => {
    dispatch(currentPageNumber(val))
  }, [reviews, isLoadingPost, current])

  // 현재 장의 start와 end 번호 업데이트
  const getStartEndPage = useCallback((start: number, end: number) => {
    const obj = {
      start, end
    }
    dispatch(updateStartEndPage(obj));
  }, [])

  // prev 버튼 함수
  const setPrev = useCallback(() => {
    if (start > 1) {
      const s = start - 10;
      const e = end - 10;
      getStartEndPage(s, e);
    }
    getCurrentPage(prevPageValue);
    return;
  }, [start, end]);

  // next 버튼 함수
  const setNext = useCallback(() => {
    if (end < total) {
      const s = start + 10;
      const e = end + 10;
      getStartEndPage(s, e);
    }
    getCurrentPage(nextPageValue);
    return;
  }, [start, end, total]);

  return (
    <section css={paginationWrapper}>
      <button className={start == 0 ? 'prev--none' : 'prev'} onClick={setPrev}>
        PREV
      </button>
      <ul>
        {target.map(val => (
          <li
            key={val}
            onClick={() => { getCurrentPage(val); }}
            className={current === val ? 'active' : ''}
          >
            {val}
          </li>
        ))}
      </ul>
      <button className={end + 1 > total ? 'next--none' : 'next'} onClick={setNext}>
        NEXT
      </button>
    </section>
  );
};

const paginationWrapper = css`
  text-align: center;
  ul,button{
      vertical-align: middle;
  }
  button{
      position: relative;
      background: none;
      border: 0;
      text-indent: -9999px;
      &::before, &::after{
          position: absolute;
          background: #000000;
          width: 10px;
          height: 1px;
          display: block;
          clear: both;
          content:'';
      }
      &::before{
          top: 6px;
          transform: rotate(45deg);
      }
      &::after{
          top: 13px;
          transform: rotate(-45deg);
      }
      &.prev{
          transform: rotate(-180deg);
      }
      &.prev--none, &.next--none{
          display: none;
      }
  }
  ul{
      display: inline-block;
      margin: 0 5px;
      li{
          display: inline-block;
          font: 400 16px/16px $noto;
          margin: 0 5px;
          cursor: pointer;
          &.active{
              font-weight: bold;
          }
      }
  }
`

export default Pagination;




