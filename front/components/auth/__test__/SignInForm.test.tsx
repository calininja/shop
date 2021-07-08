import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignInForm from '../SignInForm';

describe('SignInForm', () => {
    const setup = (props?) => {
        // const initialProps = {
        // }
        return render(<SignInForm />);
    };
    it('reders properly', () => {
        setup();
    });
})
