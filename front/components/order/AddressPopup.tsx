import * as React from 'react';
import { useState } from 'react';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import LabelInput from 'components/common/LabelInput';
import Button from 'components/common/Button';

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
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }

    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    return (
        <>
            <div className="table"></div>
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
            {/* <label htmlFor="address">주소</label>
            <input type="text" id="zipcode" required className="custom-input" placeholder="우편번호" name="zipcode" value={zipcode} /> */}
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
            {/* <div>
                <input type="text" required className="custom-input" placeholder="주소" name="address" value={address} />
            </div> */}
            {/* <div>
                <input type="text" required className="custom-input" placeholder="상세 주소" name="detailAddress" value={detailAddress} onChange={onChange} />
            </div> */}
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