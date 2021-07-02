import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from 'thunks/users';
import { showModal } from 'slices/cores';
import useInputs from 'lib/hooks/useInputs';
import LabelInput from 'components/common/LabelInput';
import Button from 'components/common/Button';
import { backUrl } from 'config/config';
import { selectUsers } from 'selectors/user';
import { toast } from 'react-toastify';
import { css } from '@emotion/react';
import { font } from 'lib/styles/common';

interface ISignInFormProps {
}

const SignInForm: React.FunctionComponent<ISignInFormProps> = () => {
    const { me, isSigningIn, error } = useSelector(selectUsers());
    const dispatch = useDispatch();
    const [value, onChange] = useInputs({
        signinId: '',
        password: ''
    })
    const { signinId, password } = value;

    useEffect(() => {
        const unauth = me == null && isSigningIn == false && error && Object.values(error).toString().includes('401');
        if (unauth) {
            toast.error('아이디 혹은 비밀번호가 틀렸습니다.');
            return;
        }

        if (me) dispatch(showModal({ visible: false, mode: 'LOGIN' }));
    }, [me, isSigningIn, error])

    const onClickToggle = () => dispatch(showModal({ visible: true, mode: 'JOIN' }));

    const onLogin = useCallback((e) => {
        e.preventDefault();
        if (!signinId || !password) {
            alert('내용을 입력해주세요.');
            return
        }
        dispatch(signInUser({ signinId, password }));
    }, [signinId, password])


    return (
        <section css={signInFormWrapper}>
            <form action="" onSubmit={onLogin}>
                <LabelInput
                    label="signinId"
                    name="signinId"
                    value={signinId}
                    placeholder="아이디"
                    onChange={onChange}
                />
                <LabelInput
                    label="password"
                    name="password"
                    value={password}
                    placeholder="패스워드"
                    onChange={onChange}
                    type="password"
                />
                <div className="sign__buttons">
                    {/* <a href={`${backUrl}/api/google/`}>
                        <img src="https://www.leocom.kr/images/sign-in-with-google.png" alt="" />
                    </a> */}
                    <Button>로그인</Button>
                    <div>아직 회원이 아니신가요?
                        <span className="toggle" onClick={onClickToggle}> 회원가입</span>
                    </div>
                </div>
            </form>
        </section>
    );
};

const signInFormWrapper = css`
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
        @include after();
        .label-input__block{
            label{
                font: 300 12px/15px ${font.noto};
                vertical-align: middle;
            }
            >input{
                width: 100%;
                margin: 5px 0;
            }
        }
        .sign__buttons{
            position: absolute;
            bottom: 30px;
            button{
                width: 200px;
                margin: 10px 2px;
            }
            >a{
                display: block;
                width: 200px;
                margin-top: 5px;
                img{
                    width: 100%;
                    margin: 0 auto;
                    cursor: pointer;
                }
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

export default SignInForm;