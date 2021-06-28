import * as React from 'react';
import { useCallback } from 'react';
import DaumPostcode from "react-daum-postcode";

interface IAddressProps {
    findAddress: (val1: string, val2: string) => void;
    onClose: () => void;
}

const PopupPostCode: React.FunctionComponent<IAddressProps> = ({
    findAddress,
    onClose
}) => {

    // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = useCallback((data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        onClose();
        findAddress(fullAddress, data.zonecode);
    }, [])

    const postCodeStyle: React.CSSProperties = {
        display: 'block',
        position: 'absolute',
        top: '30%', left: '50%',
        width: '100%', height: '400px',
        transform: 'translate(-50%,-50%)',
        padding: '7px',
    };

    return (
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            {/* 닫기 버튼 생성 */}
            <button type='button' onClick={() => { onClose() }} className='postCode_btn'>닫기</button>
        </div>
    )
}

export default PopupPostCode;