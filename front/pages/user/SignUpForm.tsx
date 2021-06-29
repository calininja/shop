import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from 'thunks/users';
import { registerDone } from 'slices/users';
import { selectUsers } from "selectors/user";
import { showModal } from 'slices/cores';
import useInputs from 'lib/hooks/useInputs';
import LabelInput from 'components/common/LabelInput';
import Button from 'components/common/Button';
import { toast } from 'react-toastify';

const SignUpForm: React.FunctionComponent = () => {

    const dispatch = useDispatch();
    const [value, onChange] = useInputs({
        id: '',
        password: '',
        passwordCheck: ''
    })
    const { id, password, passwordCheck } = value;

    const { isSignUpDone, error } = useSelector(selectUsers());

    useEffect(() => {
        if (isSignUpDone == true) {
            toast.info('회원가입이 완료되었습니다.');
            dispatch(showModal(false));
            dispatch(registerDone());
        }
    }, [isSignUpDone]);

    const onClickToggle = () => dispatch(showModal({ visible: true, mode: 'LOGIN' }));

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const data = {
            signinId: id,
            password,
        }
        if (id.length < 5) return alert('아이디는 5글자 이상으로 작성하여 주세요.');
        if (password.length < 5) return alert('패스워드는 5글자 이상으로 작성하여 주세요.');
        dispatch(registerUser(data));
    }, [id, password, passwordCheck])

    return (
        <div className="sign__container signup">
            <form onSubmit={onSubmit}>
                <LabelInput
                    label="id"
                    name="id"
                    value={id}
                    placeholder="아이디"
                    onChange={onChange}
                />
                {
                    error && Object.values(error).toString().includes('403')
                        ? <div className="invalid">아이디가 존재 합니다.</div> : ''
                }
                <LabelInput
                    label="password"
                    name="password"
                    value={password}
                    placeholder="패스워드"
                    onChange={onChange}
                    type="password"
                    required
                />
                <LabelInput
                    label="passwordCheck"
                    name="passwordCheck"
                    value={passwordCheck}
                    placeholder="패스워드 확인"
                    onChange={onChange}
                    type="password"
                    required
                />
                {
                    passwordCheck == '' ? '' : password != passwordCheck
                        ?
                        <div className="invalid">패스워드가 일치하지 않습니다.</div>
                        : <div className="valid">패스워드가 일치 합니다.</div>
                }
                <div className="sign__buttons">
                    <Button type="submit">회원가입</Button>
                    <div>계정이 이미 있으신가요?
                        <span className="toggle" onClick={onClickToggle}> 로그인</span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export const getServerSideProps = async (context: any) => {

    return {
        props: {
            pathname: '/SignUpForm',
        }
    };
}

export default SignUpForm;