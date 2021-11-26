import * as React from 'react';
import { useState } from 'react';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import LabelInput from '../../common/LabelInput';
import useToggle from '../../../hooks/useToggle';

interface IAddressProps {
    findAddress: (val1: string, val2: string) => void;
    onChange: (e: any) => void;
    addressState: any
}

const AddressPopup: React.FunctionComponent<IAddressProps> = ({
    findAddress,
    onChange,
    addressState
}) => {

    const { address, zipcode, detailAddress } = addressState;

    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useToggle(false)

    // 팝업창 열기
    const openPostCode = () => setIsPopupOpen()

    // 팝업창 닫기
    const closePostCode = () => setIsPopupOpen()

    return (
        <>
            {/* <div className="table"></div> */}
            <button type='button' onClick={openPostCode}>우편번호 검색</button>
            <LabelInput
                label=""
                name="zipcode"
                value={zipcode}
                onChange={onChange}
                placeholder="우편번호"
                type="text"
                required
            />
            {/* 버튼 클릭 시 팝업 생성 */}
            <LabelInput
                label="주소"
                name="address"
                value={address}
                onChange={onChange}
                placeholder="주소"
                type="text"
                required
            />
            <LabelInput
                label="상세주소"
                name="detailAddress"
                value={detailAddress}
                onChange={onChange}
                placeholder="상세주소"
                type="text"
                required
            />
            {/* 팝업 생성 기준 div */}
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} findAddress={findAddress} />
                    </PopupDom>
                )}
            </div>
        </>
    )
}

export default AddressPopup;