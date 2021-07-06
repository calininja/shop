import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../store/thunks/users';
import { registerDone } from '../../store/slices/users';
import { showModal } from '../../store/slices/cores';
import { selectUsers } from '../../store/selectors/user';
import useInputs from '../../lib/hooks/useInputs';
import LabelInput from '../../components/common/LabelInput';
import Button from '../../components/common/Button';
import { css } from '@emotion/react';
import { after, font } from '../../lib/styles/common';
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
        if (id.length < 5) {
            toast.error('아이디는 5글자 이상으로 작성하여 주세요.');
            return;
        }
        if (password.length < 5) {
            toast.error('패스워드는 5글자 이상으로 작성하여 주세요.');
            return;
        }
        dispatch(registerUser(data));
    }, [id, password, passwordCheck])

    return (
        <section css={signUpFormWrapper}>
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
        </section>
    );
};

const signUpFormWrapper = css`
    position: relative;
    width: 250px;
    height: auto;
    min-height: 200px;
    margin: 0 auto;
    padding: 50px 50px 100px;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    transition: all 0.5s ease-in;
    z-index: 1;
    form{
        ${after()}
        .label-input__block{
            >input:not(for:agreement){
                width: 100%;
                margin: 1px 0;
            }

            label{
                font: 300 12px/15px ${font.noto};
                vertical-align: middle;
            }
            button{
                display: block;
            }
        }
        .invalid{
            font: 400 14px/30px ${font.noto};
            color: red;
        }
        .valid{
            font: 400 14px/30px ${font.noto};
            color: green;
        }
        .sign__buttons{
            position: absolute;
            bottom: 30px;
            button{
                width: 200px;
                margin: 10px 2px;
            }
            div{
                font: 400 14px/14px ${font.noto};
                color: #111111;
                .toggle{
                    font: 400 14px/14px ${font.noto};
                    color: #249e6b;
                    cursor: pointer;
                }
            }
        }
    }
`

export default SignUpForm;